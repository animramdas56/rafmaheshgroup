const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Godsway@12345',
  database: 'raf_mahesh_group',
})

db.connect((err) => {
  if (err) {
    console.log('❌ DB Connection Failed:', err.message)
  } else {
    console.log('✅ DB Connected Successfully')
  }
})