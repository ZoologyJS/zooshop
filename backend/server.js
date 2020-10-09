import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// if (process.env.NODE_ENV === "development") {
    // app.use(morgan("dev"));
// }

// Allows accepting JSON from API requests
app.use(express.json())

dotenv.config();
connectDB();

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// For fetching PayPal Client Id
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => 
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    )
}

// Middleware for handling errors when making API requests
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}...`)});