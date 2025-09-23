const express = require("express");
const { validateBlogTitle } = require("../middleware/BlogCRUDValidators");
const router = express.Router();


router.get("/", (request, response) => {
	response.json({
		message:"placeholder blog post GET endpoint"
	})
});

router.post("/", validateBlogTitle, (request, response) => {
	response.json({
		message:"placeholder blog post POST endpoint"
	});
});

module.exports = router;