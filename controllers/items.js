const { json } = require("express");

const items = [
  {
    id: 1,
    name: "Laptop",
    price: 750,
    quantity: 8,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Headphones",
    price: 120,
    quantity: 15,
    category: "Electronics"
  },
  {
    id: 3,
    name: "Desk Chair",
    price: 200,
    quantity: 5,
    category: "Furniture"
  },
  {
    id: 4,
    name: "Notebook",
    price: 5,
    quantity: 50,
    category: "Stationery"
  },
  {
    id: 5,
    name: "Water Bottle",
    price: 12,
    quantity: 30,
    category: "Accessories"
  },
  {
    id: 6,
    name: "Backpack",
    price: 45,
    quantity: 12,
    category: "Accessories"
  }
];

const getAllitems=(req,res)=>
{
   res.status(200),json({
   data:items,
   message:"All Item is Return"

   })

}
const itemsfilter=(req,res)=>
{
    const{price}=req.query;
    const item=items.filter((element)=>{
    return element.price>600;
    } )
  res.status(200).json({
    data:item,
    message:"items is return"
  })

};
 


module.exports=
{
 getAllitems,
 itemsfilter,

}