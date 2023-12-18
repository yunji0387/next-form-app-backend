//jshint esversion:6

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const storeFormData = require("./logic/storeFormData.js");

app.get('/', async(req, res) => {
    const formData = {
        jobName: "Sample Job 2",
        customerName: "POER Corporation",
        materialID: ["mat021", "mat022", "mat023"],
        materialName: ["Cardboard", "Glossy Paper", "Plastic"],
        printType: "Black and White",
        printCustomerName: true,
        printCustomText: false,
        customText: "Normal Delivery",
        designNotes: "Please handle with care; print on the largest side.",
        finalCheck: true,
    };

    try {
        await storeFormData(formData);
        res.send('Form data saved successfully!');
    } catch (err) {
        console.error('Error saving form data:', err);
        res.status(500).send('Failed to save form data.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
