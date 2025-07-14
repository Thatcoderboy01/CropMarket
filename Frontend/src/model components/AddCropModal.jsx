import React, { useState, useEffect } from "react";

const AddCropModal = ({ isOpen, closeModal, addCrop }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setPrice("");
      setQuantity("");
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price <= 0 || quantity <= 0) {
      alert("Price aur Quantity 0 se zyada honi chahiye.");
      return;
    }

    const token = localStorage.getItem("token");

    const payload = {
      name,
      price: Number(price),
      quantity: Number(quantity),
    };

    try {
      const response = await fetch("https://cropmarket-hfds.onrender.com/api/crops/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        addCrop(data.crop); // Yeh dashboard ko update karega
        closeModal();
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error adding crop:", error);
      alert("Error connecting to server.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Crop</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              min="1"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCropModal;