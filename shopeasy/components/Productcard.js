// "use client"

// import React, { useContext } from 'react'
// import { toast } from "sonner"
// import CartContext from '@/context/CartContext'
// import Link from 'next/link'

// const Productcard = ({ item }) => {

//     // console.log(item._id);

//     const { cart, addItemToCart, deleteItem } = useContext(CartContext);
//     const star = item.rating * 20;

//     const addToCartHandeler = (e) => {
//         e.preventDefault()
//         addItemToCart({
//             item: item,
//             quantity: 1,
//         })

//         toast("Item is Added to Cart", {
//             description: item.name,
//             action: {
//                 label: "Remove",
//                 onClick: () => {
//                     deleteItem({ item: item });
//                     toast("Item is Removed")
//                 },
//             },
//         })
//         // alert(e);

//     }
//     // console.log(item);


//     return (
//         <Link href={item._id} >
//             <div className=' group bg-white relative hover:shadow-xl pb-[26rem] m-4 p-5 pt-0 w-[250px] h-[400px] border rounded-lg '>
//                 <div className='inset-0 opacity-0 -z-10 transition-all duration-300 group-hover:opacity-100 group-hover:z-10 w-[30px] absolute left-[200px] top-3'>
//                     <img src="/heart-g-1.svg" alt="" />
//                 </div>
//                 <div>
//                     <img className="max-h-[200px]" src={item.img} alt="" />
//                 </div>
//                 <div className='flex flex-col space-y-1 '>
//                     <div className='text-gray-600' >{item.category}</div>
//                     <h2 className=' font-bold text-[#253D4E]' >{item.name}</h2>
//                     <div className='flex align-middle space-x-2'>
//                         <div className="bg-star-b bg-contain w-[73px] h-[15px]"><div style={{ width: `${star}%` }} className={`bg-star-y bg-contain h-[15px]`}></div> </div>
//                         <div className='text-[15px]' >({item.rating})</div>
//                     </div>
//                     <div className='text-[15px]' > By <span className='text-green-600'>{item.company}</span> </div>
//                     <div className='flex p-2 w-[100%] mb-10'>
//                         <div className='w-[50%] p-2 text-[20px] text-green-600 font-bold'> <span className='text-[1rem]'> Rs.</span> {item.price}</div>
//                         <div onClick={(e) => { addToCartHandeler(e) }} className='w-[50%] flex items-center p-2 text-[20px] hover:text-white hover:bg-green-500 active:text-green-600 active:bg-green-200 text-green-600 font-bold bg-green-200 rounded-lg'> <img width={25} src="cart.svg" alt="" />Add</div>
//                     </div>

//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default Productcard



"use client";

import React, { useContext } from "react";
import { toast } from "sonner";
import CartContext from "@/context/CartContext";
import Link from "next/link";

const ProductCard = ({ item }) => {
  const { cart, addItemToCart, deleteItem } = useContext(CartContext);
  const star = item.rating * 20; // Calculate star width based on rating

  const addToCartHandler = (e) => {
    e.preventDefault();
    addItemToCart({
      item: item,
      quantity: 1,
    });

    toast("Item added to cart", {
      description: item.name,
      action: {
        label: "Remove",
        onClick: () => {
          deleteItem({ item: item });
          toast("Item removed from cart");
        },
      },
    });
  };

  return (
    <Link href={item._id}>
      <div className="group bg-white relative hover:shadow-xl duration-300 pb-[26rem] m-4 p-5 pt-0 w-[250px] h-[400px] border rounded-lg hover:transform hover:scale-105 ease-in-out transform transition-transform">
        {/* Heart Icon on hover */}
        <div className="absolute left-[200px] top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <img src="/heart-g-1.svg" alt="favorite" className="w-[30px]" />
        </div>

        {/* Product Image */}
        <div className="w-full h-[200px] flex justify-center items-center">
          <img className="max-h-full" src={item.img} alt={item.name} />
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-2 mt-3">
          {/* Category */}
          <div className="text-gray-500 text-sm">{item.category}</div>

          {/* Product Name */}
          <h2 className="font-semibold text-lg text-[#253D4E] line-clamp-2">{item.name}</h2>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="relative w-[73px] h-[15px] bg-star-b bg-contain">
              <div
                style={{ width: `${star}%` }}
                className="absolute top-0 left-0 h-[15px] bg-star-y bg-contain"
              />
            </div>
            <div className="text-sm text-gray-500">({item.rating})</div>
          </div>

          {/* Company */}
          <div className="text-sm text-gray-500">
            By <span className="text-green-600 font-medium">{item.company}</span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-green-600 text-lg font-bold">
              <span className="text-sm">Rs.</span> {item.price}
            </div>
            <button
              onClick={addToCartHandler}
              className="flex items-center justify-center px-4 py-2 text-white font-semibold bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-lg shadow-sm transition-all duration-300 ease-in-out"
            >
              <img src="cart.svg" alt="cart" className="w-5 mr-2" />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
