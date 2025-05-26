const { signup, login } = require("../controllers/LoginController");
const ensureAuthenticated = require("../middleware/Auth");
const { signupValidation, loginValidation } = require("../middleware/AuthValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login)
router.post("/signup", signupValidation, signup)
// router.get("/getuser", ensureAuthenticated, getUser)
// router.get("/getuser", getUser);



module.exports = router;