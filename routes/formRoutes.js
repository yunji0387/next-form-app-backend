const express = require('express');

const router = express.Router();


const {
    createForm,
    readAllForms,
    readFormById,
    updateFormById
} = require('../controllers/formController');


router.post('/', createForm);

router.get('/', readAllForms);

router.get('/:id', readFormById);

router.put('/:id', updateFormById);

module.exports = router;