//jshint esversion:6

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
app.use(cors({
    origin: '*'
}));
app.use(express.json());
require("dotenv").config();

// MongoDB connection without deprecated options
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const formRoutes = require('./routes/formRoutes');
app.use('/forms', formRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Form Data Management API Server',
        apiEndpoints: {
            createForm: {
                method: 'POST',
                uri: '/forms',
                description: 'Create a new form entry. Send form data as JSON in the request body.'
            },
            readForm: {
                method: 'GET',
                uri: '/forms/:id',
                description: 'Retrieve the details of a specific form entry by its ID. Replace :id with the actual form ID.'
            },
            updateForm: {
                method: 'PUT',
                uri: '/forms/:id',
                description: 'Update an existing form entry. Replace :id with the actual form ID and send the updated data as JSON.'
            },
            deleteForm: {
                method: 'DELETE',
                uri: '/forms/:id',
                description: 'Delete a specific form entry from the database. Replace :id with the actual form ID.'
            },
            listForms: {
                method: 'GET',
                uri: '/forms',
                description: 'List all form entries in the database.'
            }
        },
        note: 'Please ensure to replace :id with the actual form ID you wish to interact with in the provided API endpoints.'
    });
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;

// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors({
//     origin: '*'
// }));

// app.use(express.json());
// const port = process.env.PORT || 3000;
// require("dotenv").config();
// const { storeFormData, validateFormData } = require("./logic/storeFormData.js");

// app.get('/', async (req, res) => {
//     res.send("This is a backend server for the next-form-app.");
// });

// app.post('/submit-form', async (req, res) => {
//     const formData = req.body;

//     // Basic validation function
//     const isValid = validateFormData(formData);
//     if (!isValid) {
//         return res.status(400).send('Invalid form data.');
//     } else {
//         console.log("Form data validation success.");
//     }

//     try {
//         await storeFormData(formData);
//         console.log('Form data saved successfully!');
//         res.status(200).send('Form data saved successfully!'); // Make sure to send response
//     } catch (err) {
//         console.error('Error saving form data:', err);
//         res.status(500).send('Failed to save form data.');
//     }
// });


// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
