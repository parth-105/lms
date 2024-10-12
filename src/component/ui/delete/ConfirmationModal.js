"use client"
import { useState } from 'react';


const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className='modalOverlay  z-50 '>
            <div className='modalContent'>
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this video?</p>
              <div className='modalActions'>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onConfirm}>Yes, Delete</button>
              </div>
            </div>
          </div>
  );
};

export default ConfirmationModal;
