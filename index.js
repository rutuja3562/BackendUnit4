const express = require("express");
// const { send } = require("express/lib/response");
// const res = require("express/lib/response");
// console.log(express)
const app = express();

app.get("/books", allBooks, (req, res) => {
  res.send("Fetching all the books");
});

function allBooks(req, res, next) {
  console.log("Fetching all the books");
  next();
}

app.get("/books/:name", singlebook,(req,res)=>{
   
    return res.send( {"name":req.name} );
});

function singlebook(req,res,next){
//  console.log({"name":req.params.name})
// console.log(req.route.path);
if (req.route.path == "/books/:name") {
  req.name=req.params.name;
 
}

    next();
}
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
