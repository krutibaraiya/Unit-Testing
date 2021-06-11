const express = require('express');
const app = express();

app.use(express.json());

const items = [
    {
        id: 1,
        name : "Item 1",
        isBorrowed : true
    },
    {
        id: 2,
        name : "Item 2",
        isBorrowed : true
    },
    {
        id: 3,
        name : "Item 3",
        isBorrowed : false
    }

]

app.get('/', (req,res) => {
    res.send('Hello, welcome to Rental API!')
});

//GET
app.get('/api/items', (req,res) => {
    res.send(items);
});

//GET Item by ID
app.get("/api/items/:id" , (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id === parseInt(itemId));
    if(!item) return res.status(404).send("Item does not exist!");
    res.send(item);
});

//POST
app.post('/api/items', (req, res) => {
    if(!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is compulsory and should be at least 3 chars!');
    
    const item = {
        id : items.length + 1,
        name : req.body.name,
        isBorrowed : req.body.isBorrowed
    };
    
    items.push(item);
    res.status(201).send(item);
});

//PUT
app.put("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id === parseInt(itemId));
    if(!item) return resp.status(404).send("Item does not exist!");

    if(!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is compulsory and should be at least 3 chars!');
    item.name = req.body.name;
    item.isBorrowed = req.body.isBorrowed;

    res.send(item);
});

//PATCH
app.patch("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id === parseInt(itemId));
    if(!item) return res.status(404).send("Item does not exist!");
    if(!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is compulsory and should be at least 3 chars!');

    item.name = req.body.name;
    if(req.body.isBorrowed) item.isBorrowed = req.body.isBorrowed;
    res.send(item);
});

//DELETE
app.delete("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id === parseInt(itemId));
    if(!item) return res.status(404).send("Item does not exist!");

    const index = items.indexOf(item);
    items.splice(index, 1);
    res.send(item);
});


const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));

