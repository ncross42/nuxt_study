const sqlite = require('sqlite')

var db

async function main() {
  const [dbShop, dbTest] = await Promise.all([
    sqlite.open('./shop.sqlite', { Promise, cached: true }),
    sqlite.open('./test.sqlite', { Promise }),
  ])
  await Promise.all([
    dbShop.migrate({migrationsPath: './migrations/shop'}),
    dbTest.migrate({migrationsPath: './migrations/test'})
  ])
  // db = {dbShop, dbTest}
}
main()
console.log(db)
// let [dbShop, dbTest] = main()

module.exports = db