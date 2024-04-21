const express = require('express');

const router = express.Router();


const {
    createForm,
    readAllForms,
    readFormById
} = require('../controllers/formController');


router.post('/', createForm);

router.get('/', readAllForms);

router.get('/:id', readFormById);


module.exports = router;