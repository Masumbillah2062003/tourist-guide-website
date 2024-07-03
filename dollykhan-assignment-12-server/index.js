const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_NAME_DB}:${process.env.USER_PASS_DB}@cluster0.3187xgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const usersCollection = client.db('dollyKhanAssignment12DB').collection('users')
    const guideCollection = client.db('dollyKhanAssignment12DB').collection('guideUser')
    const packageCollection = client.db('dollyKhanAssignment12DB').collection('tourPackages')
    const wishlistCollection = client.db('dollyKhanAssignment12DB').collection('packageWishlist')
    const bookingCollection = client.db('dollyKhanAssignment12DB').collection('tourBooking')
    const guideRequestCollection = client.db('dollyKhanAssignment12DB').collection('guideRequest')
    const storyCollection = client.db('dollyKhanAssignment12DB').collection('touristStory')
    const paymentCollection = client.db('dollyKhanAssignment12DB').collection('payment')


    // middleware
    app.post('/jwt', async (req, res) => {
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
      res.send({ token })
    })

    const verifyToken = (req, res, next) => {
      console.log('inside verify token', req.headers.authorization)
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' })
      }
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).send({ message: 'unauthorized access' })
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded
        next()
      })
    }

    // users verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }

      const user = await usersCollection.findOne(query)
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" })
      }
      next()
    }
    const verifyGuide = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }

      const user = await usersCollection.findOne(query)
      const isAdmin = user?.role === 'guide';
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" })
      }
      next()
    }

    // user related 

    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray()
      res.send(result)
    })

    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email }
      const user = await usersCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user.role === 'admin'
      }
      res.send({ admin })
    })
   
   


    app.post('/users', async (req, res) => {
      const user = req.body;

      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query)

      if (existingUser) {
        return res.send({ message: 'user already exists', insertId: null })
      }

      const result = await usersCollection.insertOne(user);
      res.send(result)
    })

    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await usersCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    app.patch('/users/guide/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          role: 'guide'
        }
      }
      const result = await usersCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })


    // guide user

    app.get('/guideUser', async(req, res) =>{
      const result = await guideCollection.find().toArray()
      res.send(result)
    })
    app.get('/guideUser/profiledetails/:id', async(req, res) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await guideCollection.findOne(query)
      res.send(result)
    })

    app.get('/guideUser/guide/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email }
      const user = await usersCollection.findOne(query);
      let guide = false;
      if (user) {
        guide = user.role === 'guide'
      }
      res.send({ guide })
    })


    app.post('/guideUser', async(req, res) => {
      const user = req.body
      const result = await guideCollection.insertOne(user)
      res.send(result)
    })

    app.patch('/tourBooking/review/:id', verifyToken, verifyGuide, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          status: 'In Review'
        }
      }
      const result = await bookingCollection.updateOne(filter, updateDoc)
      res.send(result)
    })
    app.patch('/tourBooking/reject/:id', verifyToken, verifyGuide, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          status: 'Accepted'
        }
      }
      const result = await bookingCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    app.patch('/tourBooking/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          payment: 'Confirm'
        }
      }
      const result = await bookingCollection.updateOne(filter, updateDoc)
      res.send(result)
    })


    // tourPackages
    app.get("/tourPackages", async (req, res) => {
      const result = await packageCollection.find().toArray()
      res.send(result)
    })
    app.get('/tourPackages/details/:id', async(req, res) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await packageCollection.findOne(query)
      res.send(result)
    })
    app.post('/tourPackages', verifyToken,verifyAdmin, async (req, res) => {
      const item = req.body;
      const result = await packageCollection.insertOne(item)
      res.send(result)
    })


    // wishList
    app.get("/packageWishlist", async (req, res) => {
      const result = await wishlistCollection.find().toArray()
      res.send(result)
    })
    
    app.post('/packageWishlist', async (req, res) => {
      const item = req.body;
      const result = await wishlistCollection.insertOne(item)
      res.send(result)
    })
    
    app.delete('/packageWishlist/:id', async (req, res) => {
      const id = req.params.id;
      const item = {_id: new ObjectId(id)}
      const result = await wishlistCollection.deleteOne(item)
      res.send(result)
    })

    // tour booking related
    app.get("/tourBooking", async (req, res) => {
      const result = await bookingCollection.find().toArray()
      res.send(result)
    })

    app.delete('/tourBooking/:id', async (req, res) => {
      const id = req.params.id;
      const item = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(item)
      res.send(result)
    })

    app.post('/tourBooking', async (req, res) => {
      const item = req.body;
      const result = await bookingCollection.insertOne(item)
      res.send(result)
    })

    // user to Guide be for Request Admin
    app.get("/guideRequest", async (req, res) => {
      const result = await guideRequestCollection.find().toArray()
      res.send(result)
    })
    app.post('/guideRequest', async (req, res) => {
      const item = req.body;
      const result = await guideRequestCollection.insertOne(item)
      res.send(result)
    })

    // tourist story
    app.get('/touristStory', async(req, res) => {
      const result = await storyCollection.find().toArray()
      res.send(result)
    })



    // payment intent
    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100)
      console.log(amount, "ammount inside the intend")
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        "payment_method_types": [
          "card",
          "link"
        ],
      })
      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })

    app.get('/payment', async (req, res) => {
      const result = await paymentCollection.find().toArray()
      res.send(result)
    })

    app.post('/payment', async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);
      console.log('payment info', payment)
      res.send({ paymentResult })

    })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Dolly khan Assignment 12 server')
})
app.listen(port, () => {
  console.log(`your assignment server port is running ${port}`)
})