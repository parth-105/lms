import mongoose from "mongoose";
import Video from "@/model/video-model"
import Instructor from "@/model/instructor-model";
import Assignment from '@/model/Assignment'

const courceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        
    },
    videos: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]

    },
    instructor: {
         type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' 

    },
    subject:{
        type:String

    },

    thambnail: {
        type: String,
        default: '/default.png'
    },

    price:{
        type: Number,
        default: 0,
        required: [true, "Please provide a price"]
    },
    subject:{
        type: String,
    },

    assignment: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]

    },
  
   
})

const Cource = mongoose.models.Cource || mongoose.model("Cource", courceSchema);

export default Cource;