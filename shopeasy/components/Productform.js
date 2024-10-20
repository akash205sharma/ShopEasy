import { useState } from 'react';
import { insertProduct } from '@/actions/product';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

const ProductForm = () => {
    const { data: session } = useSession(); 
    
    const [formData, setFormData] = useState({
        adminId: session?.user.id,
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
            [name]: e.target.type === 'number' ? parseFloat(value) : value, // Convert to number if it's a number input
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const insert = await insertProduct(formData);
            
            console.log(insert);

            toast("Product is Inserted to Database", {
                description: formData.name,
            });

            setFormData({
                adminId: session?.user?.id,
                img: '',
                category: '',
                name: '',
                company: '',
                price: 0 ,
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        session?.user.isAdmin ? (
            <div className='w-[40vw] m-auto mt-10 p-8 bg-white shadow-xl rounded-lg'>
                <h1 className='bg-gradient-to-r from-green-500 to-teal-500 text-white text-4xl font-semibold py-3 px-5 rounded-lg mb-8'>Insert New Product</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Image URL */}
                    <div className='flex flex-col'>
                        <label className="text-lg font-semibold text-green-600">Image URL</label>
                        <input className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors'
                            type="text"
                            name="img"
                            placeholder='Enter Image URL'
                            value={formData.img}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className='flex flex-col'>
                        <label className="text-lg font-semibold text-green-600">Category</label>
                        <input className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors'
                            type="text"
                            name="category"
                            placeholder='Product Category'
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Product Name */}
                    <div className='flex flex-col'>
                        <label className="text-lg font-semibold text-green-600">Product Name</label>
                        <input className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors'
                            type="text"
                            name="name"
                            placeholder='Product Name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Company */}
                    <div className='flex flex-col'>
                        <label className="text-lg font-semibold text-green-600">Company</label>
                        <input className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors'
                            type="text"
                            name="company"
                            placeholder='Company Name'
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className='flex flex-col'>
                        <label className="text-lg font-semibold text-green-600">Price (in Rs)</label>
                        <input className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors'
                            type="number"
                            name="price"
                            placeholder='Price in Rs'
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className='w-full py-3 text-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 transition-colors shadow-lg mt-4'>Submit</button>
                </form>
            </div>
        ) : (
            <div className="w-[40vw] m-auto mt-10 text-center bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-red-600 mb-4">You cannot add products.</h2>
                <p className="text-lg text-gray-700 mb-2">Sign in as an admin to add products.</p>
                <p className="text-lg text-gray-700">Update your profile as admin to gain access.</p>
            </div>
        )
    );
};

export default ProductForm;
