const express = require('express');

const router = express.Router();


const {
    createForm
} = require('../controllers/formController');


router.post('/', createForm);


module.exports = router;