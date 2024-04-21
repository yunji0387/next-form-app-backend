const mongoose = require('mongoose');
const Counter = require('./counter');

const FormSchema = new mongoose.Schema({
    formId: Number,
    jobName: String,
    customerName: String,
    materialID: [String],
    materialName: [String],
    printType: String,
    printCustomerName: Boolean,
    printCustomText: Boolean,
    customText: String,
    designNotes: String,
});

FormSchema.pre('save', async function (next) {
    if (this.isNew) {  // Ensure this logic only applies to new documents
        const update = await Counter.findByIdAndUpdate('formData', { $inc: { seq: 1 } }, { new: true, upsert: true });
        this.formId = update.seq;
    }
    next();
});

module.exports = mongoose.model('Form', FormSchema);