var express = require('express');
var router = express.Router();
// const db = require('../db.sqlite')


/* GET users listing. */
router.get('/', async function(req, res, next) {
  const db = req.app.locals.dbTest
  // const post = await dbTest.get('SELECT * FROM Post WHERE id = ?', req.params.id)
  // const cate = await dbTest.get('SELECT * FROM Category')
  const [post, cate] = await Promise.all([
    db.get('SELECT * FROM Post WHERE id = ?', req.params.id),
    db.all('SELECT * FROM Category')
  ]);
  res.json({post, cate});
  // res.send('/admin');
});

module.exports = router;
