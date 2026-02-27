
const users = [
{ name: "John", age: 25 },
{ name: "Jane", age: 20 },
{ name: "Mark", age: 19 },
];
const getAllusers= (req,res)=>
{
    res.status(200);
    res.json({
    message:"Here is your full data",
    data:users,
    success:true


    })
}

const getFilter=(req, res) => {
const {name} = req.query;
if(!name)
{
    res.status(400)
    res.json({
        message:"the name not found"
    })
    return;
}
const user = users.find((element) => {
return element.name === name;
});


res.status(200);
res.json(user);
}

const creatuser=(req,res)=>
{
  const{id,name}=req.body;
  users.push({id,name});
  res.status(201);      // mean the 201 is the new data is add
  res.json({
 message:"new user was add"

  })

}
//to call this fun any file
module.exports= 
{
   getAllusers,
   getFilter,
   creatuser,
}