const { default: mongoose, Schema, model } = require("mongoose");

const { ObjectId } = mongoose.Types;

const listSchema = new Schema({
  user: { type: ObjectId, ref: "User", required: true },
  movies: [{type: ObjectId, ref: "Movie"}]
});

const List = model("List", listSchema);

module.exports = List;
