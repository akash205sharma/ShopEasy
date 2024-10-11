"use client"

import React, {useContext} from 'react'
import { toast } from "sonner"
import CartContext from '@/context/CartContext'
import Link from 'next/link'

const Productcard = ({ item }) => {

    // console.log(item._id);

    const {cart,addItemToCart,deleteItem} = useContext(CartContext);
    const star = item.rating * 20;
    
    const addToCartHandeler = () => {

        addItemToCart({
            item:item,
            quantity : 1,
        })

        toast("Item is Added to Cart", {
            description: item.name,
            action: {
                label: "Remove",
                onClick: () =>{
                    deleteItem({item:item});
                    toast("Item is Removed")
                },
            },
        })
    }
    // console.log(item);


    return (
        <Link href={item._id} >
        <div className=' group bg-white relative hover:shadow-xl pb-[26rem] m-4 p-5 pt-0 w-[250px] h-[400px] border rounded-lg '>
            <div className='inset-0 opacity-0 -z-10 transition-all duration-300 group-hover:opacity-100 group-hover:z-10 w-[30px] absolute left-[200px] top-3'>
                <img src="/heart-g-1.svg" alt="" />
            </div>
            <div>
                <img src={item.img} alt="" />
            </div>
            <div className='flex flex-col space-y-1 '>
                <div className='text-gray-600' >{item.category}</div>
                <h2 className=' font-bold text-[#253D4E]' >{item.name}</h2>
                <div className='flex align-middle space-x-2'>
                    <div className="bg-star-b bg-contain w-[73px] h-[15px]"><div style={{ width: `${star}%` }} className={`bg-star-y bg-contain h-[15px]`}></div> </div>
                    <div className='text-[15px]' >({item.rating})</div>
                </div>
                <div className='text-[15px]' > By <span className='text-green-600'>{item.company}</span> </div>
                <div className='flex p-2 w-[100%] mb-10'>
                    <div className='w-[50%] p-3 text-[20px] text-green-600 font-bold'>  ${item.price}</div>
                    <div onClick={() => { addToCartHandeler() }} className='w-[50%] flex items-center p-2 text-[20px] hover:text-white hover:bg-green-500 active:text-green-600 active:bg-green-200 text-green-600 font-bold bg-green-200 rounded-lg'> <img width={25} src="cart.svg" alt="" />Add</div>
                </div>

            </div>
        </div>
        </Link>
    )
}

export default Productcard
