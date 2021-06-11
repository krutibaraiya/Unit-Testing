let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Rental API', () => {

    //Testing GET route
    describe("GET /api/items", () => {
        it("It should GET all the items", (done) => {
            chai.request(server)
                .get("/api/items")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all the items", (done) => {
            chai.request(server)
                .get("/api/item")
                .end((err, res) => {
                    res.should.have.status(404);
                done();
                });
        });

     });


    //Testing GET by id route
    describe("GET /api/items/:id", () => {
        it("It should GET an item by ID", (done) => {
            const itemId = 1;
            chai.request(server)                
                .get("/api/items/" + itemId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('isBorrowed');
                    res.body.should.have.property('id').eq(1);
                done();
                });
        });

        it("It should NOT GET an item by ID", (done) => {
            const itemId = 345;
            chai.request(server)                
                .get("/api/items/" + itemId)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq("Item does not exist!");
                done();
                });
        });

    });
    

    //Testing POST route
    describe("POST /api/items", () => {
        it("It should POST a new item", (done) => {
            const item = {
                name: "Item 4",
                isBorrowed: false
            };
            chai.request(server)                
                .post("/api/items")
                .send(item)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eq(4);
                    res.body.should.have.property('name').eq("Item 4");
                    res.body.should.have.property('isBorrowed').eq(false);
                done();
                });
        });

        it("It should NOT POST a new item without its name", (done) => {
            const item = {
                isBorrowed: false
            };
            chai.request(server)                
                .post("/api/items")
                .send(item)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.eq("Name is compulsory and should be at least 3 chars!");
                done();
                });
        });

    });


    //Testing PUT route
    describe("PUT /api/items/:id", () => {
        it("It should PUT an existing item", (done) => {
            const itemId = 1;
            const item = {
                name: "Item 1 changed",
                isBorrowed: true
            };
            chai.request(server)                
                .put("/api/items/" + itemId)
                .send(item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eq(1);
                    res.body.should.have.property('name').eq("Item 1 changed");
                    res.body.should.have.property('isBorrowed').eq(true);
                done();
                });
        });

        it("It should NOT PUT an existing item with a name with less than 3 characters", (done) => {
            const itemId = 1;
            const item = {
                name: "Fo",
                isBorrowed: true
            };
            chai.request(server)                
                .put("/api/items/" + itemId)
                .send(item)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.eq("Name is compulsory and should be at least 3 chars!");
                done();
                });
        });        
    });
    

    
    //Testing the PATCH route
    describe("PATCH /api/items/:id", () => {
        it("It should PATCH an existing item", (done) => {
            const itemId = 1;
            const item = {
                name: "Item 1 patch"
            };
            chai.request(server)                
                .patch("/api/items/" + itemId)
                .send(item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eq(1);
                    res.body.should.have.property('name').eq("Item 1 patch");
                    res.body.should.have.property('isBorrowed').eq(true);
                done();
                });
        });

        it("It should NOT PATCH an existing item with a name with less than 3 characters", (done) => {
            const itemId = 1;
            const item = {
                name: "Fo"
            };
            chai.request(server)                
                .patch("/api/items/" + itemId)
                .send(item)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.eq("Name is compulsory and should be at least 3 chars!");
                done();
                });
        });        
    });
    

    //Testing the DELETE route
    describe("DELETE /api/items/:id", () => {
        it("It should DELETE an existing item", (done) => {
            const itemId = 1;
            chai.request(server)                
                .delete("/api/items/" + itemId)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE an item that is not in the database", (done) => {
            const itemId = 145;
            chai.request(server)                
                .delete("/api/items/" + itemId)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq("Item does not exist!");
                done();
                });
        });

     });

});


