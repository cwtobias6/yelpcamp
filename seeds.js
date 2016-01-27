var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Salmon Creek", 
		image: "https://farm4.staticflickr.com/3514/3844623716_427ed81275.jpg",
		description: "So much salmon!!"
	},
	{
		name: "Granite Hill", 
		image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
		description: "So much Granite"
	},
	{
		name: "MT. Hood", 
		image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg",
		description: "So much Hood!!"
	}

];

function seedDB() {
	// Remove Pre existing campgrounds
	Campground.remove({}, function(err) {
		if(err) {
			console.log(err);
		} 
		console.log("removed all campgrounds");

		// Loop through data array and add campgrounds
		data.forEach(function(seed) {
			Campground.create(seed, function(err,campground) {
				if(err) {
					console.log(err);
				} else {
					console.log("Added campground!");
					// Create a Comment
					Comment.create(
						{
							text:"Nice place playa! ahaahahhahahaha",
							author: "Jimmy"
						}, function(err,comment) {
							if(err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("created new comment");
							}
						});
				}
			});
		});
	});
}

module.exports = seedDB;