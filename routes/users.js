var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users.ejs', { });
});

router.get('/consumer', function(req, res, next) {
  res.render('consumer.ejs');
});

module.exports = router;
