"use client"

import React, { useContext } from 'react'
import CartContext from '@/context/CartContext';


const page = () => {


    const { cart, addItemToCart, deleteItem } = useContext(CartContext);
    // console.log(cart)

    const star = 50;

    const handelQuatity=(e,i)=>{
        e.preventDefault()
        // console.log( i , e.target.value )

        i.quantity=e.target.value;
        addItemToCart({item:i.item, quantity:i.quantity} )
    }


    return (

        <div className="flex">
            <div>
                <div className=" h-[50px]  text-3xl text-green-800 flex items-center " >
                    There are {cart?.cartItems?.length || 0} Product in your Cart
                </div>



                <table className="w-[65vw]">
                    <thead>
                        <tr className="bg-gray-400 h-16" >
                            <th scope="col" colspan="2">Product</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col" className="end">Remove</th>
                        </tr>
                    </thead>
                    <tbody>

                        {cart?.cartItems?.map((i) => {
                            return (
                                <tr className=" border h-[50px] ">
                                    <td className=""><img className="border m-5 p-2" width={120} src={i.item.img} alt="#" /></td>
                                    <td className="">
                                        <h6 className=""><a className=" mb-10" href="">{i.item.name}</a></h6>
                                        <div className="">
                                            <div className="">
                                                <div className="">
                                                </div>
                                            </div>
                                            <div className="bg-star-b bg-contain w-[73px] h-[15px]"><div style={{ width: `${star}%` }} className={`bg-star-y bg-contain h-[15px]`}></div> </div>
                                            <div className='text-[15px]' >({star / 20})</div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <h4 className="">{i.item.price} </h4>
                                    </td>
                                    <td className=" flex justify-center items-center h-[160px] " >
                                        <div className="border flex items-center justify-center border-green-600 rounded-md w-[100px] h-16">
                                            <div><input onChange={(e) => { handelQuatity(e,i) }} className="w-[100px] h-16" type="number" value={i.quantity} /> </div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <h4 className="">{i.item.price} </h4>
                                    </td>
                                    <td onClick={ () => { deleteItem({item:i.item}) }} ><img width={40} src="delete.png" alt="" /></td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>

            </div>


            <div className="flex m-10  justify-center items-start fixed top-[120px] right-[0px]" >
                <div className='  h-[50vh] w-[30vw] border border-green-600' >
                    <div className="m-8" >
                        <div className="border p-6 text-2xl flex justify-between " >
                            <span>SubTotal</span>
                            <span className="text-green-600 font-sans font-semibold" >$ {3595} </span>
                        </div>
                        <div className="border p-6 text-2xl flex justify-between " >
                            <span>Dilevery Charges</span>
                            <span className="text-green-600 font-sans font-semibold" >$ {3595} </span>
                        </div>
                        <div className="border p-6 text-2xl flex justify-between " >
                            <span>Total</span>
                            <span className="text-green-600 font-sans font-semibold" >$ {3595} </span>
                        </div>
                        <div className="bg-green-500 flex items-center justify-center h-[8vh] rounded-md mt-2 ">
                            Proceed To Checkout
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page