import React, { useState } from 'react';
import { Plus, Bell, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface Alert {
  id: number;
  type: 'stock' | 'sales' | 'system';
  message: string;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'resolved' | 'dismissed';
  createdAt: string;
}

const dummyAlerts: Alert[] = [
  {
    id: 1,
    type: 'stock',
    message: 'Espresso beans running low (< 20% remaining)',
    severity: 'high',
    status: 'active',
    createdAt: '2024-03-15 10:30'
  },
  {
    id: 2,
    type: 'sales',
    message: 'Unusual spike in sales detected',
    severity: 'medium',
    status: 'resolved',
    createdAt: '2024-03-14 15:45'
  },
];

export default function Alerts() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = dummyAlerts.filter(alert => 
    statusFilter === 'all' || alert.status === statusFilter
  );

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'stock':
        return <Bell className="h-5 w-5" />;
      case 'sales':
        return <AlertTriangle className="h-5 w-5" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status: Alert['status']) => {
    switch (status) {
      case 'active':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'dismissed':
        return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </div>

      <div className="flex space-x-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{alert.message}</h3>
                  <div className="mt-1 flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Created: {alert.createdAt}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getSeverityColor(alert.severity)
                    }`}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                    <span className="inline-flex items-center space-x-1">
                      {getStatusIcon(alert.status)}
                      <span className="text-sm text-gray-500 capitalize ml-1">
                        {alert.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {alert.status === 'active' && (
                  <>
                    <Button variant="outline" size="sm">
                      Resolve
                    </Button>
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}