import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coffee, 
  Users, 
  Bell, 
  ShoppingCart, 
  UserCircle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { clsx } from 'clsx';

export default function Sidebar() {
  const { user } = useAuth();

  const managerLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/products', icon: Coffee, label: 'Products' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/alerts', icon: Bell, label: 'Alerts' },
  ];

  const userLinks = [
    { to: '/sales', icon: ShoppingCart, label: 'Sales' },
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  const links = user?.role === 'manager' ? managerLinks : userLinks;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
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
          >
            <Icon className="h-5 w-5 mr-3" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}