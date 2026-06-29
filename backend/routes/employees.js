const express = require('express')
const router = express.Router()

const db = require('../db')

// GET ALL EMPLOYEES
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// ADD EMPLOYEE
router.post('/', async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      department,
    } = req.body

    const sql = `
      INSERT INTO employees
      (first_name, last_name, email, phone_number, department)
      VALUES (?, ?, ?, ?, ?)
    `

    const [result] = await db.query(sql, [
      first_name,
      last_name,
      email,
      phone_number,
      department,
    ])

    res.json({
      success: true,
      employeeId: result.insertId,
    })

  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// UPDATE EMPLOYEE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      first_name,
      last_name,
      email,
      phone_number,
      department,
    } = req.body

    const sql = `
      UPDATE employees
      SET
        first_name = ?,
        last_name = ?,
        email = ?,
        phone_number = ?,
        department = ?
      WHERE employe_id = ?
    `

    await db.query(sql, [
      first_name,
      last_name,
      email,
      phone_number,
      department,
      id,
    ])

    res.json({
      success: true,
      message: 'Employee updated',
    })

  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// DELETE EMPLOYEE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await db.query(
      'DELETE FROM employees WHERE employe_id = ?',
      [id]
    )

    res.json({
      success: true,
      message: 'Employee deleted',
    })

  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

module.exports = router