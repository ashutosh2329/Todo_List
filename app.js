
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
let items = ["Eat","Sleep","Cook",];
let workItem = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function(req, res){
	let day = date.getDay();

	res.render("list", {titleList:day, itemList:items});
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