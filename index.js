const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());


// MongoDB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.shklq4p.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const apartmentsCollection = client.db("SkyNest").collection("apartments");

    const userCollection = client.db("SkyNest").collection("users");

    const agreementsCollection = client.db("SkyNest").collection("agreements");

    const announcementsCollection = client.db("SkyNest").collection("announcements");

    // Get all the Apartments Data

    app.get('/apartments', async(req,res) => {
      const result = await apartmentsCollection.find().toArray();
      res.send(result);
    })


    // Users API
    app.post('/users', async (req,res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    })


    // agreements API
    // Get Operations
    app.get('/agreements', async(req, res) => {
      const result = await agreementsCollection.find().toArray();
      res.send(result);
    });
    // POST Operation
    app.post('/agreements', async (req,res) => {
      const user = req.body;
      const result = await agreementsCollection.insertOne(user);
      res.send(result);
    })


    // announcements API

    // GET Operations
    app.get('/announcements', async(req, res) => {
      const result = await announcementsCollection.find().toArray();
      res.send(result);
    });
    // POST Operations
    app.post('/announcements', async (req,res) => {
      const user = req.body;
      const result = await announcementsCollection.insertOne(user);
      res.send(result);
    })


    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res) => {
    res.send('SkyNest flying');
})

app.listen(port, () => {
    console.log(`SkyNest is flying on port ${port}`);
})