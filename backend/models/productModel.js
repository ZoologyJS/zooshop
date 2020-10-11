import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    Comment: {type: String, required: true},
}, { timestamps: true });

const productSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
    },
    image: [
        {
        type: String,
        required: true
        }
    ],
    name: {
        type: String,
        required: true
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        red: "User"
    },
}, {
    timestamps: true
})

const Products = mongoose.model("Products", productSchema);

export default Products;