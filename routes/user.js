const express = require('express');
const db = require('../db')
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers


const router = express.Router();

// ========================================>> GET:ALL
router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM users')
    res.send(rows)
})


// ========================================>> GET:ID
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const selectUser = {
        text: `
            SELECT * FROM users
            WHERE id = $1;
         `,
        values: [id]}

    try {
        const { rows } = await db.query(selectUser)
        res.send(rows)
    } catch (e) {
        res.status(404).send("User not found")
    }
})

// ========================================>> POST
router.post('/', async (req, res) => {
    const { first_name, last_name, age } = req.body

    const createUser = {
        text: `
            INSERT INTO users (first_name, last_name, age)
            VALUES($1, $2, $3)
            RETURNING *;
         `,
        values: [first_name, last_name, age]
    }

    try {
        const { rows } = await db.query(createUser)
        res.send(rows)
    } catch (e) {
        res.status(500).send(e)
    }
})



// ========================================>> PUT:ID
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { first_name, last_name, age } = req.body

    const updateUser = {
        text: `
            UPDATE users
            SET first_name=$1, last_name=$2, age=$3
            WHERE id = $4
            RETURNING *;
         `,
        values: [first_name, last_name, age, id]
    }

    try {
        const { rows } = await db.query(updateUser)
        res.send(rows)
    } catch (e) {
        res.status(500).send("User not found")
    }
})


// ============== DEACTIVATE USER =========>> PUT:ID
router.put('/:id/delete', async (req, res) => {
    const { id } = req.params

    const deactivateUser = {
        text: `
            UPDATE users
            SET first_name=$1
            WHERE id = $2
            RETURNING *;
         `,
        values: [0, id]
    }

    try {
        const { rows } = await db.query(deactivateUser)
        res.send(rows)
    } catch (e) {
        res.status(500).send("User not found")
    }
})


// ========================================>> DELETE:ID
router.delete('/:id/hard', async (req, res) => {
    const { id } = req.params

    const deleteUser = {
        text: `
            DELETE FROM users
            WHERE id = $1
            RETURNING *;
         `,
        values: [id]
    }

    try {
        const { rows } = await db.query(deleteUser)
        res.send(rows)
    } catch (e) {
        res.status(500).send(e)
    }
})



// export our router to be mounted by the parent application
module.exports = router
