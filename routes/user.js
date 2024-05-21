const router = require("express").Router();
const Controller = require("../controllers/user")

router.post("/register", Controller.RegisterUser)
router.post("/login", Controller.LoginUser)

module.exports = router;