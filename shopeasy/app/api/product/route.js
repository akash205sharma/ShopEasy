import clientPromise from '@/lib/mongodb';

import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
    try {
        const { id } = params; // Extract the product id from the URL parameters

        const client = await clientPromise;
        const db = client.db('ShopEasy'); // Replace with your database name
        const collection = db.collection('products'); // Replace with your collection name

        // Find the product by its ObjectId
        const product = await collection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Convert ObjectId to string before sending response
        product._id = product._id.toString();

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
