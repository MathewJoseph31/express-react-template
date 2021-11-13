var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users', function(req, res, next) {
 res.json(['A', 'B', 'C']);
})

module.exports = router;
