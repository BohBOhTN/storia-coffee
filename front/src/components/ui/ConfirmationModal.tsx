import React from 'react';
import { Button } from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Order Confirmed</h2>
        <p className="mb-4">Thank you for your purchase! Your order has been successfully placed.</p>
        <Button onClick={onClose} className="bg-brown-600 text-white hover:bg-brown-700">
          Close
        </Button>
      </div>
    </div>
  );
};
