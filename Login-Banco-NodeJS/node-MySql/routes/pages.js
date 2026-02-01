const express = require("express");

const router=express.Router();

//Para la pagina de index
router.get("/",(req,res)=>{
    res.render("index");
});

//Para la pagina de login
router.get("/login",(req,res)=>{
    if(!req.session || !req.session.user){
        res.redirect("/");
    }else{
        res.render("login");
        console.log("Session user:",
            { userId:req.session.user.id,username:req.session.user.name});
    }
});

//exportamos nuestro enrutador para
//que lo podamos usar en toda nuestra app
module.exports=router;