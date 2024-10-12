import mongoose, { Schema } from "mongoose";


const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide instructor name"],
    },
    // subject: {
    //     type: String,
    //     required: [true, "Please provide a subject"],
        
    // },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    avtar:{
        type:String,
        default:'/default.png'
    },
    videos:{
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
    },
    couses:{
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cource' }]
    },
    
    isInstructor: {
        type: Boolean,
        default: true,
    },
   
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
     },

     isAdmin:{
        type: Boolean,
        default: false,
     },
     photoURL: {
        type: String,
      },

  
})

const Instructor = mongoose.models.Instructor || mongoose.model("Instructor", instructorSchema);

export default Instructor;