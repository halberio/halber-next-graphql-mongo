let mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: String
});

let Post =  mongoose.model('Post',postSchema);

export default Post;