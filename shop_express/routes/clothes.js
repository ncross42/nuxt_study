var express = require('express')
var router = express.Router()
const fileUpload = require('../utils/fileUpload')
// const db = require('../db.mysql')
const SQL = require('sql-template-strings')

/* GET clothes listing. */
router.get('/', (req, res, next) => {
  res.send('/clothes')
})

router.post('/', fileUpload.single('imgFile'), function(req, res, next) {
  console.log(req.body)
  res.send('respond with a resource')
})

router.post('/registry', fileUpload.single('imgFile'), async (req, res, next) => {
  console.log(req.body)
  const {name, price, category, stock} = req.body
  const db = req.app.locals.dbShop
  try {
    const sql = SQL`INSERT INTO clothes
          (   name ,   price ,   category ,   stock ,   img_path )
      VALUES ( ${name}, ${price}, ${category}, ${stock}, ${req.file.filename} )
    `
    console.log(sql)
    const ret = await db.run(sql)
    console.log(ret)
    res.json({message:'ok'})
  } catch (error) {
    const ret = { code:error.code, errno: error.errno, message: error.message }
    console.log(ret)
    res.status(500).json(ret)
    return
  }
})

module.exports = router;
