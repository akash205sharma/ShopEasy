// app/api/data/route.js


import Product from "@/models/product";
import connect from "@/lib/db";



//For Getting Data from local Mongodb

// import clientPromise from "@/lib/mongodb";
// export async function GET(req) {
//     try {

//         const searchParams = new URL(req.url).searchParams;
//         const minprice = parseFloat(searchParams.get('minprice')) || 0;
//         const maxprice = parseFloat(searchParams.get('maxprice')) || Infinity; // If no maxprice, use Infinity


//         // not working for directly using useEffect only working for use(fetch) in server component
//         // const { minprice, maxprice } = parseFloat(req.query);        
        

//         const client = await clientPromise;
//         const db = client.db('ShopEasy'); // Replace with your database name
//         const collection = db.collection('products'); // Replace with your collection name


//         const data = await collection.find({
//             price: {
//                 $gte: minprice || 0,  // If minprice is not provided, default to 0
//                 $lte: maxprice || 100  // If maxprice is not provided, default to no upper limit
//             }
//         }).toArray();


//         // Convert ObjectId to string
//         const formattedData = data.map(item => ({
//             ...item,
//             _id: item._id.toString(),  // Convert ObjectId to string
//         }));
        


//         return new Response(JSON.stringify(formattedData), {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         console.error(error);
//         return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
//             status: 500,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     }
// };




export async function GET(req) {
    try {

        const searchParams = new URL(req.url).searchParams;
        const minprice = parseFloat(searchParams.get('minprice')) || 0;
        const maxprice = parseFloat(searchParams.get('maxprice')) || Infinity; // If no maxprice, use Infinity


        // not working for directly using useEffect only working for use(fetch) in server component
        // const { minprice, maxprice } = parseFloat(req.query);        
        
        await connect();


        const data = await Product.find({
            price: {
                $gte: minprice || 0,  // If minprice is not provided, default to 0
                $lte: maxprice || 100  // If maxprice is not provided, default to no upper limit
            }
        }).lean();


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



export const POST = async (request) => {
    try {
        // Connect to the database
        await connect();

        // Parse the request body to get the product data
        const body = await request.json();  

        // Validate that all required fields are present
        const { img, category, name, company, price } = body;
        
        if (!img || !category || !name || !company || typeof price !== 'number') {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,  // Bad Request
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Create a new product instance with the provided data
        const newProduct = new Product({
            img,
            category,
            name,
            company,
            price,
        });

        // Save the new product to the database
        await newProduct.save();

        // Return a success response with the created product's data
        return new Response(JSON.stringify({ message: "Product inserted successfully", product: newProduct }), {
            status: 201,  // Created
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Error inserting product in server :", error);
        return new Response(JSON.stringify({ error: "Failed to insert product" }), {
            status: 500,  // Internal Server Error
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
