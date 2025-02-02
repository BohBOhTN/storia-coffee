import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    const newCategoryData = { name: newCategory, image_url: newImageUrl };
    axios.post('http://localhost:3000/categories', newCategoryData)
      .then(response => {
        setCategories([...categories, response.data]);
        setNewCategory('');
        setNewImageUrl('');
        setIsAddModalOpen(false);
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
  };

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteCategory = () => {
    axios.delete(`http://localhost:3000/categories/${categoryToDelete}`)
      .then(() => {
        setCategories(categories.filter(cat => cat.id !== categoryToDelete));
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    axios.get('http://localhost:3000/articles')
      .then(response => {
        const filteredProducts = response.data.filter(product => product.category_id === category.id);
        setProducts(filteredProducts);
        setProductsCount(filteredProducts.length);
        setIsModalOpen(true);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleEditCategory = (category) => {
    setNewCategory(category.name);
    setNewImageUrl(category.image_url);
    setSelectedCategory(category);
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  const handleSaveCategory = () => {
    if (newCategory.trim() === '') return;
    const updatedCategoryData = { name: newCategory, image_url: newImageUrl };
    axios.put(`http://localhost:3000/categories/${selectedCategory.id}`, updatedCategoryData)
      .then(response => {
        setCategories(categories.map(cat => cat.id === selectedCategory.id ? response.data : cat));
        setNewCategory('');
        setNewImageUrl('');
        setIsAddModalOpen(false);
        setIsEditMode(false);
        setSelectedCategory(null);
      })
      .catch(error => {
        console.error('Error updating category:', error);
      });
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
                  {new Date(category.created_at).toLocaleDateString('en-GB')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900" onClick={() => handleViewCategory(category)}>
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900" onClick={() => handleEditCategory(category)}>
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
          <div className="p-4 text-center">
            <img src={selectedCategory.image_url} alt={selectedCategory.name} className="h-48 w-48 rounded-full mx-auto mb-4 object-cover" />
            <h2 className="text-xl font-bold mb-4">{selectedCategory.name}</h2>
            <p className="text-gray-600 mb-4">Created on: {new Date(selectedCategory.created_at).toLocaleDateString('en-GB')}</p>
            <p className="text-gray-600 mb-4">Number of products: {productsCount}</p>
            <ul className="list-disc list-inside">
              {products.map((product) => (
                <li key={product.id} className="flex items-center mb-2">
                  <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded-full object-cover mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal onClose={() => setIsAddModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Category' : 'Add Category'}</h2>
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
              <Button onClick={isEditMode ? handleSaveCategory : handleAddCategory}>
                {isEditMode ? 'Save Changes' : 'Add Category'}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
              <Button onClick={confirmDeleteCategory} className="bg-red-600 text-white">Yes</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
