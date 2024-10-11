// app/api/data/route.js

import clientPromise from "@/lib/mongodb";


export async function GET(req) {
    try {

        const searchParams = new URL(req.url).searchParams;
        const minprice = parseFloat(searchParams.get('minprice')) || 0;
        const maxprice = parseFloat(searchParams.get('maxprice')) || Infinity; // If no maxprice, use Infinity


        // not working for directly using useEffect only working for use(fetch) in server component
        // const { minprice, maxprice } = parseFloat(req.query);        
        

        const client = await clientPromise;
        const db = client.db('ShopEasy'); // Replace with your database name
        const collection = db.collection('products'); // Replace with your collection name


        const data = await collection.find({
            price: {
                $gte: minprice || 0,  // If minprice is not provided, default to 0
                $lte: maxprice || 100  // If maxprice is not provided, default to no upper limit
            }
        }).toArray();


        // Convert ObjectId to string
        const formattedData = data.map(item => ({
            ...item,
            _id: item._id.toString(),  // Convert ObjectId to string
        }));
        


        return new Response(JSON.stringify(formattedData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
