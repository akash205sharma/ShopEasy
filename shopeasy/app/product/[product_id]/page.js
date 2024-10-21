
"use client";

import React, { useState, useEffect, useContext } from "react";
import { fetchproduct } from "@/actions/product";
import CartContext from "@/context/CartContext";
import { toast } from "sonner";

const Page = (params) => {
  const { product_id } = params.params;
  const [product, setProduct] = useState({});
  const { cart, addItemToCart, deleteItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductById = async () => {
      const product = await fetchproduct(product_id); // Fetch product details
      setProduct(product);
    };
    fetchProductById();
  }, [product_id]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    addItemToCart({
      item: product,
      quantity: quantity,
    });

    toast("Item added to cart", {
      description: product.name,
      action: {
        label: "Remove",
        onClick: () => {
          deleteItem({ item: product });
          toast("Item removed from cart");
        },
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-10 p-10 bg-gray-50 min-h-screen">
      {/* Product Image Section */}
      <div className="w-full md:w-[50%] flex justify-center items-center border rounded-lg shadow-md bg-white">
        <img className="max-h-[500px] p-5" width={500} src={product.img} alt={product.name} />
      </div>

      {/* Product Details Section */}
      <div className="w-full md:w-[40%] p-5 border rounded-lg shadow-md bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
        <p className="text-xl text-green-600 mb-5">{product.category}</p>
        <p className="text-3xl font-semibold text-green-600 mb-5">Rs. {product.price}</p>
        <p className="text-gray-600 mb-5 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nobis iusto, nihil, quo nostrum labore
          laudantium. {product.description || "More details about the product..."}
        </p>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 w-[40px] h-[40px] rounded-lg items-center"
            >
              <img width={20} src="/left.png" alt="decrease" />
            </button>

            <div className="text-gray-800 text-2xl font-bold w-[50px] text-center">{quantity}</div>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 w-[40px] h-[40px] rounded-lg items-center"
            >
              <img width={20} src="/right.png" alt="increase" />
            </button>
          </div>

          <button
            onClick={(e) => addToCartHandler(e)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-xl px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
