import React from 'react';
import { 
  TrendingUp, 
  Users as UsersIcon, 
  Coffee, 
  AlertTriangle 
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      label: 'Total Sales',
      value: '$12,345',
      change: '+12.5%',
      icon: TrendingUp,
    },
    {
      label: 'Active Users',
      value: '126',
      change: '+4.3%',
      icon: UsersIcon,
    },
    {
      label: 'Products',
      value: '48',
      change: '+2.1%',
      icon: Coffee,
    },
    {
      label: 'Active Alerts',
      value: '3',
      change: '-1',
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

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Sales
        </h3>
        {/* Chart will be added here */}
      </div>
    </div>
  );
}