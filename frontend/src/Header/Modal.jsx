import React from "react";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-2xl transform transition-transform duration-300 ease-in-out scale-105">
        <h2 className="text-xl text-orange-400 font-semibold mb-4">Confirm Sign Out</h2>
        <p className="mb-6 text-black">Are you sure you want to sign out?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition-colors duration-200"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="px-4 py-2 bg-orange-400 text-white rounded-full shadow-md hover:bg-orange-5x00 transition-colors duration-200"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
