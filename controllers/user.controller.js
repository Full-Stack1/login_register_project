const usermodel=require ("../models/UserSchema");
const Item= require("../models/itemSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//create token
const generatetoken=(usercreate)=>
{
 const payload ={
    id : usermodel._id,
    role : usermodel.role
 }
   return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "1h"}) 
}

//register
const register=async(req,res)=>
{ 
   try{
    const {Email,PassWord,Name,Age} = req.body;
    if(!Name)
    return res.status(400).json({message: "Pleas Enter Your Name"})
   else  if(!Email)
    return res.status(400).json({message: "Pleas Enter Your Password"})
 else if(!PassWord)
    return res.status(400).json({message: "Pleas Enter Your Email"})
 else if(!Age)
    return res.status(400).json({message: "Pleas Enter Your Age"})
  
//check if user is exist based on email 
 const existuser= await usermodel.findOne({Email})
 if(existuser)
    return res.status(409).json({message: "The user alrady register from this email "})
//hashing password
const salt= 10; 
const hashing = await bcrypt.hash(PassWord,salt);
console.log("hashing",hashing)
//create user 
const usercreate= await usermodel.create({
    Email,
      PassWord:hashing,
       Name,
       Age,
       role:"user" 
})
if(!usercreate)
    return res.status(404).json({message: "user not created"})
//هون حطينا توكسن يلي عملنا مشان ينبعث مع اليوزر 
const token= generatetoken(usercreate)

res.status(200).json({
       message:"New User Was add" ,
       data: usercreate,
       token: token
    })
}catch(err)
{
  res.status(500).json({message:"Server Error", err : err.message})
 
}
 
}
//log in user 
const Login= async (req,res)=>
{
    try
    {
       const {Email,PassWord}=req.body;
     if(!Email)
    return res.status(400).json({message: "Pleas Enter Your Email "})
 else if(!PassWord)
    return res.status(400).json({message: "Pleas Enter Your Password "})

    const user= await usermodel.findOne({Email})
    if(!user)
        return res.status(404).json({message:"This  Email Not Have Account "})
    const ismatch= await bcrypt.compare(PassWord,user.PassWord);
    if(!ismatch)
        return res.status(404).json({message: "password not correct"})
    const token= generatetoken(user);
    res.status(200).json({
       message:"Login sucessfully" ,
       data: user,
       token: token
    })

    }catch(err)
    {
    res.status(500).json({message:"Server Error", err : err.message})

    }

}



//usermodel.findone({name})   //هي لما ابحث عن حقل معين بستخدمها 
const getAllusers= (req,res)=>
{   //populate("items") to view the detail the item user
   usermodel.find({}).populate("items").then((result)=>  //مشان لا تصير مشاكل حطيت داخل ال find {}
{
    res.status(200)
    res.json(result)
}).catch((err)=>{
    res.send(err)
})
}
//creat user
 const newuser=(req,res)=>
{
    const{Email,PassWord,Name,Age}= req.body;
    if(!Email )
    {
        return res.status(404).json({
            message:"not foud the email "
        })
    }
    //first way to create new user
    const user= new usermodel
    ({
         Email,
       PassWord,
       Name,
       Age,
    })
    user.save().then(()=>
    res.status(201).json({
       message:"New User Was add" 
    })).catch((err)=>{
        res.status(500).json({message:"Failed Another User has same Email"})
    })
}


/*--------------------item the user ------------------------------------------------------------- */
//add item to the user
/*const addNewItemtouser= async (req,res)=>
{ 
    try
    {   
       const{userid}=req.params;
      // console.log("user id is ",userid);
       const {name,image,category} =req.body;
       //Validation  
       if(!userid)
       return res.status(400).json({message:"user id is required"})
        if(!name)
    return res.status(400).json({message: "Pleas Enter Your Name"})
      else if (!category)
    return res.status(400).json({message:"Pleas checking the Filed of category"})
     //console.log(Item); 
      const newitem= await Item.create
     ({
         name,
         image,
         category,
     })
   //another way to add item to the user 
   const user= await usermodel.findByIdAndUpdate(
    userid,
    {$push : {items : newitem._id}}
)
     //first way to add item to user
    /* const user= await usermodel.findById(userid)
    

     if(!user){
        return res.status(404).json({message :"not found user"})
     }
     user.items.push(newitem._id);
     await user.save();
     res.status(201).json
     ({
       message:"New item Was add",
    data: user 
})
    }catch(err)
    { console.log(err)
      res.status(500).json({message:"Server Error"})

    }  
}*/



//to call this fun any file
module.exports= 
{
   getAllusers,
   newuser,
  // addNewItemtouser,
   register,
   Login,
}