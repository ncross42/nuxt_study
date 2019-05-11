var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/admin', require('./admin'));
router.use('/clothes', require('./clothes'));
router.use('/purchase', require('./purchase'));

// const db = require('../db.mysql')
// const db = require('../db.sqlite')

/* GET home page. */
router.get('/', async (req, res, next) => {
  // const [rows/*,fields*/] = await db.query("SELECT CONNECTION_ID() AS pid");
  // data = parseInt(rows[0].pid)
  let rows = []
  // db.all('SELECT Datetime("now","localtime")', (err, rows) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   let contador = 0
  //   rows.forEach(function (row) {
  //     rows.push(row)
  //   })
  // })
  // db.get('SELECT Datetime("now","localtime")').then
  console.log(rows/*,fields*/)
  data = rows
  res.render('index', {
    title: 'SHOP API v1',
    pid: data,
    ts: new Date().format('yyMMdd_HHmmss_uuu')
  });
});

module.exports = router;
