//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{ useUnifiedTopology: true ,useNewUrlParser: true});

const itemsSchema = {
  name : String
};
const listSchema = {
  name : String,
  items: [itemsSchema]

};

const List = mongoose.model("List",listSchema);

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
  name : "Welcome to your todolist !!"
});

const item2 = new Item({
  name : "Hit the + button to add a new item."
});
const item3 = new Item({
  name : "<---Hit this to delete an item"
});

const defaultItems = [item1,item2,item3];



app.get("/", function(req, res) {
  Item.find({},function(err,foundItems){
 if(foundItems.lenght === 0){
  Item.insertMany(defaultItems,function(err){
    if(err){
      console.log(err)
    }else{
      
      console.log("Sucessfully insert in the data");
   
    }
  });
  res.redirect("/");
 }else{
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  };
});
  

});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: item
  });
 

  if(listName === "Today"){
    newItem.save();
  res.redirect("/");
  }else{
    List.findOne({name : listName},function(err,foundList){
      if(err){
        console.log(err);
      }else{
        foundList.items.push(newItem);
        foundList.save();
       // console.log("/"+ listName);
        res.redirect("/" + listName);
      }
      
    })
  }
});

app.post("/delete",function(req,res){
 const checkIdItem = req.body.checkbox
 const listName = req.body.listName;
 //console.log(listName);

 if(listName === "Today"){
  Item.findByIdAndRemove(checkIdItem,function(err){
    if(err){
      console.log(err)
    }else{
     // console.log("Item Remove");
    }
    res.redirect("/")
  })
 }else{
   List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkIdItem}}},function(err){
     if(!err){
       res.redirect("/" + listName);
     }
   })
 }

 
  
})

app.get("/:customeListName", function(req,res){
 
  const customeListName = _.capitalize(req.params.customeListName);

  List.findOne({name:customeListName},function(err,foundList){
    if(!err){
      if(!foundList){
        //not exist
        const list = new List({
          name : customeListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/"+customeListName);
      }else{
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }else{
      console.log(err);
    }
  })
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3003, function() {
  console.log("Server started on port 3003");
});
