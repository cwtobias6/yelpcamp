var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// Passport Config
app.use(require("express-session")({
	secret: "A Millie A Millie",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', function (req, res) {
  res.render('landing');
});

app.get("/campgrounds", function(req,res) {
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
			
		}
	})
});

app.post("/campgrounds", function(req,res) {
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

app.get('/campgrounds/new', function(req,res) {
	res.render("campgrounds/new");
});

//show route
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
			
		}

	});
});

// Comments Routes
app.get("/campgrounds/:id/comments/new", function(req,res) {
	Campground.findById(req.params.id, function(err,campground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});	
		}
	})
});

app.post("/campgrounds/:id/comments", function(req,res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
});

// Authentication Routes
app.get("/register", function(req,res) {
	res.render("register");
});

app.post("/register", function(req,res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

// Show login form
app.get("/login", function(req,res) {
	res.render("login");
});

app.post("/login", passport.authenticate("local", 
	{
		success: "/campgrounds",
		failure: "/login"

	}), function(req,res) {
	
});




app.listen(3000, function () {
  console.log('The Server has Started!!');
});















