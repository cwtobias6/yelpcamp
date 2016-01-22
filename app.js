var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image: "https://farm4.staticflickr.com/3514/3844623716_427ed81275.jpg"},
		{name: "Granite Hill", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
		{name: "MT. Hood", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"}

	];

app.get('/', function (req, res) {
  res.render('landing');
});

app.get("/campgrounds", function(req,res) {

	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res) {
	var name = req.body.name;
	var image = req.body.image;

	var newCampground = {name:name, image:image};
	campgrounds.push(newCampground);

	res.redirect("/campgrounds");


});

app.get('/campgrounds/new', function(req,res) {
	res.render("new.ejs");
});

app.listen(3000, function () {
  console.log('The Server has Started!!');
});