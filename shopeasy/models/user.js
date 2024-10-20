
import mongoose from "mongoose";
import { boolean } from "zod";
const { Schema, model, models } = mongoose;



const orderSchema = new Schema({
  // orderId: { type: String, required: true },
  items: [
    {   
      productId: { type: String , required: true },
      name:{type:String},
      price:{type:Number},
      img:{type:String},
      quantity: { type: Number, required: true },
    },  
  ],
  totalAmount: { type: Number, required: true },
  // paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  // shippingStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  orderDate: { type: Date, default: Date.now },
  // deliveryDate: { type: Date },
  // shippingAddress: { type: addressSchema, required: true },
  // paymentMethod: { type: String, enum: ['Card', 'PayPal', 'CashOnDelivery'], required: true },
});

const adminOrderSchema = new Schema({
  userId:{ type: String, required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      name:{type:String},
      price:{type:Number},
      img:{type:String},
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});



const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  isOAuthUser: { type: String },
  password: { type: String, required: true },
  profilepic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  address: { type: String }, 
  orderHistory: [orderSchema], 
  adminOrderHistory: [adminOrderSchema], 
  dateOfBirth: { type: Date }, 
  phone: { type: String }, 


},
  { timestamps: true }
);

// const User = model("User", UserSchema );
// export default mongoose.models.User || User ;
// error in above code

// const User = mongoose.models.User || model('User', UserSchema);
const User = models.User || model('User', UserSchema);

export default User;



/*

import mongoose from "mongoose";
const {Schema,model,models }=mongoose;


const addressSchema = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const orderSchema = new Schema({
  orderId: { type: String, required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  shippingStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  shippingAddress: { type: addressSchema, required: true },
  paymentMethod: { type: String, enum: ['Card', 'PayPal', 'CashOnDelivery'], required: true },
});

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ['Customer', 'Admin'], default: 'Customer' },
  dateOfBirth: { type: Date },
  addresses: [addressSchema],
  orderHistory: [orderSchema],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  dateJoined: { type: Date, default: Date.now },
});

const User = models.User || mongoose.model('User', userSchema);
// const User = models.User || model('User', userSchema);

// module.exports = User;
export default User;

*/


