import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required:true,
        },
    name: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
        },
    brand: {
        type: String,
        required:true,
        },
    price: {
        type: String,
        required:true,
        },
    category: {
        type: String,
        required:true,
        },
    isactive: {
        type: Number,
        default:1,
        },
});


export default mongoose.model("products", productSchema);