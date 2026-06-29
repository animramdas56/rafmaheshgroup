const mysql = require('mysql2')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Godsway@12345',
  database: 'raf_mahesh_group',
})

module.exports = db.promise()