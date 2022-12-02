const router = require("express").Router();
const listControllers = require("../controllers/list-controllers");

router.post("/create", listControllers.createList);
router.post("/add-movie", listControllers.addMovie);
router.get("/", listControllers.getUserListItems);

module.exports = router;