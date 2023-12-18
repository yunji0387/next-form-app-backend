//jshint esversion:6

require("dotenv").config();
const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
    jobName: String,
    customerName: String,
    materialID: [String],
    materialName: [String],
    printType: String,
    printCustomerName: Boolean,
    printCustomText: Boolean,
    customText: String,
    designNotes: String,
    finalCheck: Boolean,
});

const FormData = mongoose.model("FormData", formDataSchema);

async function storeFormData(formData) {
    try {
        // Establish a connection to the database
        await mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');

        // Create a new document from the provided data and save it
        const newFormData = new FormData(formData);
        await newFormData.save();
        console.log("Successfully saved the form data.");

        // Close the connection after operation is complete
        await mongoose.connection.close();
        console.log("MongoDB Connection Closed");
    } catch (err) {
        console.error("Error in storeFormData:", err);
        // Close the connection in case of an error as well
        await mongoose.connection.close();
        console.log("MongoDB Connection Closed");
    }
}

module.exports = storeFormData;
