import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PolicyModal = ({ isOpen, onClose, policyData }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-700 mb-4">Policy Details</h3>
            <div className="text-sm text-gray-800 space-y-1 max-h-60 overflow-y-auto">
              {policyData && Object.keys(policyData).length > 0 ? (
                Object.entries(policyData).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value.toString()}
                  </p>
                ))
              ) : (
                <p>No policy found.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;
