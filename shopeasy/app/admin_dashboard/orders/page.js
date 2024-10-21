"use client"
import React, { useEffect, useState } from 'react'
import { fetchAdminOrders } from '@/actions/orders'  // A function to fetch admin orders data
import { useSession } from 'next-auth/react'
import NoOrderHistory from '@/components/NoOrderHistory'


const Page = () => {
  const { data: session } = useSession()
  const [adminOrders, setAdminOrders] = useState([])

  const id = session?.user?.id; 

  useEffect(() => {
    const fetchOrders = async () => {
      if (!id) return;
      const data = await fetchAdminOrders(id)  // Fetch all orders for admin
      setAdminOrders(data)
    }
    fetchOrders()
  }, [id])


  return (
    <div className="w-[80vw] mx-auto p-8 bg-gray-50 shadow-lg rounded-lg mt-6">
      <div className="text-3xl font-bold text-center mb-6 text-gray-800">
        Admin Orders Overview
      </div>

      <div className="grid grid-cols-[2fr_2fr_repeat(1,_3fr)_1fr_1fr_1fr] gap-4 bg-gradient-to-r from-green-600 to-purple-400 text-white text-xl font-semibold p-4 rounded-t-lg">
        <div>Customer</div>
        <div>Address</div>
        <div>Image</div>
        <div>Product</div>
        <div>Quantity</div>
        <div>Total</div>
      </div>

      {adminOrders.length === 0 ? (
        <NoOrderHistory />
      ) : (
        adminOrders.reverse().map((order) => (
          <div key={order._id} className="border bg-white p-6 m-4 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between mb-6">
              <div className="text-gray-700 font-medium text-lg">
                <span className="font-bold">Customer:</span> {order.name}
              </div>
              <div className="text-gray-600 text-sm">
                Order Date: <span className="text-gray-800 font-semibold">{new Date(order.orderDate).toLocaleDateString()}</span>
              </div>
            </div>

            {order.items.map((item) => (
              <div key={item._id} className="grid grid-cols-[2fr_2fr_repeat(1,_3fr)_1fr_1fr_1fr] gap-6 items-center mb-4">
                <div className="text-gray-700">{order.address}</div>
                <div className="w-[80px]">
                  <img className="rounded-lg" src={item.img} alt={item.name} />
                </div>
                <div className="text-gray-800 font-medium">{item.name}</div>
                <div className="text-gray-500">{item.quantity}</div>
                <div className="text-blue-600 font-semibold">₹{item.quantity * item.price}</div>
              </div>
            ))}

            <div className="flex justify-between items-center border-t pt-4 mt-6 text-gray-700">
              <div className="text-sm">
                <span className="font-semibold">Shipping Address:</span> {order.address}
              </div>
              <div className="font-semibold text-lg text-gray-800">Total: ₹{order.totalAmount}</div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Page
