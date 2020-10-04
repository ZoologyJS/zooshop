import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connecter = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });

        console.log(`MongoDB Connected Successfully: ${connecter.connection.host}`)
    } catch(e){
        console.error(`Error: ${e.message}`);
        process.exit(1);
    }
}

export default connectDB;