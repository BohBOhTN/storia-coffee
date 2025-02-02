import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coffee, 
  Users, 
  Bell, 
  ShoppingCart, 
  UserCircle, 
  LogOut,
  Menu
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { clsx } from 'clsx';

export default function Sidebar() {
  const { user, setUser } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const managerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/products', icon: Coffee, label: 'Products' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/alerts', icon: Bell, label: 'Alerts' },
    { to: '/categories', icon: Coffee, label: 'Categories' }, // Added Categories link
  ];

  const userLinks = [
    { to: '/sales', icon: ShoppingCart, label: 'Sales' },
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  const links = user?.role === 'manager' ? managerLinks : userLinks;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
      {/* Removed toggle button from sidebar */}
      <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200 min-h-screen flex flex-col justify-between transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0`}>
        <nav className="mt-8 space-y-1 px-4">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                  'transition-colors duration-150 ease-in-out',
                  isActive
                    ? 'bg-brown-50 text-brown-700'
                    : 'text-gray-600 hover:bg-gray-50'
                )
              }
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-2">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md transition-colors duration-150 ease-in-out hover:bg-red-50 hover:text-red-700 w-full"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
          {showLogoutConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="mb-4">Are you sure you want to sign out?</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    No
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}