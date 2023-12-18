//jshint esversion:6

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'https://next-form-app-pi.vercel.app/form'
}));
app.use(express.json());
const port = process.env.PORT || 3000;
require("dotenv").config();
const { storeFormData, validateFormData } = require("./logic/storeFormData.js");

app.get('/', async(req, res) => {
    res.send("This is a backend server for the next-form-app.");
});

app.post('/submit-form', async (req, res) => {
    const formData = req.body;

    // Basic validation function
    const isValid = validateFormData(formData);
    if (!isValid) {
        return res.status(400).send('Invalid form data.');
    } else {
        console.log("Form data validation success.");
    }

    try {
        await storeFormData(formData);
        // res.send('Form data saved successfully!');
        res.status(200);
        console.log('Form data saved successfully!');
    } catch (err) {
        console.error('Error saving form data:', err);
        res.status(500).send('Failed to save form data.');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
