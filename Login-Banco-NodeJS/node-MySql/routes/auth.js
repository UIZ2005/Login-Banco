const express= require("express");

const AuthController=require("../controllers/auth");

const router=express.Router();

router.post("/login",AuthController.login);

router.post("/logout", AuthController.logout);

router.post('/register', AuthController.register);

module.exports=router;