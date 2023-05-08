import express from "express";
const router = express.Router();
import products from "../data/products.js";
import asyncHandler from "../middleware/asyncHandler.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
  })
);

export default router;
