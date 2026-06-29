const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res) => {
  try {
    const [[employees]] = await db.query('SELECT COUNT(*) AS total FROM employees')
    const [[vehicles]] = await db.query('SELECT COUNT(*) AS total FROM vehicles')
    const [[trucks]] = await db.query('SELECT COUNT(*) AS total FROM trucks')
    const [[projects]] = await db.query('SELECT COUNT(*) AS total FROM projects')
    const [[departments]] = await db.query('SELECT COUNT(*) AS total FROM departments')
    const [[properties]] = await db.query('SELECT COUNT(*) AS total FROM properties')
    const [[farms]] = await db.query('SELECT COUNT(*) AS total FROM farms')
    const [[sites]] = await db.query('SELECT COUNT(*) AS total FROM mining_sites')
    const [[finance]] = await db.query('SELECT SUM(balance) AS total FROM accounts')

    res.json({
      departments: departments.total || 0,
      employees: employees.total || 0,
      vehicles: vehicles.total || 0,
      trucks: trucks.total || 0,
      projects: projects.total || 0,
      properties: properties.total || 0,
      farms: farms.total || 0,
      miningSites: sites.total || 0,
      balance: finance.total || 0,
    })

  } catch (error) {
    console.error("Dashboard error:", error)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router