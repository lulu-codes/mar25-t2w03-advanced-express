const express = require("express");

const app = express();


/*

// Regular route:
app.VERB(path, callback);

// Route with middleware:
app.VERB(path, callback, callback);

app.VERB(path, callback, callback, callback, callback, callback, callback, callback, callback);

*/

app.use((request, response, next) => {
	console.log("middleware running on every route!");
	next();
});

app.get(
	// PATH 
	"/middleware-demo", 
	// callback
	(request, response, next) => {
		console.log("middleware is running here!");

		next();
	},
	(request, response, next) => {
		if (request.headers.password == "password"){
			next();
		} else {
			response.json({
				message:"Wrong password!"
			});
		}

	},
	// callback
	(request, response) => {
		console.log("route is being handled here after middleware is complete!");
		response.json({
			message:"middleware route completed!"
		});
	}
);

function randomRouteStopper(request, response, next) {
	// True/false on the random number generator as a coin flip
	let coinFlipResult = Math.random() > 0.4;
	
	if (coinFlipResult){
		if (request.coinCount) {
			request.coinCount++;
		} else {
			request.coinCount = 1;
		}
		// request.coinCount = (request.coinCount || 0) + 1;
		next();
	} else {
		response.json({
			message:"Coin flip finished!",
			coinCount: request.coinCount || 1
		});
	}
}

app.get(
	"/weird-middleware-demo", 
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	randomRouteStopper,
	(request, response) => {
		response.json({
			coinCount: request.coinCount
		})
	}
)


app.get("/", (request, response) => {
	response.json({
		message:"Hello, world!"
	});
});

module.exports = {
	app
}