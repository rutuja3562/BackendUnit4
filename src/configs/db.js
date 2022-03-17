const mongoose = require("mongoose");

const connect = () =>{
    return mongoose.connect(
      "mongodb+srv://rutuja:rutuja3562@cluster0.orwkt.mongodb.net/project1?retryWrites=true&w=majority"
    );
}

module.exports = connect;