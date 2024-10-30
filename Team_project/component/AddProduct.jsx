// export default AddProduct;
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addProduct } from '../feature/product/productSlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const username = localStorage.getItem("user") || "Guest";

  // Local state to manage form inputs
  const [product, setProductState] = useState({
    id: '',
    name: '',
    href: '',
    images: [],
    imageAlt: '',
    price: '',
    color: '',
    sizes: '',
    type: '',
    condition: '',
    category: '',
    description: '',
    owner: username,
  });

  // Predefined options for select fields
  const types = ['Women', 'Men', 'Unisex'];
  const conditions = ['New', 'Used'];
  const categories = ['Sport Shoes', 'Casual Shoes', 'Formal Shoes'];

  // Retrieve username from local storage or fallback
  

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductState({
      ...product,

      [name]: name === 'images' ? value.split(',') : value, // Handle images as an array
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addProduct(product)).unwrap(); // Dispatch the addProduct thunk
      console.log("Product added successfully!");

      // Reset local state after successful submission
      setProductState({
        id: '',
        name: '',
        href: '',
        images: [],
        imageAlt: '',
        price: '',
        color: '',
        sizes: '',
        type: '',
        condition: '',
        category: '',
        description: '',
        owner: username,
      });
    } catch (error) {
      console.error("Error:", error); // Error handling
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 rounded-lg shadow-lg">
       <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Logged-in User</label>
          <input
            type="text"
            value={username}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product ID</label>
          <input
            type="number"
            name="id"
            value={product.id}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Link (href)</label>
          <input
            type="text"
            name="href"
            value={product.href}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URLs (comma separated)</label>
          <input
            type="text"
            name="images"
            value={product.images.join(",")} // Join images for display
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image Alt Text</label>
          <input
            type="text"
            name="imageAlt"
            value={product.imageAlt}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Colors (comma separated)</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sizes (comma separated)</label>
          <input
            type="text"
            name="sizes"
            value={product.sizes}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={product.type}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            name="condition"
            value={product.condition}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select Condition</option>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-black rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

