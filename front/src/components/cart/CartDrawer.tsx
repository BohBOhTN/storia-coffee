import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-center object-cover" />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${Number(item.price).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center">
                                <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-500">Qty</label>
                                <input
                                  id={`quantity-${item.id}`}
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                  className="w-16 border-gray-300 rounded-md"
                                />
                              </div>
                              <div className="flex">
                                <Button
                                  onClick={() => removeItem(item.id)}
                                  className="font-medium text-brown-600 hover:text-brown-500"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${items.reduce((total, item) => total + Number(item.price) * item.quantity, 0).toFixed(2)}</p>
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-brown-600 text-white hover:bg-brown-700">
                    Checkout
                  </Button>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or{' '}
                    <Button
                      onClick={onClose}
                      className="text-brown-600 font-medium hover:text-brown-500"
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}