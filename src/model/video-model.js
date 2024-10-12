
import mongoose from 'mongoose';
import Instructor from '@/model/instructor-model'

const commentSchema = new mongoose.Schema({
    user: {
        type:String,
       // ref: 'Instructor',
    //    required: true
    },
    text: {
        type: String,
        //required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    description: {
        type: String
    },
    comment: [commentSchema],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide an instructor id"],
        ref: 'Instructor'
    },
    thambnail: {
        type: String,
        default: '/default.png'
    },
    videourl: {
        type: String
    },
    isFree:{
        type: Boolean,
        default: true
    },
    subject:{
        type:String
    }
});



const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;