const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true,useUnifiedTopology: true  });

const articleSchema = {
    title:String,
    content : String
};
const Article= mongoose.model("Article",articleSchema);

app.route("/articles")
.get(function(req,res){

    Article.find({},function(err,foundArticles){
        if(err){
            res.send(err);

        }else{
           res.send(foundArticles);
        }
    })
})
.post(function(req,res){

    console.log(req.body.title);
    console.log(req.body.content);
    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    })
   
    newArticle.save(function(err){
        if(!err){
            res.send("Successfule added a new articles")
        }else{
            res.send(err);
        }
    });
})
.delete(function(req,res){

    Article.deleteMany({},function(err){
        if(!err){
            res.send("Sucessfully Delete all artices");
        }else{
            res.send(err);
        }
    })
})


//specific article
app.route("/articles/:articleTitle")
.get(function(req,res){
    //console.log(req.params.articleTitle)
    Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
        if(foundArticle){
          // console.log(foundArticle);
            res.send(foundArticle);
        }else{
            res.send("No article matching the title")
        }
    })
})
.put(function(req,res){
    Article.update({title:req.params.articleTitle},
        {title : req.body.title,content:req.body.content},
        {overwrite:true},
        function(err){
            if(!err){
                res.send("Sucessfully updated ");

            }else{
                console.log(err);
            }

    })
})
.patch(function(req,res){
    Article.update({title:req.params.articleTitle},
        {$set:res.body},
        {overwrite:true},
        function(err){
            if(!err){
                res.send("Sucessfully updated ");

            }else{
                console.log(err);
            }

    })
})
.delete(function(req,res){

    Article.deleteOne({title:req.params.articleTitle},function(err){
        if(!err){
            res.send("Sucessfully Delete  artices");
        }else{
            res.send(err);
        }
    })
})

 








app.listen(3004,function(){
    console.log("Server is connected on port 3004");
})

