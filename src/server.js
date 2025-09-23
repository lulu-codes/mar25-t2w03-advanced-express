const express = require("express");
const { randomRouteStopper } = require("./middleware/ExampleMiddleware");

const app = express();

// This allows us to receive JSON body data on requests 
app.use(express.json());

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

// let variable1 = someOtherVariable
const blogRouter = require("./controllers/BlogController.js");
app.use("/blogs", blogRouter);


// Error-handler, will catch any next() that contain an error as an argument
app.use((error, request, response, next) => {

	response.json({
		message:"Something went wrong!",
		errorsArray: request.errors,
		error: error.message
	});

});

module.exports = {
	app
}