const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL PROPERTIES
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM properties");

    console.log("PROPERTIES:", rows);

    res.json(rows); // ✅ CORRECT FOR MYSQL
  } catch (err) {
    console.log("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ADD  POST ROUTE (MYSQL)
router.post("/", async (req, res) => {
  try {
    const {
      property_name,
      location,
      price,
      property_type,
      status
    } = req.body;

    const sql = `
      INSERT INTO properties 
      (property_name, location, price, property_type, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      property_name,
      location,
      price,
      property_type,
      status
    ]);

    res.json({
      message: "Property added successfully",
      insertId: result.insertId
    });

  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// UPDATE PROPERTY ///////

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      property_name,
      location,
      price,
      property_type,
      status,
    } = req.body;

    const sql = `
      UPDATE properties
      SET
        property_name = ?,
        location = ?,
        price = ?,
        property_type = ?,
        status = ?
      WHERE property_id = ?
    `;

    const [result] = await db.query(sql, [
      property_name,
      location,
      price,
      property_type,
      status,
      id,
    ]);

    res.json({
      message: "Property updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});



// DELETE PROPERTY

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM properties WHERE property_id = ?",
      [id]
    );

    res.json({
      message: "Property deleted successfully",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;