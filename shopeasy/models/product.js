
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ProductSchema = new Schema({
    img: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default:0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

},
    // { timestamps: true }
);

const Product = models.Product || model('Product', ProductSchema);

export default Product;

