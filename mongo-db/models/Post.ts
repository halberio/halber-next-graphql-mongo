let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: String,
    user_id:mongoose.Types.ObjectId
});

let Post =  mongoose.model('Post',postSchema);

export default Post;