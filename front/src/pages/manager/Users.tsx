import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import axios from 'axios';
import Modal from 'react-modal'; // Add this import for the modal

interface User {
  id: number;
  email: string;
  role: 'manager' | 'user';
  created_at: string;
}

Modal.setAppElement('#root'); // Add this line to set the app element for accessibility

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const [newUser, setNewUser] = useState({ email: '', password: '', confirmPassword: '', role: 'user' }); // State for new user
  const [users, setUsers] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<number | null>(null); // State for user to delete

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.post('http://localhost:3000/users/register', {
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message);
      setIsModalOpen(false);
      // Optionally, update the user list here
    } catch (error) {
      console.error(error);
      alert("Failed to register user");
    }
  };

  const handleDeleteUser = async () => {
    if (userToDelete === null) return;
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      await axios.delete(`http://localhost:3000/users/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter(user => user.id !== userToDelete));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const userToDeleteEmail = users.find(user => user.id === userToDelete)?.email;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
        >
          <option value="all">All Roles</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <Input
                type="password"
                value={newUser.confirmPassword}
                onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500"
              >
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
              <Button type="submit">Add User</Button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete the user with email {userToDeleteEmail}?</p>
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={() => setIsDeleteModalOpen(false)} className="mr-2">No</Button>
            <Button type="button" onClick={handleDeleteUser} className="bg-red-600 text-white">Yes</Button>
          </div>
        </div>
      </Modal>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'manager' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(user.created_at)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        setUserToDelete(user.id);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}