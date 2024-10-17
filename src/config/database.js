import mongoose from "mongoose";

const connectToDb = async()=>{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB")
}

export default connectToDb;