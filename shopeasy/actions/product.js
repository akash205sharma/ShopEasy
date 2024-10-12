
export async function fetchproducts() {
    const res = await fetch('http://localhost:3000/api/products');    
    // const res = await fetch('http://shop-easy-hgqvyxfe1-akash205sharmas-projects.vercel.app/api/products');    
    const data = await res.json();
    return data;
}

export async function fetchproduct(id) {
    // console.log(id);
    const res = await fetch(`http://localhost:3000/api/product?id=${id}`);
    // const res = await fetch(`http://shop-easy-hgqvyxfe1-akash205sharmas-projects.vercel.app/api/product?id=${id}`);
    const data = await res.json();
    return data;

}

export async function fetchFilteredproducts(minprice,maxprice) {
    // console.log( " Fetch Product fuction called ",minprice,maxprice );
    const res = await fetch(`http://localhost:3000/api/products?minprice=${minprice}&maxprice=${maxprice}`);
    // const res = await fetch(`http://shop-easy-hgqvyxfe1-akash205sharmas-projects.vercel.app/api/products?minprice=${minprice}&maxprice=${maxprice}`);
    const data = await res.json();
    return data;
}

export async function insertProduct(newProduct) {
    
    try {
        // console.log(newProduct);

        const res = await fetch('http://localhost:3000/api/products', {
        // const res = await fetch('http://shop-easy-hgqvyxfe1-akash205sharmas-projects.vercel.app/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),  // Convert the product data to JSON
        });

        if (!res.ok) {
            throw new Error(`Failed to insert product. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error inserting product:", error);
        return { error: 'Failed to insert product' };
    }
}

