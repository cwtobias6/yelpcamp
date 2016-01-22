var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.render('landing');
});

app.get("/campgrounds", function(req,res) {
	var campgrounds = [
		{name: "Salmon Creek", img: "https://farm4.staticflickr.com/3514/3844623716_427ed81275.jpg"},
		{name: "Granite Hill", img: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
		{name: "MT. Hood", img: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"}

	];

	res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(3000, function () {
  console.log('The Server has Started!!');
});