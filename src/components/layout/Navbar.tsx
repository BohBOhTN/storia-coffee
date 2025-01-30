import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export default function Navbar() {
  const { user } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from API and set them
    // Example:
    // fetch('/api/notifications')
    //   .then(response => response.json())
    //   .then(data => {
    //     setNotificationCount(data.count);
    //     setNotifications(data.notifications);
    //   });
    setNotificationCount(2); // Placeholder value
    setNotifications([
      { message: 'New order received', time: '2 mins ago' },
      { message: 'Stock running low', time: '1 hour ago' }
    ]); // Placeholder notifications

    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-bell')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleNotifications = (event) => {
    event.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  const truncateMessage = (message, maxLength) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-brown-600">Storia Coffee</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user?.role === 'manager' && (
              <div className="relative notification-bell mr-4">
                <button className="text-gray-500 hover:text-gray-700" onClick={toggleNotifications}>
                  <Bell className="h-6 w-6" />
                </button>
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {notificationCount}
                  </span>
                )}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul>
                      {notifications.map((notification, index) => (
                        <li key={index} className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                          <div className="font-bold">{truncateMessage(notification.message, 50)}</div>
                          <div className="text-xs text-gray-500">{notification.time}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {/* Removed user greeting */}
          </div>
        </div>
      </div>
    </nav>
  );
}