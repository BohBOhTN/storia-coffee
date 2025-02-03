import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  TrendingUp, 
  Users as UsersIcon, 
  Coffee, 
  AlertTriangle 
} from 'lucide-react';

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sales');
        console.log('Sales Data:', response.data); // Debug log
        const salesData = response.data.filter(sale => {
          const saleTime = new Date(sale.sale_time);
          const now = new Date();
          const isWithin24Hours = (now - saleTime) / (1000 * 60 * 60) <= 24;
          return isWithin24Hours;
        });
        console.log('Filtered Sales Data:', salesData); // Debug log
        setSales(salesData);

        // Fetch product details for each sale
        const productPromises = salesData.map(sale => 
          axios.get(`http://localhost:3000/articles/${sale.article_id}`)
        );
        const productResponses = await Promise.all(productPromises);
        const productsData = productResponses.reduce((acc, response) => {
          acc[response.data.id] = response.data;
          return acc;
        }, {});
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching sales or products:', error);
      }
    };

    fetchSales();
  }, []);

  const totalSalesInDollars = sales.reduce((total, sale) => {
    const product = products[sale.article_id];
    return total + (product ? product.price * sale.quantity : 0);
  }, 0);

  const totalSalesInProducts = sales.reduce((total, sale) => total + sale.quantity, 0);

  const productSalesCount = sales.reduce((acc, sale) => {
    acc[sale.article_id] = (acc[sale.article_id] || 0) + sale.quantity;
    return acc;
  }, {});

  const mostSoldProduct = Object.keys(productSalesCount).reduce((a, b) => productSalesCount[a] > productSalesCount[b] ? a : b, null);
  const leastSoldProduct = Object.keys(productSalesCount).reduce((a, b) => productSalesCount[a] < productSalesCount[b] ? a : b, null);

  const stats = [
    {
      label: 'Total Sales in $',
      value: `$${totalSalesInDollars.toFixed(2)}`,
      change: '+12.5%',
      icon: TrendingUp,
    },
    {
      label: 'Total Sales in Products',
      value: totalSalesInProducts,
      change: '+4.3%',
      icon: Coffee,
    },
    {
      label: 'Most Sold Product',
      value: products[mostSoldProduct]?.name || 'N/A',
      change: productSalesCount[mostSoldProduct] || 0,
      icon: UsersIcon,
    },
    {
      label: 'Least Sold Product',
      value: products[leastSoldProduct]?.name || 'N/A',
      change: productSalesCount[leastSoldProduct] || 0,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-brown-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.label}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Sales
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sale ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sale Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.length > 0 ? (
                sales.map(sale => {
                  const product = products[sale.article_id];
                  const transactionAmount = product ? product.price * sale.quantity : 0;
                  return (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product && <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover" />}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product ? product.name : 'Unknown Product'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {sale.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {sale.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(sale.sale_time).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          ${transactionAmount.toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    No sales in the last 24 hours
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}