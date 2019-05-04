var express = require('express');
var router = express.Router();
const db = require('../db.sqlite')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('/admin');
});

router.get('/now', async (req,res) => {
  rows = await db.get('SELECT Datetime("now","localtime")')
  console.log(rows)
})

module.exports = router;
