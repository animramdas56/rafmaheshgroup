const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../db")

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" })
    }

    const user = rows[0]

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" })
    }

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    )

    res.json({
      token,
      user: {
        id: user.user_id,
        name: user.full_name,
        email: user.email,
        role: user.role,
      },
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router