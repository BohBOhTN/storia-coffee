import React, { useState, useEffect } from 'react';
import { Plus, Bell, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import api from '../../lib/axios';

interface Alert {
  id: number;
  product_id: number;
  manager_id: number;
  condition_type: 'above' | 'below';
  threshold: number;
  time_window: string;
  is_active: boolean;
  created_at: string;
}

interface Notification {
  id: number;
  alert_id: number;
  triggered_at: string;
  message: string;
  is_read: boolean;
}

const dummyAlerts: Alert[] = [
  {
    id: 1,
    product_id: 1,
    manager_id: 1,
    condition_type: 'below',
    threshold: 20,
    time_window: '1 day',
    is_active: true,
    created_at: '2024-03-15 10:30'
  },
  {
    id: 2,
    product_id: 2,
    manager_id: 1,
    condition_type: 'above',
    threshold: 100,
    time_window: '1 day',
    is_active: false,
    created_at: '2024-03-14 15:45'
  },
];

const dummyNotifications: Notification[] = [
  {
    id: 1,
    alert_id: 1,
    triggered_at: '2024-03-15 11:00',
    message: 'Espresso beans running low (< 20% remaining)',
    is_read: false
  },
  {
    id: 2,
    alert_id: 2,
    triggered_at: '2024-03-14 16:00',
    message: 'Unusual spike in sales detected',
    is_read: true
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(dummyAlerts);
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => 
    statusFilter === 'all' || (statusFilter === 'active' && !notification.is_read) || (statusFilter === 'resolved' && notification.is_read)
  );

  const getAlertIcon = (condition_type: Alert['condition_type']) => {
    switch (condition_type) {
      case 'above':
        return <Bell className="h-5 w-5" />;
      case 'below':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (is_read: boolean) => {
    return is_read ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Bell className="h-5 w-5 text-yellow-500" />;
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
        </select>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const alert = alerts.find(alert => alert.id === notification.alert_id);
          if (!alert) return null;

          return (
            <div
              key={notification.id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    {getAlertIcon(alert.condition_type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{notification.message}</h3>
                    <div className="mt-1 flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        Triggered: {notification.triggered_at}
                      </span>
                      <span className="inline-flex items-center space-x-1">
                        {getStatusIcon(notification.is_read)}
                        <span className="text-sm text-gray-500 capitalize ml-1">
                          {notification.is_read ? 'resolved' : 'active'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.is_read && (
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
          );
        })}
      </div>
    </div>
  );
}