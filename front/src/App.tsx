import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/manager/Dashboard';
import Products from './pages/manager/Products';
import Users from './pages/manager/Users';
import Alerts from './pages/manager/Alerts';
import Sales from './pages/user/Sales';
import Categories from './components/pages/Categories'; // Correct import path for Categories page

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'auto' }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/" element={<DashboardLayout />}>
                  {/* Manager Routes */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="users" element={<Users />} />
                  <Route path="alerts" element={<Alerts />} />
                  <Route path="categories" element={<Categories />} /> {/* Add Categories route */}
                  
                  {/* User Routes */}
                  <Route path="sales" element={<Sales />} />
                </Route>
              </Routes>
            </div>
          </CartProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;