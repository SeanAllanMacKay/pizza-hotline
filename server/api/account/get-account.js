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

router.get('/', async (req, res) => {
    const token = req.headers['x-access-token'] || req.headers['authorization']

    const response = await fetch(`${BACKEND}/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
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