import { useState } from 'react';
import { insertProduct } from '@/actions/product';
import { toast } from 'sonner';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        img: '',
        category: '',
        name: '',
        company: '',
        price: 0 ,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: e.target.type === 'number' ? parseFloat(value): value, // Convert to number if it's a number input
        });

    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const insert = await insertProduct(formData);
            
            console.log(insert);

            toast("Product is Inserted to Database", {
                description: formData.name,
                // action: {
                //     label: "Remove",
                //     onClick: () => {
                //         deleteItem({ item: item });
                //         toast("Item is Removed")
                //     },
                // },
            })

            setFormData({
                img: '',
                category: '',
                name: '',
                company: '',
                price: 0 ,
            })


        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className='w-[30vw] m-auto ' >
            <h1 className='bg-green-500 h-14 p-2  mb-5 text-white text-3xl' >Insert New Product</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex' >
                    <label > <div className= 'w-[150px] mb-2 rounded text-green-500 text-xl bg-bg-white border p-2 '>Image URL</div> </label>
                    <input className= 'p-2 w-full mb-2 border border-black rounded-md'
                        type="text"
                        name="img"
                        placeholder='Enter Link To Image'
                        value={formData.img}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='flex' >
                    <label><div className= 'w-[150px] mb-2 rounded text-green-500 text-xl bg-white border p-2 '>Category</div></label>
                    <input className='p-2 w-full mb-2 border border-black rounded-md'
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder='Category'
                        required
                    />
                </div>

                <div className='flex' >
                    <label><div className= 'w-[150px] mb-2 rounded text-green-500 text-xl bg-white border p-2 '>Product Name</div></label>

                    <input className= 'p-2 w-full mb-2 border border-black rounded-md'
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder='Name'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='flex' >
                    <label><div className= 'w-[150px] mb-2 rounded text-green-500 text-xl bg-white border p-2 '>Company</div></label>

                    <input className= 'p-2 w-full mb-2 border border-black rounded-md'
                        type="text"
                        name="company"
                        value={formData.company}
                        placeholder='Company'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='flex' >
                    <label><div className= 'w-[150px] mb-2 rounded text-green-500 text-xl bg-white border p-2 '>Price (in Rs)</div></label>

                    <input className= 'p-2 w-full mb-2 border border-black rounded-md'
                        type="number"
                        name="price"
                        placeholder='Price in Rs'
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className='hover:bg-green-500 active:bg-green-700 bg-green-600 p-2 text-2xl mt-2 p-2 w-full mb-2 text-white' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProductForm;
