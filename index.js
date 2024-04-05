// username: db_sain_health_care
// password: YmuJSrpBD4vm7lie

// import
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// MongoDB part
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jmx7rsi.mongodb.net/`;
const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db("Hospital_Service_Info");
        const servicesCollection = database.collection("services");

        // GET data from DB & send to client side/react
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Responsing from Get");
})

app.listen(port, () => {
    console.log("Listening From PORT : ", port);
})