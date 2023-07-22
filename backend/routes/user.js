//ch new 2 做登入系统
//這js用來放user的route

//1 use express to get the router
const express = require("express");
const router = express.Router();

// 匯入controller functions
const { signupUser, loginUser } = require("../controllers/userController.js");
//login route
router.post('/login', loginUser); //.post作用 fetch到/login 在website展示 ,之後的function

//signup router
router.post('/signup', signupUser);

module.exports = router;
