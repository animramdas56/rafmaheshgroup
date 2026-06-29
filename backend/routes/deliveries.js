const express = require('express')
const router = express.Router()
const db = require('../db')

// GET ALL DELIVERIES
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM deliveries'
    )

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// ADD DELIVERY
router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      origin_location,
      destination_location,
      status,
      assigned_vehicle,
    } = req.body

    const [result] = await db.query(
      `INSERT INTO deliveries
      (
        customer_name,
        origin_location,
        destination_location,
        status,
        assigned_vehicle
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        customer_name,
        origin_location,
        destination_location,
        status,
        assigned_vehicle,
      ]
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

// UPDATE DELIVERY
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      customer_name,
      origin_location,
      destination_location,
      status,
      assigned_vehicle,
    } = req.body

    await db.query(
      `UPDATE deliveries
       SET customer_name = ?,
           origin_location = ?,
           destination_location = ?,
           status = ?,
           assigned_vehicle = ?
       WHERE delivery_id = ?`,
      [
        customer_name,
        origin_location,
        destination_location,
        status,
        assigned_vehicle,
        id,
      ]
    )

    res.json({
      success: true,
      message: 'Delivery updated',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// DELETE DELIVERY
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await db.query(
      'DELETE FROM deliveries WHERE delivery_id = ?',
      [id]
    )

    res.json({
      success: true,
      message: 'Delivery deleted',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

module.exports = router