const express = require('express')
const router = express.Router()
const db = require('../db')

// GET ALL MINING SITES
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mining_sites')
    res.status(200).json(rows)
  } catch (error) {
    console.error("MINING ERROR:", error)
    res.status(500).json({ message: error.message })
  }
})

// CREATE MINING SITE
router.post('/', async (req, res) => {
  try {
    const { site_name, location, status } = req.body

    const [result] = await db.query(
      'INSERT INTO mining_sites (site_name, location, status) VALUES (?, ?, ?)',
      [site_name, location, status]
    )

    res.status(201).json({
      id: result.insertId,
      site_name,
      location,
      status
    })
  } catch (error) {
    console.error("CREATE MINING ERROR:", error)
    res.status(500).json({ message: error.message })
  }
})

// UPDATE MINING SITE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { site_name, location, status } = req.body

    await db.query(
  'UPDATE mining_sites SET site_name=?, location=?, status=? WHERE site_id=?',
  [site_name, location, status, id]
)

    res.json({ message: 'Mining site updated successfully' })
  } catch (error) {
    console.error("UPDATE MINING ERROR:", error)
    res.status(500).json({ message: error.message })
  }
})

// DELETE MINING SITE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await db.query('DELETE FROM mining_sites WHERE site_id=?', [id])

    res.json({ message: 'Mining site deleted successfully' })
  } catch (error) {
    console.error("DELETE MINING ERROR:", error)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router