
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	var today = new Date();
	if(today.getDay() === 6 || today.getDay() === 0){
		res.sendFile(__dirname + "/index.html");
	}
	else{
		res.send("oh uh! working day")
	}
});


app.listen(8000, function(){
	console.log("server is live at 8000 port address");
});