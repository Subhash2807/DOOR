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


var mongoose1=require('mongoose');
mongoose1.connect("mongodb://localhost/valet");
mongoose1.set('useNewUrlParser', true);
mongoose1.set('useFindAndModify', false);
mongoose1.set('useCreateIndex', true);
mongoose1.set('useUnifiedTopology', true);



var valetschema = new mongoose1.Schema({
    name:       String,
    address:    String,
    mobile:     String,
    job:        String
});

var valet = mongoose1.model("valet",valetschema);



var usersschema = new mongoose.Schema({
    name: String,
    category:String
});



var users = mongoose.model("users",usersschema);

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
    valet.find({},function(err,alluser){
        if(err){
            console.log(err);
        }
        else
        {
            res.render("theteam",{valet:alluser});
        }
    })
  
});

app.get("/test",function(req,res){
    users.find({},function(err,alluser){
        if(err){
            console.log(err);
        }
        else
        {
            res.render("test",{user:alluser});
        }
    })
  
});



app.get('/join',function(req,res){
    res.render("join");
});


app.post('/',function(req,res){

    valet.create(req.body.valet,function(err,user){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    }); 

});
app.listen(3000,function(){
    console.log("chalne laga");
});