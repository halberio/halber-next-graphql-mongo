var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String!,
  email: String!,
  password: String!,
  token: String!,
  tokenExpiration: Number!
});
if (!modelAlreadyDeclared()) {
  mongoose.model("User", userSchema);
}

function modelAlreadyDeclared() {
  try {
    mongoose.model("User"); // it throws an error if the model is still not defined
    return true;
  } catch (e) {
    return false;
  }
}

export default mongoose.model("User");
