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
    // Check if formId is not set or not within the reserved testing range
    if (this.isNew && (this.formId === undefined || this.formId > 10)) {
        const update = await Counter.findByIdAndUpdate('formData', { $inc: { seq: 1 } }, { new: true, upsert: true });
        this.formId = update.seq;
    }
    next();
});

module.exports = mongoose.model('Form', FormSchema);