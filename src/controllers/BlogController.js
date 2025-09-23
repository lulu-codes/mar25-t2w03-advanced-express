const express = require("express");
const { validateBlogTitle } = require("../middleware/BlogCRUDValidators");
const router = express.Router();


router.get("/", (request, response) => {
	response.json({
		message:"placeholder blog post GET endpoint"
	})
});

router.post("/", validateBlogTitle, (request, response, next) => {

	if (request.errors){
		return next(new Error("There's errors oh my gosh!"));
	}
	
	response.json({
		message:"placeholder blog post POST endpoint"
	});
});

module.exports = router;