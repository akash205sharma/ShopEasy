import Product from "@/models/product";
import connect from "@/lib/db";

import { ObjectId } from 'mongodb';

export async function GET(req) {
    try {
        const searchParams = new URL(req.url).searchParams;
        
        console.log(searchParams.get('id'));
        
        const id = searchParams.get('id');

        await connect();

        // Find the product by its ObjectId
        const product = await Product.findOne({ _id: new ObjectId(id) });
        
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

        // console.log(product)
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
