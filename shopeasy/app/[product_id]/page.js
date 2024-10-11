"use client"

import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { fetchproduct } from '@/actions/product';
import CartContext from '@/context/CartContext';
import { toast } from "sonner"

const page = (params) => {

    const { product_id } = params.params;
    const [product, setProduct] = useState({})
    const { cart, addItemToCart, deleteItem } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        const fetchProductById = async () => {
            const product = await fetchproduct(product_id) // Fetch products with the new state values
            setProduct(product);
        };

        fetchProductById();

        // setProduct({
        //     "_id": {
        //         "$oid": "66f3b71044848d40c2fbf96b"
        //     },
        //     "img": "http://localhost:3000/product-1.jpg",
        //     "price": 25.5,
        //     "category": "Snacks",
        //     "rating": 2.7,
        //     "name": "Healthy Trail Mix",
        //     "company": "ShopEasy"
        // });

    }, [])

    const addToCartHandeler = (e) => {
        e.preventDefault()
        addItemToCart({
            item: product,
            quantity: quantity,
        })

        toast("Item is Added to Cart", {
            description: product.name,
            action: {
                label: "Remove",
                onClick: () => {
                    deleteItem({ item: product });
                    toast("Item is Removed")
                },
            },
        })
    }


    return (
        <div className="flex" >
            <div className="50vw border " ><img width={530} src={product.img} alt="" /></div>
            <div className="p-10 border w-[40vw]">
                <div className="text-5xl p-5 pb-1 " >{product.name}</div>
                <div className="p-5 pt-0 text-green-600 text-2xl" >{product.category}</div>
                <div className="text-4xl p-5 text-green-600 " >$ {product.price}</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nobis iustdolor sit amet consectetur adipisicing elit. Quo nobis iusto, ere quod sdolor sit amet consectetur adipisicing elit. Quo nobis iusto, ere quod sapiente iste, laudantium, nihil, quo nostrum laboreim.</div>
                <div className="flex items-center " >

                    <div className="flex gap-2 " >

                        <div onClick={() => { setQuantity(quantity - 1) }} className="flex justify-center bg-green-500 border border-green-600 w-[30px] rounded-lg items-center "><img width={20} src="left.png" alt="" /></div>

                        <div className="border border-green-600 text-green-700 text-2xl w-[50px] p-1 text-center rounded-lg " >{quantity}</div>

                        <div onClick={() => { setQuantity(quantity + 1) }} className="flex justify-center bg-green-500 border border-green-600 w-[30px] rounded-lg items-center "><img width={20} src="right.png" alt="" /></div>

                    </div>
                    <div onClick={(e) => { addToCartHandeler(e) }} className=" ml-3 active:bg-green-500 hover:bg-green-600 hover:cursor-pointer m-10 p-2 w-60 rounded font-sans text-center bg-green-500 text-white text-2xl" >Add To Cart</div>
                </div>
            </div>
        </div>
    )
}

export default page


