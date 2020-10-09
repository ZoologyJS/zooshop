import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    // For pagination
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword 
        ? {
            name: {
                $regex: req.query.keyword, // Matching incomplete words
                $options: "i" // Case insensitive
            }
        }
        : {};
    
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize) // Limit results by pageSize #
        .skip(pageSize * (page - 1)); // To make sure each page has the right items

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    // Does the product exist?
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found!" });
    }
})

export { getProducts, getProductById }