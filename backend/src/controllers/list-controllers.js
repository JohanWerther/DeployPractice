const HttpError = require("../models/http-error");
const { ObjectId } = require("mongoose").Types;
const List = require("../models/list-schema");
const jwt = require("jsonwebtoken");

const createList = async (req, res, next) => {
  const { uid } = req.body;
  try {
    const list = new List({
      user: ObjectId(uid),
      movies: [],
    });

    await list.save();
    res.status(201).json({ list });
  } catch (error) {
    return next(error);
  }
};

const addMovie = async (req, res, next) => {
  const { movieId, uid } = req.body;
  try {
    const list = await List.findOneAndUpdate(
      { user: ObjectId(uid) },
      { $push: { movies: ObjectId(movieId) } },
      { new: true }
    );

    if (!list) throw new HttpError("El usuario no tiene lista", 400);
    res.status(201).json({ list });
  } catch (error) {
    return next(error);
  }
};

const getUserListItems = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) throw new HttpError("No se provee el token", 403);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) throw new HttpError("El token no es auténtico", 401);
    console.log(decodedToken)
    const listItems = await List.findOne({user: ObjectId(decodedToken.uid)}, {movies: 1}).populate("movies");
    if (!listItems) throw new HttpError("El usuario no tiene lista", 400)
    res.json(listItems)
  } catch (error) {
    return next(error);
  }
};

module.exports = { createList, addMovie, getUserListItems };
