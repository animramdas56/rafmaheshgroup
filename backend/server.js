const express = require('express')
const cors = require('cors')

const app = express() // ✅ MUST BE FIRST

app.use(cors())
app.use(express.json())

console.log('🚀RAMJAY Server starting...')

// ROUTES (IMPORT AFTER app is created)
const authRoutes = require("./routes/auth")
const dashboardRoutes = require('./routes/dashboard')
const employeeRoutes = require('./routes/employees')
const vehiclesRoutes = require('./routes/vehicles')
const accountRoutes = require('./routes/accounts')
const transactionRoutes = require('./routes/transactions')
const miningRoutes = require('./routes/mining')
const deliveriesRoutes = require('./routes/deliveries')
const propertiesRoutes = require('./routes/properties')



// REGISTER ROUTES
app.use("/api/auth", authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/vehicles', vehiclesRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/mining', miningRoutes)
app.use('/api/deliveries', deliveriesRoutes)
app.use('/api/properties', propertiesRoutes)




// TEST ROUTE
app.get('/', (req, res) => {
  res.send('RAF-MAHESH ERP API RUNNING ⚡')
})

// START SERVER
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})