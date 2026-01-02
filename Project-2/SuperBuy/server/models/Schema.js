import mongoose from "mongoose";

/* USER */
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype: { type: String, default: "user" } // user / admin
  },
  { timestamps: true }
);

/* ADMIN */
const adminSchema = new mongoose.Schema(
  {
    banner: { type: String },
    categories: [{ type: String }]
  },
  { timestamps: true }
);

/* PRODUCT */
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    mainImg: { type: String },
    carousel: [{ type: String }],
    sizes: [{ type: String }],
    category: { type: String },
    gender: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema({
    userId: {type: String},
    name: {type: String},
    email: {type: String},
    mobile: {type: String},
    address: {type: String},
    pincode: {type: String},
    title: {type: String},
    description: {type: String},
    mainImg: {type: String},
    size: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    discount: {type: Number},
    paymentMethod: {type: String},
    orderDate: {type: Date,
  default: Date.now},
    deliveryDate: {type: String},
    orderStatus: {type: String, default: 'order placed'}
})

const cartSchema = new mongoose.Schema({
  
    userId: {type: String},
    title: {type: String},
    description: {type: String},
    mainImg: {type: String},
    size: {type: String},
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }
});


export const User = mongoose.model('users', userSchema);
export const Admin = mongoose.model('admin', adminSchema);
export const Product = mongoose.model('products', productSchema);
export const Orders = mongoose.model('orders', orderSchema);
export const Cart = mongoose.model('cart', cartSchema);