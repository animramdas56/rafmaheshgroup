const express = require('express')
const router = express.Router()
const db = require('../db')

// GET ALL ACCOUNTS
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM accounts')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// ADD ACCOUNT
router.post('/', async (req, res) => {
  try {
    const {
      account_name,
      account_type,
      balance,
    } = req.body

    const [result] = await db.query(
      `INSERT INTO accounts
      (account_name, account_type, balance)
      VALUES (?, ?, ?)`,
      [
        account_name,
        account_type,
        balance,
      ]
    )

    res.json({
      success: true,
      accountId: result.insertId,
    })

  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})






// UPDATE ACCOUNT
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { account_name, account_type, balance } = req.body

    await db.query(
      `UPDATE accounts 
       SET account_name = ?, account_type = ?, balance = ?
       WHERE account_id = ?`,
      [account_name, account_type, balance, id]
    )

    res.json({
      success: true,
      message: 'Account updated'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// DELETE ACCOUNT
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await db.query(
      'DELETE FROM accounts WHERE account_id = ?',
      [id]
    )

    res.json({
      success: true,
      message: 'Account deleted'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

module.exports = router