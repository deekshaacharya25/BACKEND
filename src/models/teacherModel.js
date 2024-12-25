import mongoose from "mongoose";



const teacherSchema = new mongoose.Schema({

    teacher_name: {
    type: String,
    required:true,
    },
    phone: {
        type: String,
        required:true,
        },
    email: {
            type: String,
            required:true,
            },
    password: {
            type: String,
            required:true,
            },
    isactive: {
                type: Number,
                default:1,
                },
            // image: {
            //     type: [String],
            //     required:true,
            //     },
            //     teacher_id: {
            //         type: Schema.Typs.ObjectId,
            //         required:true,
            //         },
});


export default mongoose.model("teachers", teacherSchema);