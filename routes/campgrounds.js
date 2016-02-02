var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/campgrounds", function(req,res) {
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
			
		}
	})
});

router.post("/campgrounds", function(req,res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description:desc}


	Campground.create(newCampground, function(err,newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");	
		}
	})


});

router.get('/campgrounds/new', function(req,res) {
	res.render("campgrounds/new");
});

//show route
router.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
			
		}

	});
});

module.exports = router;
