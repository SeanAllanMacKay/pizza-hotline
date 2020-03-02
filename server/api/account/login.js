const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
    BACKEND
} = process.env

router.post('/', async (req, res) => {
    const response = await fetch(`${BACKEND}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })

    const json = await response.json()

    if(response.status === 200){
        if(json.success){
            return res.status(response.status).send(json)
        }
    } else {
        return res.status(response.status).send({ success: false, error: json.error })
    }
})

module.exports = router;