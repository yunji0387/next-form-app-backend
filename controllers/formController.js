// const https = require('https');
// const mongoose = require('mongoose');
// const FormData = require('../models/form');  // Ensure this is the updated model with auto-increment logic
// require('dotenv').config();

// exports.createForm = async (req, res) => {
//     const { formData } = req.body;
//     console.log('Received form data:', formData);
//     const newForm = new FormData(formData);  // formData should not include formId; it's auto-generated
//     console.log('New form data:', newForm);
//     try {
//         const savedForm = await newForm.save();
//         console.log('Form saved successfully:', savedForm);
//         res.status(201).json(savedForm);
//     } catch (error) {
//         console.error('Error saving form:', error);
//         res.status(500).json({ message: 'Failed to save form data.', error: error.message });
//     }
// };

const mongoose = require('mongoose');
const FormData = require('../models/form');  // Ensure this is the correct path
require('dotenv').config();

exports.createForm = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { formData } = req.body;
        console.log('Received form data:',formData);
        const newForm = new FormData(formData);  // Assuming formData should not be nested under 'formData'

        // Perform the save operation within a transaction
        const savedForm = await newForm.save({ session });
        await session.commitTransaction();

        console.log('Form saved successfully:', savedForm);
        res.status(201).json(savedForm);
    } catch (error) {
        await session.abortTransaction();
        console.error('Error saving form:', error);
        res.status(500).json({ message: 'Failed to save form data.', error: error.message });
    } finally {
        session.endSession();  // Ensure that the session is ended regardless of success or failure
    }
};
