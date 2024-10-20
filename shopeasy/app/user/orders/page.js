
"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { history } from '@/actions/orders'
import { useSession } from 'next-auth/react'
import NoOrderHistory from '@/components/NoOrderHistory'
const Page = () => {
  const { data: session } = useSession()
  const [orders, setOrders] = useState([])
  const id = session?.user?.id;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      const data = await history(id);
      setOrders(data);
    }
    fetchOrder();
  }, [id])

  return (
    <div className="w-[82vw] mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <div className="grid grid-cols-[2fr_repeat(1,_3fr)_1fr_1fr_1fr] gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white text-2xl font-semibold p-3 rounded-t-lg">
        <div>Image</div>
        <div>Name</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total Price</div>
      </div>

    {orders.length==0 ?(<NoOrderHistory/>):(

      orders.map((order) => (
        <div key={order.id} className="border bg-white p-5 m-3 shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
          {order.items.map((item) => (
            <div key={item.id} className="grid grid-cols-[2fr_repeat(1,_3fr)_1fr_1fr_1fr]  gap-4 justify-around items-center mb-4">
              <div className="w-[100px]">
                <img className="rounded-lg" src={item.img} alt={item.name} />
              </div>
              <div className="text-gray-700 font-medium">{item.name}</div>
              <div className="text-green-600 font-semibold">₹{item.price}</div>
              <div className="text-gray-500">{item.quantity}</div>
              <div className="text-blue-600 font-semibold">₹{item.quantity * item.price}</div>
            </div>
          ))}
          <div className="flex justify-between items-center border-t pt-4 text-gray-600">
            <div>Order Date: <span className="text-gray-800 font-semibold">{order.orderDate}</span></div>
            <div className="font-semibold text-lg text-gray-800">Total: ₹{order.totalAmount}</div>
          </div>
        </div>
      ))
    )}
    </div>
  )
}

export default Page
