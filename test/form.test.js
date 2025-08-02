const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let chai;
let mongoServer;
let app;

before(async () => {
    chai = await import('chai');
});

let expect;

before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
});

describe('Form CRUD Operations', function () {
    const testFormId = 1;
    const formData = {
        jobName: "Initial Job",
        customerName: "Initial Customer",
        materialID: ["001", "002"],
        materialName: ["Paper", "Plastic"],
        printType: "Digital",
        printCustomerName: false,
        printCustomText: false,
        customText: "",
        designNotes: "Initial notes",
        formId: testFormId
    };

    before(async function () {
        // Start in-memory MongoDB
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        // Close any existing connection
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        
        // Connect to in-memory database
        await mongoose.connect(mongoUri);
        
        // Now require the server after database is set up
        app = require('../server');
        
        // Clean the database
        try {
            await mongoose.connection.collections.forms.deleteMany({});
        } catch (error) {
            // Collection might not exist yet, that's ok
        }
    });

    after(async function () {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('POST /forms', function () {
        it('should create a form', async function () {
            const res = await supertest(app).post('/forms').send(formData);
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Form data saved successfully.');
            expect(res.body.form).to.include({
                jobName: "Initial Job",
                customerName: "Initial Customer",
                printType: "Digital",
                printCustomerName: false,
                printCustomText: false,
                customText: "",
                designNotes: "Initial notes",
            });
            expect(res.body.form.materialID).to.deep.equal(["001", "002"]);
            expect(res.body.form.materialName).to.deep.equal(["Paper", "Plastic"]);
            expect(res.body.form.formId).to.equal(testFormId);
        });
    });

    describe('GET /forms', function () {
        it('should retrieve all forms', async function () {
            const res = await supertest(app).get('/forms');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.include({
                jobName: "Initial Job",
                customerName: "Initial Customer",
                printType: "Digital",
                printCustomerName: false,
                printCustomText: false,
                customText: "",
                designNotes: "Initial notes",
            });
        });

        it('should return an empty array if no forms are found', async function () {
            await mongoose.connection.collections.forms.deleteMany({});
            const res = await supertest(app).get('/forms');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(0);
        });

        it('should return an array of forms if multiple forms are found', async function () {
            const formData2 = {
                jobName: "Second Job",
                customerName: "Second Customer",
                materialID: ["003", "004"],
                materialName: ["Metal", "Wood"],
                printType: "Offset",
                printCustomerName: true,
                printCustomText: true,
                customText: "Custom Text",
                designNotes: "Second notes",
                formId: 2
            };
            await supertest(app).post('/forms').send(formData);
            await supertest(app).post('/forms').send(formData2);
            const res = await supertest(app).get('/forms');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(2);
            expect(res.body[1]).to.include({
                jobName: "Second Job",
                customerName: "Second Customer",
                printType: "Offset",
                printCustomerName: true,
                printCustomText: true,
                customText: "Custom Text",
                designNotes: "Second notes",
            });
            expect(res.body[1].materialID).to.deep.equal(["003", "004"]);
            expect(res.body[1].materialName).to.deep.equal(["Metal", "Wood"]);
            expect(res.body[1].formId).to.equal(2);
        });
    });

    describe('GET /forms/:id', function () {
        it('should retrieve a specific form by its ID', async function () {
            const res = await supertest(app).get(`/forms/${testFormId}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.include({
                jobName: "Initial Job",
                customerName: "Initial Customer",
                printType: "Digital",
                printCustomerName: false,
                printCustomText: false,
                customText: "",
                designNotes: "Initial notes",
            });
            expect(res.body.materialID).to.deep.equal(["001", "002"]);
            expect(res.body.materialName).to.deep.equal(["Paper", "Plastic"]);
            expect(res.body.formId).to.equal(testFormId);
        });

        it('should return 404 for a non-existing form ID', async function () {
            const res = await supertest(app).get('/forms/12345678');
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Form not found');
        });
    });

    describe('PUT /forms/:id', function () {
        it('should update an existing form', async function () {
            const updateData = {
                jobName: "Updated Job",
                designNotes: "Updated notes"
            };
            const res = await supertest(app).put(`/forms/${testFormId}`).send(updateData);
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Form updated successfully.');
            expect(res.body.form).to.include({
                jobName: "Updated Job",
                customerName: "Initial Customer",
                printType: "Digital",
                printCustomerName: false,
                printCustomText: false,
                customText: "",
                designNotes: "Updated notes",
            });
            expect(res.body.form.materialID).to.deep.equal(["001", "002"]);
            expect(res.body.form.materialName).to.deep.equal(["Paper", "Plastic"]);
            expect(res.body.form.formId).to.equal(testFormId);
        });

        it('should return 404 for a non-existing form ID', async function () {
            const res = await supertest(app).put('/forms/12345678');
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Form not found');
        });
    });

    describe('DELETE /forms/:id', function () {
        it('should delete a specific form', async function () {
            const res = await supertest(app).delete(`/forms/${testFormId}`);
            expect(res.status).to.equal(200);
            const checkRes = await supertest(app).get(`/forms/${testFormId}`);
            expect(checkRes.status).to.equal(404);
        });

        it('should return 404 for a non-existing form ID', async function () {
            const res = await supertest(app).delete('/forms/12345678');
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Form not found');
        });
    });
});