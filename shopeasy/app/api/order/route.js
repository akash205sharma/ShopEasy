import { ObjectId } from "mongodb";
import User from "@/models/user";
import connect from "@/lib/db";
import { NextResponse } from "next/server";


export async function PATCH(req) {
	try {
		const { cart, user } = await req.json();
		await connect();  // Assume this connects to the database
		// console.log(cart, user);

		// Check if cart and cartItems are valid
		if (cart?.cartItems) {
			// Create a map to group items by adminId
			const adminOrders = {};

			// Group items by adminId
			for (const key of cart.cartItems) {
				const adminId = key.item.adminId;

				if (!adminOrders[adminId]) {
					adminOrders[adminId] = {
						userId: user.id,  // Assuming you have the user's ID
						items: [],
						totalAmount: 0,  // Initialize total amount
						orderDate: new Date()  // Set current date
					};
				}

				// Add item to the corresponding admin's order
				adminOrders[adminId].items.push({
					productId: key.item._id,   // Product ID from cart
					quantity: key.quantity,    // Quantity from cart
					name: key.item.name,        // Product name
					price: key.item.price,      // Product price
					img: key.item.img,          // Product image URL
					quantity: key.quantity
				});

				// Update the total amount for this admin's order
				adminOrders[adminId].totalAmount += key.item.price * key.quantity;
			}

			// Now, loop through each distinct adminId and update their order history
			for (const adminId in adminOrders) {
				await User.updateOne(
					{ _id: new ObjectId(adminId) },  // Find the admin by their ID
					{
						$push: { adminOrderHistory: adminOrders[adminId] }  // Add the grouped order to admin's order history
					}
				);
			}



			//for users update

			const Totalprice = cart.cartItems.reduce((total, cartItem) => {
				return total + (cartItem.item.price * cartItem.quantity);
			}, 0);


			// Create a new order object using the data from the request
			const newOrder = {
				items: cart.cartItems.map(cartItem => ({
					productId: cartItem.item._id,    // Product ID from cart item
					name: cartItem.item.name,        // Product name
					price: cartItem.item.price,      // Product price
					img: cartItem.item.img,          // Product image URL
					quantity: cartItem.quantity      // Quantity of the product
				})),
				totalAmount: Totalprice,    // Total amount for the order (assuming this is calculated beforehand)
				orderDate: new Date(),      // Set current date for the order
			};

			// console.log(newOrder);



			// Find the user by their ID and push the new order into orderHistory
			const updatedUser = await User.updateOne(
				{ _id: new ObjectId(user.id) },  // Find the user by their ID
				{ $push: { orderHistory: newOrder } }  // Push the new order to orderHistory
			);

			if (updatedUser.nModified === 0) {
				return NextResponse.json({ message: 'User not found or order not updated' }, { status: 404 });
			}

			return NextResponse.json({ message: 'Order Placed successfully' }, { status: 200 });
		}


	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: 'Failed to Place Order' }, { status: 500 });
	}
}

export async function GET(req) {
	try {

		const searchParams = new URL(req.url).searchParams;
		const id = searchParams.get('id');

		
		await connect();

		const user = await User.findOne({ _id: new ObjectId(id) });

		if (!user) {
			return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
		}

		const orders = user.orderHistory;

		return NextResponse.json(orders);



	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch order history' }, { status: 500 });
	}

}