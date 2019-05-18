var express = require('express');
var router = express.Router();
// const db = require('../db.mysql')
const SQL = require('sql-template-strings')
const util = require('util')

/* GET users listing. */
router.post('/registry', async (req, res, next) => {
  console.log(req.body)
  const {name, pass, email, balance, role} = req.body
  const db = req.app.locals.dbShop
  try {
    const ret = await db.run(SQL`INSERT INTO users (role, name, pass, email, balance )
      VALUES ( ${role}, ${name}, ${pass}, ${email}, ${balance} )`
    )
    console.log(ret)
    res.json({message:'ok'})
  } catch (error) {
    const ret = { code:error.code, errno: error.errno, message: error.message }
    console.log(ret)
    res.status(500).json(ret)
    return
  }
});

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
