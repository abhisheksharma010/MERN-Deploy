const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const connectDb = require('./config/db');
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

// Connect to the database
connectDb();

// Middleware
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/category', categoryRouter);
app.use("/api/v1/product", productRoutes);

// Welcome message route
app.get('/', (req, res) => {
    res.send({ message: `Welcome to e-commerce` });
});

// Port configuration
const Port = process.env.PORT || 3000;

// Listen to the port
app.listen(Port, () => {
    console.log('Listening on port ' + Port);
});
