
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
var items = [];

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res){
	var options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	};
	var day = new Date().toLocaleDateString('en-us', options); 
	res.render("list", {whichDay:day, works:items});
});

app.post("/", function(request, response){
    item = request.body.work;
    items.push(item);
	response.redirect("/");
})


app.listen(8000, function(){
	console.log("server is live at 8000 port address");
});