var express = require('express');
var router = express.Router();

const users = require('./users');
const admin = require('./admin');
const clothes = require('./clothes');
const purchase = require('./purchase');

router.use('/users', users);
// router.use('/admin', admin);
router.use('/admin', require('./admin'));
router.use('/clothes', clothes);
router.use('/purchase', purchase);

// const db = require('../db.mysql')
const db = require('../db.sqlite')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const [rows/*,fields*/] = await db.query("SELECT CONNECTION_ID() AS pid");
  data = parseInt(rows[0].pid)
  console.log(rows/*,fields*/)
  res.render('index', {
    title: 'SHOP API v1',
    pid: data,
    ts: new Date().format('yyMMdd_HHmmss_uuu')
  });
});

module.exports = router;
