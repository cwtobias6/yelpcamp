var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill", 
// 		image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
// 	}, function(err, campground) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log("A New Campground has been created!!");
// 			console.log(campground);
// 		}
// 	});

var campgrounds = [
		{name: "Salmon Creek", image: "https://farm4.staticflickr.com/3514/3844623716_427ed81275.jpg"},
		{name: "Granite Hill", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
		{name: "MT. Hood", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
		{name: "Salmon Creek", image: "https://farm4.staticflickr.com/3514/3844623716_427ed81275.jpg"},
		{name: "Granite Hill", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
		{name: "MT. Hood", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"}

	];

app.get('/', function (req, res) {
  res.render('landing');
});

app.get("/campgrounds", function(req,res) {
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds:allCampgrounds});
			
		}
	})
});

app.post("/campgrounds", function(req,res) {
	var name = req.body.name;
	var image = req.body.image;

	var newCampground = {name:name, image:image};

	Campground.create(newCampground, function(err,newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");	
		}
	})


});

app.get('/campgrounds/new', function(req,res) {
	res.render("new.ejs");
});

app.listen(3000, function () {
  console.log('The Server has Started!!');
});