require('dotenv').config()

const express = require('express')
const { Pool } = require('pg')
const app = express();

const port = process.env.PORT || 9000

app.use(express.json())

const pool = new Pool()

app.get('/', async (req, res) => {
  try {
     const {rows } = await pool.query("SELECT NOW()");
     res.send(rows[0].now)
   } catch(e) {
    res.sendStatus(500)
  }
})



app.listen(port, () => {
   console.log(`listen at port ${port}`)
})
