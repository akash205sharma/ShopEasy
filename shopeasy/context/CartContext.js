"use client";

import { useRouter } from "next/navigation"
import { createContext, useState, useEffect } from "react"
const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const router = useRouter()

    useEffect(() => {
        setCartToState()
    }, [])

    const setCartToState = () => {
        setCart(
            localStorage.getItem('cart')
                ? JSON.parse(localStorage.getItem('cart'))
                : []
        )

    }


    const addItemToCart = async ({ item }) => {

        const isItemExist = cart?.cartItems?.find(
            (i) => i._id === item._id
        )
        let newCartItems;

        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i) => {
                i._id === item._id ? item : i
            })
        }
        
        else {
            newCartItems = [...(cart?.cartItems || []), item]
        }

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))

        // Update the state to reflect the changes in the UI
        setCart({ cartItems: newCartItems });

    }




    return (
        <CartContext.Provider
            value={{ cart, addItemToCart, }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;