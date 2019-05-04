var express = require('express');
var router = express.Router();
const db = require('../db.mysql')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  // const results = db.execute('select 1 + 1');
  const cnx = await db.connection();
  const [rows,fields] = await cnx.query("SELECT CONNECTION_ID() AS pid");
  console.log(fields)
  console.log(rows)
  // rows.forEach(r => {
  //   console.log(r)
  // });
  cnx.release();
  res.send(`/users [pid : ${rows[0]} ] `);
});

module.exports = router;
