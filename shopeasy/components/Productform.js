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

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div>
            <h1>Insert New Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Company:</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Insert Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
