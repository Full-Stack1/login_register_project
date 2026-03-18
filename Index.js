const express = require("express");
require("dotenv").config();
const usersRouter = require("./routes/user");
const itemsRouters = require("./routes/items");
require("./models/db");
const app = express();
app.use(express.static("public")); //to read the imag and the any file hin folder public
app.use(express.json());    //تحويل ال obj  الي json
/*   مشان اتأكد انو باك عندي بشتغل 
app.get("/health",(req,res)=>{ 
    res.send("OK");
})*/
//console.log(process.env.test);
app.use("/users",usersRouter);
app.use("/items",itemsRouters);




//middelware function
const valids=(req,res,next)=>
{
    if(req.params.name=="Nour")
    {
        next();
    }
 
  res.status(404);     
  res.json({
 message:"not found"

  })

}
app.get("/items/:name",valids,(req,res)=>{
    const {name}=req.params;
    res.status(200);      
  res.json({
 message:"OK"

  })

})


app.listen(process.env.PORT, () => {
console.log(`Server running at http://localhost:${process.env.PORT}`);
});