const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: { type: String, required: true },
  photo: { type: String, required: true },
  author: { type: String, required: true },
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
