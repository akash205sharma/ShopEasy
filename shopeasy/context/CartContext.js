"use client";

import { useRouter } from "next/navigation"
import { createContext, useState, useEffect } from "react"
const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const router = useRouter

    const addItemToCart = async ({
        product,
        name,
        price,
        image,
        stock,
        seller,
        quantity = 1,
    }) => {
        const item = {
            product,
            name,
            price,
            image,
            stock,
            seller,
            quantity,
        };
        
        const isItemExist=cart?.cartItems?.find(
            (i)=>i.product===item.product
        )
        let newCartItems;

        if(isItemExist){
            newCartItems=cart?.cartItems?.map((i)=>{
                i.product === isItemExist.product ? item : i
            })
        }
        else {
            newCartItems = [...(cart?.cartItems || []),item]
        }
        localStorage.setItem("cart",JSON.stringify({ cartItems : newCartItems }))
    }

    return (
        <CartContext.Provider
            value={{ cart, }}
        >
            {children}
        </CartContext.Provider>
    );
};

