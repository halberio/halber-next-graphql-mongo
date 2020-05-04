let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    posts:[]
});

let User =  mongoose.model('User',userSchema);

export default User;