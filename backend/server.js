import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;

connectDB(); //connect to database

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// use the productRoutes middleware
app.use("/api/products", productRoutes);
// use the userRoutes middleware
app.use("/api/users", userRoutes);

//middleware for handling 404 errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
