// requiring packages
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/noteMakerDB', {useNewUrlParser: true, useUnifiedTopology: true });
let day = date.getDay();
// todo schema and model
const todoSchema = {
  name: String
};
const Todo = mongoose.model('Todo', todoSchema);
// custome list schema and model
const customListSchema = {
	name: String,
	itemsArray: [todoSchema]
};
const List = mongoose.model('List', customListSchema);
// creating default work item
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
// express route start 
app.get("/", function(req, res){
	Todo.find({}, function(err, foundItems){
	if(foundItems.length === 0){
		Todo.insertMany(defaultItems, function(err){
			if(err){
				console.log(err);
			}else
			console.log("Data inserted");
		});
	}
	
		res.render("list", {titleList:day, itemList:foundItems});
	
});
});
// dynamic routing 
app.get("/:customListName", function(req, res){
	const listName = _.capitalize(req.params.customListName);
	List.findOne({name: listName}, function(err, result){
		if(!result){
			const list = new List({
				name: listName,
				itemsArray: defaultItems
			});
			list.save();
			res.redirect("/" + listName);
		}else{
			res.render("list",{titleList:result.name, itemList:result.itemsArray});
		}
	})


});


// post route
app.post("/", function(req, res){
	const listTitle = req.body.Button;
	const itemName = req.body.work;
	const item = new Todo({
	name: itemName,
	});
	if(listTitle === day){
		item.save();
		res.redirect("/");
	}else{
		List.findOne({name:listTitle}, function(err, result){
			if(!err){
				result.itemsArray.push(item);
				result.save();
				res.redirect("/"+ listTitle);
			}
		})
	}

});
// post route for removing item
app.post("/delete", function(req, res){
	const removeId = req.body.checkbox;
	const removeListTitle = req.body.listTitle;
	if(removeListTitle === day){
		Todo.findByIdAndRemove(removeId, function(err){
			res.redirect("/");
		});
	}else{
		List.findOneAndUpdate(
			{name:removeListTitle},
			{$pull: {itemsArray: {_id: removeId}}},
			function(err, result){
				if(!err){
					res.redirect("/" + removeListTitle);
				}
			});
	}

});

// get route for about page 
app.get("/about", function(request,response){
	response.render("about");
});



app.listen(8000, function(){
	console.log("server is live at 8000 port address");
});