import React, { useEffect, useState } from "react";
import { FaBalanceScale, FaUtensils, FaTrash } from "react-icons/fa";
import { BiDish } from "react-icons/bi";
import axios from "axios";
import ProductManager from "./ProductForm";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  weight: string;
  pieces: string;
  servings: string;
  description: string;
  macros: string;
  gravy: string;
  fry: string;
  barbeque: string;
}

const Products = () => {
  const [, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

 const fetchData = async () => {
   try {
     const response = await axios.get("https://api.fishly.co.in/getAll");
     setProducts(response.data);
   } catch (error) {
     console.error("Error fetching data:", error);
   } finally {
     setLoading(false); // Stop loading when data is fetched
   }
 };

  useEffect(() => {
   
    fetchData();
  }, []);

  const handleUpdate = (product: Product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDelete = (_id: string) => {
    console.log("Deleted", _id);
  };

  const handleAddProduct = () => {
    setCurrentProduct({});
    setShowForm(true);
  };

  const handleProductUpdateOrAdd = () => {
    fetchData(); // Refresh product list
    setShowForm(false); // Close the form
  };


  return (
    <div className="my-8 relative">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center mx-auto max-w-6xl">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border bg-gradient-to-r from-[#81f8bb] to-[#22ccdd] rounded-lg shadow-md overflow-hidden flex flex-col h-64 w-80 relative "
            >
              <img
                src={"data:image/jpeg;base64," + product.image}
                alt={product.name}
                className="w-full h-1/2 object-cover"
              />
              <div className="p-4 w-full flex justify-between items-start">
                <div className="text-left">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-sm flex items-center">
                    <FaBalanceScale className="mr-2" /> {product.weight} g
                  </p>
                  <p className="text-sm flex items-center">
                    <FaUtensils className="mr-2" /> {product.pieces}
                  </p>
                  <p className="text-sm flex items-center">
                    <BiDish className="mr-2" /> {product.servings} person
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold mb-2">₹{product.price}</p>
                  <div className="flex items-right space-x-4">
                    <button
                      className="flex items-center bg-white text-black font-bold rounded-md px-4 py-2"
                      onClick={() => handleUpdate(product)}
                    >
                      Update
                    </button>
                    <button
                      className="text-red-600 font-bold text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product._id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">
            No products found.
          </p>
        )}
      </div>

      {/* Empty card for adding a new product */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center mx-auto max-w-6xl pt-12">
        <div
          className="border-dashed border-2 border-gray-300 rounded-lg shadow-md overflow-hidden flex items-center justify-center h-64 w-80 cursor-pointer"
          onClick={handleAddProduct}
        >
          <span className="text-gray-500 text-4xl">+</span>
        </div>
      </div>

      {/* ProductManager form popup */}
      {showForm && (
        <ProductManager
          product={currentProduct}
          setShowForm={setShowForm}
          setProducts={setProducts}
          products={products}
          handleProductUpdateOrAdd={handleProductUpdateOrAdd}
        />
      )}
    </div>
  );
};

export default Products;
