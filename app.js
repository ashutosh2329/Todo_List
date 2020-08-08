
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	var day = new Date().toLocaleString('en-us', {  weekday: 'long' }); 
	res.render("list", {whichDay:day});
});


app.listen(8000, function(){
	console.log("server is live at 8000 port address");
});