const mongoose = require ("mongoose")
function connectTodb(){
    mongoose.connect("mongodb+srv://moddyplayer:9dGTsK4YVKJ0WvSs@cluster0.lbithic.mongodb.net/")
    .then(()=>{
        console.log("connect to db")
    })
}
module.exports=connectTodb;
