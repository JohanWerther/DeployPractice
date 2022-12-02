const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/movies", require("./movies"));
router.use("/lists", require("./lists"));

module.exports = router;
