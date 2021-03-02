const express = require('express');
const db = require('../db')
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers


const router = express.Router();
const { validationResult } = require('express-validator');
const { validatePrice, validateDate,
        validateOrderID } = require('../validators') 


// ========================================>> GET:ALL
router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM orders')
    res.send(rows)
})


// ========================================>> GET:ID
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const selectOrder = {
        text: `
            SELECT * FROM orders
            WHERE id = $1;
         `,
        values: [id]}

    try {
        const { rows } = await db.query(selectOrder)
        res.send(rows)
    } catch (e) {
        res.status(404).send("Order not found")
    }
})

// ========================================>> POST
router.post('/', 
  [validatePrice, validateDate, validateOrderID],
  async (req, res) => {

    const errors = validationResult(req) 
        if(!errors.isEmpty()){ 
            return res.status(422).send({errors}) 
        }
    const { price, date, user_id } = req.body

    const createOrder = {
        text: `
            INSERT INTO orders (price, date, user_id)
            VALUES($1, $2, $3)
            RETURNING *;
         `,
        values: [price, date, user_id]
    }

    try {
        const { rows } = await db.query(createOrder)
        res.send(rows)
    } catch (e) {
        res.status(500).send(e)
    }
})



// ========================================>> PUT:ID
router.put('/:id', 
  [validatePrice, validateDate, validateOrderID],
  async (req, res) => {
    const { id } = req.params
    const { price, date, user_id } = req.body

    const errors = validationResult(req) 
        if(!errors.isEmpty()){ 
            return res.status(422).send({errors}) 
        }
    const updateOrder = {
        text: `
            UPDATE orders
            SET price=$1, date=$2, user_id=$3
            WHERE id = $4
            RETURNING *;
         `,
        values: [price, date, user_id, id]
    }

    try {
        const { rows } = await db.query(updateOrder)
        res.send(rows)
    } catch (e) {
        res.status(500).send("Order not found")
    }
})



// ========================================>> DELETE:ID
router.delete('/:id/hard', async (req, res) => {
    const { id } = req.params

    const deleteOrder = {
        text: `
            DELETE FROM orders
            WHERE id = $1
            RETURNING *;
         `,
        values: [id]
    }

    try {
        const { rows } = await db.query(deleteOrder)
        res.send(rows)
    } catch (e) {
        res.status(500).send(e)
    }
})



// export our router to be mounted by the parent application
module.exports = router
