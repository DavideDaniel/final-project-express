var express = require('express');
var db = new sqlite3.Database( "patients.db" );
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users.ejs', { });
});

router.get('/consumerEJS', function(req, res, next) {
  res.render('consumer.ejs');
});

router.get('/consumer', function(req, res, next) {
 res.sendfile(html_dir+'consumer.html')

} );


module.exports = router;
