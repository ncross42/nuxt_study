var express = require('express');
var router = express.Router();
const fileUpload = require('../utils/fileUpload')
const db = require('../db.mysql')


router.get('/', (req, res, next) => {
  res.send('/clothes');
});

/* GET users listing. */
router.post('/', fileUpload.single('imgFile'), function(req, res, next) {
  console.log(req.body)
  res.send('respond with a resource');
});

router.post('/registry', fileUpload.single('imgFile'), async (req, res) => {
  // console.log(req.body)
  res.json({message:'ok'});

  let {name, price, category, imageName} = req.body
  sql = `INSERT INTO clothe (name, price, category, img)
    VALUES ('${name}', ${price}, '${category}', '${imageName}')
  `
  console.log(sql)
  await db.execute(sql);
  // console.log(sql)
  // const cnx = await db.connection()
  // const [rows,fields] = await cnx.execute(sql)
  // console.log(fields)
  // console.log(rows)
  // rows.forEach(r => {
  //   console.log(r)
  // });
  
  // cnx.release();
  res.send('/clothes/registry');
});

module.exports = router;
