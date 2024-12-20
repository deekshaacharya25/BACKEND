import mongoose from "mongoose";



const studentSchema = new mongoose.Schema({

    name: {
    type: String,
    required:true,
    },
    rollno: {
        type: String,
        required:true,
        },
    email: {
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
            //         type: String,
            //         required:true,
            //         },
});


export default mongoose.model("students", studentSchema);