
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
let items = ["Eat","Sleep","Cook",];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function(req, res){
	let options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	};
	let day = new Date().toLocaleDateString('en-us', options); 
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