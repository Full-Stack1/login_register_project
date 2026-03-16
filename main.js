const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const hashing = async(password)=>{
    const salt=10;
   return  await bcrypt.hash(password,salt);
   console.log( hashing("admin123"));    //make in as a function 
   const isMatch=bcrypt.compare("admin123",password)
}
const generateToken=()=>
{  //تعريف ال payload
    const payload ={
        id: "2000105",   //model user is take user   id: User._id, 
        role: "user"  // role:User._role like this when i use db
    }
    //تعريف ال token
    //three thing istake  : 1-payload /2-SECRET key /3-time of this token
     return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "1h"})
   
}
 console.log(generateToken);