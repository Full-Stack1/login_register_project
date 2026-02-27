const express= require("express");
const{getAllitems, itemsfilter}=require("../controllers/items");
const itemsRouters=express.Router();

itemsRouters.get("/",getAllitems);
itemsRouters.get("/filterprice",itemsfilter)
module.exports=itemsRouters;