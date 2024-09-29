
export async function fetchproducts() {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    return data;
}

export async function fetchFilteredproducts(minprice,maxprice) {
    // console.log( " Fetch Product fuction called ",minprice,maxprice );

    const res = await fetch(`http://localhost:3000/api/products?minprice=${minprice}&maxprice=${maxprice}`);
    const data = await res.json();
    return data;
}


