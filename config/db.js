import mongoose from "mongoose";

async function connectDB (){
    try {
        mongoose.connect(process.env.DB)
    } catch (error) {
        console.log(err)
        process.exit(1);
    }
}
export default connectDB;