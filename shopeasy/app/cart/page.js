
"use client";

import React, { useContext } from "react";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { placeOrder } from "@/actions/orders";

const Page = () => {
  const { data: session } = useSession();
  const { cart, addItemToCart, deleteItem } = useContext(CartContext);

  const DeliveryCharges = 50;
  let SubTotal = 0;
  cart?.cartItems?.forEach((key) => {
    SubTotal += Number(key.item.price) * Number(key.quantity);
  });

  const star = 50;

  const handleQuantity = (e, i) => {
    e.preventDefault();
    i.quantity = e.target.value > 0 ? e.target.value : 0;
    addItemToCart({ item: i.item, quantity: i.quantity });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      await placeOrder({ cart: cart, user: session?.user });
      toast("Order Placed Successfully");
    } catch (error) {
      toast.error("Order could not be placed.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-10 bg-gray-50 min-h-screen">
      {/* Cart Items Section */}
      <div className="w-full lg:w-[65%] bg-white p-6 shadow-lg rounded-lg">
        <div className="text-3xl font-semibold text-gray-800 mb-6">
          {cart?.cartItems?.length || 0} Product(s) in your Cart
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b h-16 text-left text-lg text-gray-600">
              <th className="pl-6">Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart?.cartItems?.map((i, index) => (
              <tr key={i.item.id || index} className="border-t h-24 text-gray-700">
                <td className="pl-6 flex items-center">
                  <img className="w-24 h-24 rounded-lg mr-4" src={i.item.img} alt={i.item.name} />
                  <div>
                    <h4 className="text-lg font-semibold">{i.item.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-yellow-500">
                      <div className="bg-star-b bg-contain w-[73px] h-[15px]">
                        <div style={{ width: `${star}%` }} className="bg-star-y bg-contain h-[15px]" />
                      </div>
                      <span>({ star / 20})</span>
                    </div>
                  </div>
                </td>
                <td className="text-center text-xl text-green-600">Rs. {i.item.price}</td>
                <td className="text-center">
                  <input
                    type="number"
                    min="1"
                    value={i.quantity}
                    onChange={(e) => handleQuantity(e, i)}
                    className="border border-gray-300 rounded-md w-16 h-10 text-center"
                  />
                </td>
                <td className="text-center text-xl text-green-600">Rs. {i.item.price * i.quantity}</td>
                <td className="text-center">
                  <img
                    src="/delete.png"
                    alt="delete"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => deleteItem({ item: i.item })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="w-full lg:w-[30%] bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span>Subtotal</span>
            <span className="font-semibold text-green-600">Rs. {SubTotal}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Delivery Charges</span>
            <span className="font-semibold text-green-600">Rs. {DeliveryCharges}</span>
          </div>
          <div className="flex justify-between text-xl font-semibold border-t pt-4">
            <span>Total</span>
            <span className="text-green-600">Rs. {SubTotal + DeliveryCharges}</span>
          </div>
        </div>
        <button
          onClick={(e) => handleCheckout(e)}
          className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-lg transition-all duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Page;





