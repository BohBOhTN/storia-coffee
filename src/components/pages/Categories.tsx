import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

export default function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // Fetch categories from API and set them
    // Example:
    // fetch('/api/categories')
    //   .then(response => response.json())
    //   .then(data => setCategories(data.categories));
    setCategories([
      { id: 1, name: 'Beverages', image_url: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', created_at: '2023-01-01', products: ['Espresso', 'Latte'] },
      { id: 2, name: 'Snacks', image_url: 'https://th.bing.com/th/id/R.bda4ece9a55f481be93fefd2339af52b?rik=9nr6o1%2bHGSGKng&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36200000%2fFood-image-food-36200386-1762-1319.jpg&ehk=UwYWPUfnqy7V9fXlLWLigiJizPqF967WO9Eya%2fBpbnw%3d&risl=&pid=ImgRaw&r=0', created_at: '2023-01-02', products: ['Croissant', 'Muffin'] }
    ]); // Placeholder categories
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    // Add category to API
    // Example:
    // fetch('/api/categories', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: newCategory, image_url: newImageUrl })
    // }).then(response => response.json())
    //   .then(data => setCategories([...categories, data.category]));
    setCategories([...categories, { id: categories.length + 1, name: newCategory, image_url: newImageUrl, created_at: new Date().toISOString(), products: [] }]); // Placeholder add
    setNewCategory('');
    setNewImageUrl('');
    setIsAddModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    // Delete category from API
    // Example:
    // fetch(`/api/categories/${id}`, { method: 'DELETE' })
    //   .then(() => setCategories(categories.filter(cat => cat.id !== id)));
    setCategories(categories.filter(cat => cat.id !== id)); // Placeholder delete
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (user?.role !== 'manager') {
    return <p>Access denied</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
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
            {filteredCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src={category.image_url} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(category.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900" onClick={() => handleViewCategory(category)}>
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedCategory && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{selectedCategory.name}</h2>
            <img src={selectedCategory.image_url} alt={selectedCategory.name} className="h-48 w-full object-cover mb-4 rounded-lg" />
            <p className="text-gray-600 mb-4">Created on: {new Date(selectedCategory.created_at).toLocaleDateString()}</p>
            <h3 className="text-lg font-bold mb-2">Products</h3>
            <ul className="list-disc list-inside">
              {selectedCategory.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </div>
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal onClose={() => setIsAddModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add Category</h2>
            <div className="mb-4">
              <Input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name"
                className="mb-2"
              />
              <Input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Image URL"
                className="mb-2"
              />
              <Button onClick={handleAddCategory}>Add Category</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
