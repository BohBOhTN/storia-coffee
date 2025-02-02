import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

interface Product {
  id: number;
  name: string;
  price: string;
  category_id: number | null;
  image_url: string;
}

interface Category {
  id: number;
  name: string;
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategoryId, setNewProductCategoryId] = useState<number | null>(null);
  const [newProductImageUrl, setNewProductImageUrl] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/articles')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    axios.get('http://localhost:3000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (newProductName.trim() === '' || newProductPrice.trim() === '' || newProductImageUrl.trim() === '' || newProductCategoryId === null) return;
    axios.post('http://localhost:3000/articles', {
      name: newProductName,
      price: parseFloat(newProductPrice),
      category_id: newProductCategoryId,
      image_url: newProductImageUrl
    })
    .then(response => setProducts([...products, response.data]))
    .catch(error => console.error('Error adding product:', error));
    setIsAddModalOpen(false);
  };

  const handleEditProduct = () => {
    if (productToEdit && newProductName.trim() !== '' && newProductPrice.trim() !== '' && newProductImageUrl.trim() !== '' && newProductCategoryId !== null) {
      axios.put(`http://localhost:3000/articles/${productToEdit.id}`, {
        name: newProductName,
        price: parseFloat(newProductPrice),
        category_id: newProductCategoryId,
        image_url: newProductImageUrl
      })
      .then(response => {
        setProducts(products.map(product => product.id === response.data.id ? response.data : product));
      })
      .catch(error => console.error('Error updating product:', error));
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteProduct = (id: number) => {
    axios.delete(`http://localhost:3000/articles/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
        setIsDeleteModalOpen(false);
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setNewProductName(product.name);
    setNewProductPrice(product.price);
    setNewProductCategoryId(product.category_id);
    setNewProductImageUrl(product.image_url);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${parseFloat(product.price).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category_id !== null ? categories.find(category => category.id === product.category_id)?.name || 'Loading...' : 'Uncategorized'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-full object-cover" src={product.image_url} alt={product.name} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => openDeleteModal(product)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <Modal onClose={() => setIsAddModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <div className="mb-4">
              <Input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Product name"
                className="mb-2"
              />
              <Input
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="Price"
                className="mb-2"
              />
              <select
                value={newProductCategoryId ?? ''}
                onChange={(e) => setNewProductCategoryId(Number(e.target.value))}
                className="rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 mb-2 w-full"
              >
                <option value="" disabled>Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Input
                type="text"
                value={newProductImageUrl}
                onChange={(e) => setNewProductImageUrl(e.target.value)}
                placeholder="Image URL"
                className="mb-2"
              />
              <Button onClick={handleAddProduct}>Add Product</Button>
            </div>
          </div>
        </Modal>
      )}

      {isEditModalOpen && productToEdit && (
        <Modal onClose={() => setIsEditModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="mb-4">
              <Input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Product name"
                className="mb-2"
              />
              <Input
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="Price"
                className="mb-2"
              />
              <select
                value={newProductCategoryId ?? ''}
                onChange={(e) => setNewProductCategoryId(Number(e.target.value))}
                className="rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 mb-2 w-full"
              >
                <option value="" disabled>Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Input
                type="text"
                value={newProductImageUrl}
                onChange={(e) => setNewProductImageUrl(e.target.value)}
                placeholder="Image URL"
                className="mb-2"
              />
              <Button onClick={handleEditProduct}>Update Product</Button>
            </div>
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && productToDelete && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the product "{productToDelete.name}"?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
              <Button onClick={() => handleDeleteProduct(productToDelete.id)} className="bg-red-600 text-white">Yes</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}