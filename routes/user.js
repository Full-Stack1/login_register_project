const express= require("express");
const { getAllusers, getFilter, creatuser, newuser,addNewItemtouser, register,Login } = require("../controllers/user.controller");
const usersRouter= express.Router();
usersRouter.get("/",getAllusers);
usersRouter.post("/create",newuser);
//usersRouter.post("/newitem/:userid",addNewItemtouser);
usersRouter.post("/register",register);
usersRouter.post("/login",Login);
module.exports=usersRouter;