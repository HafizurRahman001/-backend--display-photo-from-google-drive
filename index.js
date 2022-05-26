const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());



// ${process.env.DB_USER}: ${process.env.DB_PASS}
//DB_USER=mydbuser1      DB_PASS=Q0AlzP3yLxbR7NDs

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7sw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);

client.connect(err => {
    const imageIdCollection = client.db("Google-Drive-Image-Id").collection("image-id");
    // perform actions on the collection object



    app.get('/link-id', async (req, res) => {
        const cursor = imageIdCollection.find({});
        const result = await cursor.toArray();
        res.send(result)
    })
    app.post('/linkArray', async (req, res) => {
        const idArr = req.body;
        const result = await imageIdCollection.insertOne(idArr);
        res.json(result)
    })



});


app.get('/', (req, res) => {
    res.send('welcome home page');
});


app.listen(port, () => {
    console.log('surver running on port:', port);
});

