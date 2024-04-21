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
        res.status(201).json({ message: 'Form data saved successfully.', form: savedForm });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error saving form:', error);
        res.status(500).json({ message: 'Failed to save form data.', error: error.message });
    } finally {
        session.endSession();  // Ensure that the session is ended regardless of success or failure
    }
};

exports.readFormById = async (req, res) => {
    const { id } = req.params;  // Get the ID from the request URL parameter
    const  formId = Number(id);

    try {
        const form = await FormData.findOne({ formId: formId });
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json(form);
    } catch (error) {
        console.error('Error retrieving form:', error);
        res.status(500).json({ message: 'Failed to retrieve form data.', error: error.message });
    }
};