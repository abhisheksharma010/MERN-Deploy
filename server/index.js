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
const path = require("path");
import { fileURLToPath } from "url";

dotenv.config();

// Connect to the database
connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
//fgrfgtrfgfgrfgrf

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/category', categoryRouter);
app.use("/api/v1/product", productRoutes);

// Welcome message route
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Port configuration
const Port = process.env.PORT || 3000;

// Listen to the port
app.listen(Port, () => {
    console.log('Listening on port ' + Port);
});
