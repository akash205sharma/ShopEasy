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


    const addItemToCart = async ({ item, quantity }) => {

        const cartItem = {
            item: item,
            quantity: quantity,
        }

        const isItemExist = cart?.cartItems?.find(
            (i) => i.item._id === item._id
        )

        let newCartItems;

        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i) =>
                //dont use {} after => to correctly update
                i.item._id === item._id ? cartItem : i
            );
        }

        else {
            newCartItems = [...(cart?.cartItems || []), cartItem]
        }

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))

        // Update the state to reflect the changes in the UI
        setCart({ cartItems: newCartItems });

    }


    const deleteItem = ({item}) => {
        // Filter out the item with the specified itemId
        const newCartItems = cart?.cartItems?.filter((i) => i.item._id !== item._id);
    
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    
        // Update the state to reflect the changes in the UI
        setCart({ cartItems: newCartItems });
    };
    


    return (
        <CartContext.Provider
            value={{ cart, addItemToCart, deleteItem }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;