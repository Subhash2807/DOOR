var express= require('express');
var app=express();
var bodyparser= require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/door");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);





var usersschema = new mongoose.Schema({
    name: String,
    category:String
});
var users = mongoose.model("users",usersschema)

// users.create(
//     { name: 'narendra' , 
//     category:'developer'
//     },function(err,user){
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("newly created user");
//             console.log(user);
//         }

// });





app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/",function(req,res){
    res.render("index");
});

app.get("/login",function(req,res){
    res.render("login");
});
app.get("/new",function(req,res){
 res.render("new");
});
app.post("/theteam",function(req,res){
    console.log("you hit post route");
    var name=req.body.username;
    var category=req.body.category;
    var newuser={name: name, category:category}
    users.create(newuser,function(err,user){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/theteam');
        }
    }); 
   
});
app.get("/theteam",function(req,res){
    users.find({},function(err,alluser){
        if(err){
            console.log(err);
        }
        else
        {
            res.render("theteam",{user:alluser});
        }
    })
  
});
app.listen(4000,function(){
    console.log("chalne laga");
});