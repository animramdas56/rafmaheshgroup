const express = require('express')
const router = express.Router()
const db = require('../db')

// GET ALL TRANSACTIONS
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        t.*,
        a.account_name
      FROM transactions t
      LEFT JOIN accounts a
      ON t.account_id = a.account_id
      ORDER BY transaction_date DESC
    `)

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// ADD TRANSACTION
router.post('/', async (req, res) => {
  try {
    const {
      account_id,
      transaction_type,
      amount,
      description,
    } = req.body

    const [result] = await db.query(
      `
      INSERT INTO transactions
      (
        account_id,
        transaction_type,
        amount,
        description
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        account_id,
        transaction_type,
        amount,
        description,
      ]
    )

    // Update account balance
    if (transaction_type === 'Credit') {
      await db.query(
        `
        UPDATE accounts
        SET balance = balance + ?
        WHERE account_id = ?
        `,
        [amount, account_id]
      )
    }

    if (transaction_type === 'Debit') {
      await db.query(
        `
        UPDATE accounts
        SET balance = balance - ?
        WHERE account_id = ?
        `,
        [amount, account_id]
      )
    }

    res.json({
      success: true,
      transactionId: result.insertId,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

module.exports = router