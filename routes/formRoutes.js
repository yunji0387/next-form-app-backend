const express = require('express');

const router = express.Router();


const {
    createForm,
    readAllForms,
    readFormById,
    updateFormById,
    deleteFormById
} = require('../controllers/formController');


router.post('/', createForm);

router.get('/', readAllForms);

router.get('/:id', readFormById);

router.put('/:id', updateFormById);

router.delete('/:id', deleteFormById);

module.exports = router;