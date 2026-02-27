const express = require("express");
const usersRouter = require("./routes/user");
const app = express();
const PORT = 8000;
app.use(express.static("public")); //to read the imag and the any file hin folder public
app.use(express.json());    //تحويل ال obj  الي json
/*   مشان اتأكد انو باك عندي بشتغل 
app.get("/health",(req,res)=>{ 
    res.send("OK");
})*/

app.use("/users",usersRouter);
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


app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});