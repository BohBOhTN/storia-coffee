import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface User {
  email: string;
  role: string;
}

export default function Profile() {
  const { user, setUser } = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUserInfo(userResponse.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">User Information</h2>
        <p className="mt-2 text-gray-600"><strong>Email:</strong> {userInfo?.email}</p>
        <p className="mt-2 text-gray-600"><strong>Role:</strong> {userInfo?.role}</p>
      </div>
    </div>
  );
}
