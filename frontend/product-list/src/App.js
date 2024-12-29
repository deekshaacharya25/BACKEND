import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";


function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch("http://localhost:3000/api/product/list", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.responseData && Array.isArray(data.responseData)) {
          setProducts(data.responseData);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Product List
      </h1>
      <div className="space-y-4">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.product_id}
              className="border border-gray-300 p-8 rounded-lg bg-gray-200 shadow-sm "
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                {product.name}
              </h3>
              <div className="grid grid-cols-2 gap-x-0 gap-y-2">
                      <p className="font-medium">Product ID:</p>
                      <p>{product.product_id}</p>
                      <p className="font-medium">Description:</p>
                      <p>{product.description}</p>
                      <p className="font-medium">Brand:</p>
                      <p>{product.brand}</p>
                      <p className="font-medium">Price:</p>
                      <p>${product.price}</p>
                      <p className="font-medium">Category:</p>
                      <p>{product.category}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No products available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
