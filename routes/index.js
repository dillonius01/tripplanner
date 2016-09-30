var express = require('express');
var router = new express.Router();

router.get('/', function(req,res,next) {
	console.log("Ya server is RUNNIN");
});


module.exports = router;