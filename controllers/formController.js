const mongoose = require('mongoose');
const FormData = require('../models/form');  // Ensure this is the correct path
require('dotenv').config();

exports.createForm = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { formData } = req.body;
        console.log('Received form data:', formData);
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

exports.readAllForms = async (req, res) => {
    try {
        const forms = await FormData.find({});  // Use Mongoose's find method to retrieve all documents
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error retrieving all forms:', error);
        res.status(500).json({ message: 'Failed to retrieve all form data.', error: error.message });
    }
};

exports.readFormById = async (req, res) => {
    const { id } = req.params;  // Get the ID from the request URL parameter
    const formId = Number(id);

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

exports.updateFormById = async (req, res) => {
    const { id } = req.params;  // Get the ID from the request URL parameter
    const updateData = req.body;  // Get the updated data from the request body
    const formId = Number(id);
    try {
        const form = await FormData.findOne({ formId: formId }); // Find the form by ID
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        // Update the fields of the form
        Object.keys(updateData).forEach(key => {
            form[key] = updateData[key];
        });

        // Save the updated form
        const updatedForm = await form.save();
        res.status(200).json({ message: 'Form updated successfully.', form: updatedForm });
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ message: 'Failed to update form data.', error: error.message });
    }
};

exports.deleteFormById = async (req, res) => {
    const { id } = req.params;  // Get the ID from the request URL parameter
    const formId = Number(id);

    try {
        const result = await FormData.findOneAndDelete({ formId: formId });
        if (!result) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ message: 'Failed to delete form data.', error: error.message });
    }
};