var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let publicpath = path.join(__dirname, '..', 'public');

  res.sendfile('views/index.html', {root: publicpath});
});

module.exports = router;
