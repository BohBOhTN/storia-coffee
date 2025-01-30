import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(
    { id: 1, name: 'Test Manager', email: 'manager@example.com', role: 'manager' }
    // { id: 2, name: 'Test User', email: 'user@example.com', role: 'user' } // Uncomment this line to switch to a simple user
  );
  const [isLoading, setIsLoading] = useState(false);

  // Temporarily disable authentication logic
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // TODO: Validate token and fetch user data
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}