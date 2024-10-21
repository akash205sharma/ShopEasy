
export async function placeOrder({ cart, user }) {
    try {

        // console.log(cart,user);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart: cart, user: user }),  // Convert the product data to JSON
        });

        if (!res.ok) {
            throw new Error(`Failed to Place Order. Status: ${res.status}`);
        }
        else console.log("Order Placed successfully", res)
        // const data = await res.json();
        // return data;

    } catch (error) {
        console.error("Error Placing Order:", error);
        return { error: 'Failed to Place Order' };
    }
}

export async function history(id) {
    
    try {

        // console.log(id);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order?id=${id}`)
        const orders = await res.json();

        // console.log(orders);    
        
        if (!res.ok) {

            console.log("res not ok");
            
            throw new Error(`Failed to find Orders. Status: ${res.status}`);
        }

        return orders; 

    } catch (error) {
        console.log(error);
        
        return {error : "Failed to Fetch orders"};
    }
}

export async function fetchAdminOrders(id) {
    try {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order?id=${id}`)
        const orders = await res.json();

        
        if (!res.ok) {

            console.log("res not ok");
            
            throw new Error(`Failed to Find Order. Status: ${res.status}`);
        }

        return orders; 

    } catch (error) {
        console.log(error);
        
        return {error : "Failed to Fetch Admin orders"};
    }
}