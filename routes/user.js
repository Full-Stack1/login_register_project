const express= require("express");
const { getAllusers, getFilter, creatuser } = require("../controllers/user");
const usersRouter= express.Router();
usersRouter.get("/",getAllusers);
usersRouter.get("/filter",getFilter);
usersRouter.post("/create",creatuser);


module.exports=usersRouter;