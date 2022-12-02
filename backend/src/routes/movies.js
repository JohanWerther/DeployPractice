const router = require("express").Router();
const moviesControllers = require("../controllers/movie-controllers");

router.post("/", moviesControllers.postMovies);
router.get("/", moviesControllers.getMovies);

module.exports = router;