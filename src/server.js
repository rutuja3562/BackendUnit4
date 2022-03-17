
const app = require("./index.js");

const connect = require("./configs/db.js");
app.listen(5000, async function(){
  try {
    await connect();
  
  } catch (err) {
      console.log({"err": err.massege});
  }
      console.log("listening on port 5000");
});
