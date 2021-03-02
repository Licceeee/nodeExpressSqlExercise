const express = require('express')
const app = express();

const port = process.env.PORT || 9000

app.use(express.json())

const users = require('./routes/user')
const orders = require('./routes/order')

app.use('/api/v1/users', users)
app.use('/api/v1/orders', orders)

app.get('/', async (req, res) => {
  try {
     res.send("response")
   } catch(e) {
    res.sendStatus(500)
  }
})



app.listen(port, () => console.log(`listen at port ${port}`))
