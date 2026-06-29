const express = require('express')
const router = express.Router()
const db = require('../db')

// GET ALL VEHICLES
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM vehicles')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// ADD VEHICLE
router.post('/', async (req, res) => {
  try {
    const {
      plate_number,
      vehicle_type,
      status,
      assigned_driver,
    } = req.body

    const [result] = await db.query(
      `INSERT INTO vehicles
      (plate_number, vehicle_type, status, assigned_driver)
      VALUES (?, ?, ?, ?)`,
      [plate_number, vehicle_type, status, assigned_driver]
    )

    res.json({
      success: true,
      id: result.insertId,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// DELETE VEHICLE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await db.query(
      'DELETE FROM vehicles WHERE vehicle_id = ?',
      [id]
    )

    res.json({
      success: true,
      message: 'Vehicle deleted',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      plate_number,
      vehicle_type,
      status,
      assigned_driver,
    } = req.body

    await db.query(
      `UPDATE vehicles
       SET plate_number = ?,
           vehicle_type = ?,
           status = ?,
           assigned_driver = ?
       WHERE vehicle_id = ?`,
      [
        plate_number,
        vehicle_type,
        status,
        assigned_driver,
        id,
      ]
    )

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message,
    })
  }
})


module.exports = router