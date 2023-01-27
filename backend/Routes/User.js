const express = require("express");

const router = express.Router();
const User = require("../Controllers/User");

router.post("/signup",User.userSignUp);
router.post("/login",User.userLogin);
router.post("/user",User.userDetailes);

module.exports = router;

