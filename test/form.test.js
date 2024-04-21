// form.test.js

const supertest = require('supertest');
const mongoose = require('mongoose');
let chai;

before(async () => {
    chai = await import('chai');
});

const app = require('../server');  // Make sure your server exports the app correctly
const request = supertest(app);

let expect;

before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
});

describe('Form Data Server Normal Cases', () => {
    let createdForm, response;
    const testFormId = 1;

    before(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.MONGO_TEST_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Optional: Clean up the database before running tests
        await mongoose.model('Form').deleteMany({});

        // Create a test form before all tests
        response = await request.post('/forms')
            .send({
                formData: {
                    jobName: "Test Job",
                    customerName: "Test Customer",
                    materialID: ["001", "002"],
                    materialName: ["Paper", "Plastic"],
                    printType: "Digital",
                    printCustomerName: true,
                    printCustomText: true,
                    customText: "Test Text",
                    designNotes: "No specific notes",
                    formId: testFormId
                }
            });
        createdForm = response.body.form; // Store the created form for use in other tests
    });

    after(async () => {
        // Clean up the database after all tests are done
        await mongoose.model('Form').deleteMany({});

        // Disconnect from the database
        await mongoose.disconnect();
    });

    it('should confirm that the form has been created', async () => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Form data saved successfully.');
        expect(createdForm).to.include({
            jobName: "Test Job",
            customerName: "Test Customer",
            printType: "Digital",
            printCustomerName: true,
            printCustomText: true,
            customText: "Test Text",
            designNotes: "No specific notes"
        });
        expect(createdForm.materialID).to.deep.equal(["001", "002"]);
        expect(createdForm.materialName).to.deep.equal(["Paper", "Plastic"]);
        expect(createdForm.formId).to.equal(testFormId);
    });

    // Additional tests here...
});


// const supertest = require('supertest');
// let chai;

// before(async () => {
//     chai = await import('chai');
// });

// const app = require('../server');
// const request = supertest(app);

// let expect;

// before(async () => {
//     const chai = await import('chai');
//     expect = chai.expect;
// });

// describe('Form Data Server Normal Cases', () => {
//     let createdForm, response;
//     const testFormId = 1;

//     before(async () => {
//         // Create a test form before all tests
//         response = await request.post('/forms')
//             .send({
//                 formData: {
//                     jobName: "Test Job",
//                     customerName: "Test Customer",
//                     materialID: ["001", "002"],
//                     materialName: ["Paper", "Plastic"],
//                     printType: "Digital",
//                     printCustomerName: true,
//                     printCustomText: true,
//                     customText: "Test Text",
//                     designNotes: "No specific notes",
//                     formId: testFormId
//                 }
//             });
//         createdForm = response.body.form; // Store the created form for use in other tests
//     });

//     describe('POST /forms', () => {
//         it('should confirm that the form has been created', () => {
//             expect(response.status).to.equal(201);
//             expect(response.body.message).to.equal('Form data saved successfully.');
//             expect(createdForm).to.include({
//                 jobName: "Test Job",
//                 customerName: "Test Customer",
//                 printType: "Digital",
//                 printCustomerName: true,
//                 printCustomText: true,
//                 customText: "Test Text",
//                 designNotes: "No specific notes"
//             });
//             expect(createdForm.materialID).to.deep.equal(["001", "002"]);
//             expect(createdForm.materialName).to.deep.equal(["Paper", "Plastic"]);
//             expect(createdForm.formId).to.equal(testFormId);
//         });
//     });

//     // describe('GET /forms', () => {
//     //     it('should retrieve all forms', async () => {
//     //         const response = await request.get('/forms');
//     //         expect(response.status).to.equal(200);
//     //         expect(response.body).to.be.an('array');
//     //         expect(response.body.length).to.be.at.least(1);
//     //         expect(response.body.some(form => form.formId === testFormId)).to.be.true;
//     //     });
//     // });

//     // describe('GET /forms/:id', () => {
//     //     it('should retrieve a form by its ID', async () => {
//     //         const response = await request.get(`/forms/${createdForm._id}`); // Assuming _id is returned and valid
//     //         expect(response.status).to.equal(200);
//     //         expect(response.body).to.be.an('object');
//     //         expect(response.body.jobName).to.equal("Test Job");
//     //     });

//     //     it('should return 404 for a non-existing form ID', async () => {
//     //         const response = await request.get('/forms/999999999'); // Assuming this ID does not exist
//     //         expect(response.status).to.equal(404);
//     //     });
//     // });

//     // describe('DELETE /forms/:id', () => {
//     //     it('should delete a form given the ID', async () => {
//     //         const deleteResponse = await request.delete(`/forms/${createdForm._id}`);
//     //         expect(deleteResponse.status).to.equal(200);
//     //         expect(deleteResponse.body.message).to.equal("Form deleted successfully");

//     //         // Verify the form is no longer available
//     //         const response = await request.get(`/forms/${createdForm._id}`);
//     //         expect(response.status).to.equal(404);
//     //     });
//     // });
// });