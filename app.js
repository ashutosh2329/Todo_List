
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
let items = ["Eat","Sleep","Cook",];
let workItem = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function(req, res){
	let options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	};
	let day = new Date().toLocaleDateString('en-us', options); 
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



app.listen(8000, function(){
	console.log("server is live at 8000 port address");
});