import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000;

connectDB(); //connect to database

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// use the productRoutes middleware
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
