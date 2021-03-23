import mongoose from 'mongoose'

// create a schema object
const tiktokSchema = mongoose.Schema({
    url: String,
    channel: String,
    song: String,
    likes: String,
    messages: String,
    description: String,
    shares: String
});

// Collection inside of the db 
export default mongoose.model('tiktokVideos', tiktokSchema)