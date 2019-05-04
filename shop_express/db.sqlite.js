const Database = require('sqlite-async')

var db
Database.open('shop.db').then(_db => {
  db = _db
})

module.exports = db