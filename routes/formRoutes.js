const express = require('express');

const router = express.Router();


const {
    createForm,
    readFormById
} = require('../controllers/formController');


router.post('/', createForm);

router.get('/:id', readFormById);


module.exports = router;