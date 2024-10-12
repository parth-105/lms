import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
  
    isInstructor: {
        type: Boolean,
        default: false,
    },
    avtar:{
        type:String,
        default:'/default.png'
    },
    photoURL: {
        type: String,
      },

   
   
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;