
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/noteMakerDB', {useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = {
  name: String
};

const Todo = mongoose.model('Todo', todoSchema);

const item1 = new Todo({
	name: "Welcome to Todo list"
});
const item2 = new Todo({
	name: "For adding new task click on the +"
});
const item3 = new Todo({
	name: "To remove click on check box"
});

const defaultItems = [item1,item2,item3]

// Todo.insertMany(defaultItems, function(err){
// 	if(err){
// 		console.log(err);
// 	}else
// 	console.log("Data inserted");
// });





app.get("/", function(req, res){
	let day = date.getDay();
	Todo.find({}, function(err, foundItems){
	if(err){
		console.log(err);
	}else
	{
		res.render("list", {titleList:day, itemList:foundItems});
	}
});
});

app.post("/", function(request, response){
	let keyValue = request.body.listButton;
	let item = request.body.work;
	if(keyValue === "WorkList"){
        workItem.push(item);
	    response.redirect("/work");
	}
	else{
        items.push(item);
	    response.redirect("/");
	}
})
    

app.get("/work", function(request,response){
	response.render("list", {titleList: "WorkList", itemList:workItem} )
})


app.get("/about", function(request,response){
	response.render("about");
})



app.listen(8000, function(){
	console.log("server is live at 8000 port address");
});