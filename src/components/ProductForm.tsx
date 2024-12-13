import axios from "axios";
import React, { useState, useEffect } from "react";

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

interface ProductManagerProps {
  product: Partial<Product>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  handleProductUpdateOrAdd: () => void;
}

const ProductManager: React.FC<ProductManagerProps> = ({
  product,
  setShowForm,
  setProducts,
  products,
  handleProductUpdateOrAdd,
}) => {
  const [productData, setProductData] = useState<Product>({
    _id: product._id || "",
    name: product.name || "",
    price: product.price || 0,
    image: product.image || "",
    weight: product.weight || "",
    pieces: product.pieces || "",
    servings: product.servings || "",
    description: product.description || "",
    macros: product.macros || "",
    gravy: product.gravy || "",
    fry: product.fry || "",
    barbeque: product.barbeque || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setProductData({
      _id: product._id || "",
      name: product.name || "",
      price: product.price || 0,
      image: product.image || "",
      weight: product.weight || "",
      pieces: product.pieces || "",
      servings: product.servings || "",
      description: product.description || "",
      macros: product.macros || "",
      gravy: product.gravy || "",
      fry: product.fry || "",
      barbeque: product.barbeque || "",
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.size >= 200000 && file.size <= 300000) {
      setImageFile(file);
    } else {
      alert("Image size should be between 200KB and 300KB.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", productData.name);
    form.append("weight", productData.weight);
    form.append("servings", productData.servings);
    form.append("pieces", productData.pieces);
    form.append("description", productData.description);
    form.append("fry", productData.fry);
    form.append("gravy", productData.gravy);
    form.append("barbeque", productData.barbeque);
    form.append("price", productData.price.toString());
    if (imageFile) form.append("image", imageFile);

    try {
      if (product._id) {
        // Update product
        const response = await axios.put(
          `https://api.fishly.co.in/updateProduct/${product._id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Product updated:", response.data);
          handleProductUpdateOrAdd(); // Refresh product list
        }
      } else {
        // Add new product
        const response = await axios.post(
          "https://api.fishly.co.in/addProduct",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Product added:", response.data);
          handleProductUpdateOrAdd(); // Refresh product list
        }
      }
    } catch (error) {
      console.log("Error while adding/updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative overflow-auto max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">
          {product._id ? "Update Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="mb-4">
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Weight:</label>
            <input
              type="text"
              name="weight"
              value={productData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Pieces:</label>
            <input
              type="text"
              name="pieces"
              value={productData.pieces}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Servings:</label>
            <input
              type="text"
              name="servings"
              value={productData.servings}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Description:</label>
            <input
              type="text"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Fry:</label>
            <input
              type="text"
              name="fry"
              value={productData.fry}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Gravy:</label>
            <input
              type="text"
              name="gravy"
              value={productData.gravy}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Barbeque:</label>
            <input
              type="text"
              name="barbeque"
              value={productData.barbeque}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Image input */}
          <div className="mb-4">
            <label className="block">Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
            />
            {imageFile && <p>Selected image: {imageFile.name}</p>}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {product._id ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductManager;
