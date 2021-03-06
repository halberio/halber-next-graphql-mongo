var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
  name: String,
});
if (!modelAlreadyDeclared()) {
  mongoose.model("Post", postSchema);
}

function modelAlreadyDeclared() {
  try {
    mongoose.model("Post"); // it throws an error if the model is still not defined
    return true;
  } catch (e) {
    return false;
  }
}

export default mongoose.model("User");
