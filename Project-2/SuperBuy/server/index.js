import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// const morgan = require("morgan");
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());
// app.use(morgan("dev"));


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/banners', bannerRoutes);

app.get("/", (req, res) => {
  res.send("ShopHere API Running...");
});

connectDB();

const PORT = process.env.PORT || 6001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
