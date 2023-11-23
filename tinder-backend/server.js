import express from 'express'
import mongoose from 'mongoose'
import Users from "./dbCards.js"
import Cors from 'cors'
import {v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//For each project involving a MongooseDB, npm i nodemon must be installed 

//App Configuration
const app = express();
const port = process.env.PORT || 8001
const connection_url= 'mongodb+srv://steveberg:yourdaddy@cluster0.qdug01t.mongodb.net/?retryWrites=true&w=majority'

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'tinderdb'
})


console.log("Mongoose Database Connection State Definitions:   0: Disconnected, 1: Connected, 2: Connecting, 3: Disconnecting "+ mongoose.connection.readyState)
console.log("Mongoose Database Connection State: "+ mongoose.connection.readyState)

//API Endpoints
app.get('/',(req, res) => res.status(200).send('Hello World'))

app.post('/signup', async (req, res) =>{
    //Gets inputted email/password from home page
    const client = mongoose.connection
    const {email, password} = req.body
    //User ID/hashed password generation
    const generatedUserId = uuidv4()
    const hashPassword =await bcrypt.hash(password, 10)
    try{
        const users = client.collection('users')
        const existingUser = await users.findOne({email})
        if (existingUser){
            return res.status(409).send('User already exists. PLease login!')
        }
        const sanitizedEmail = email.toLowerCase()
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashPassword
        }
        const insertedUser = await users.insertOne(data)
        //Access token upon successful sign-in generated
        const token = jwt.sign(insertedUser,sanitizedEmail,{
            expiresIn: 60*24
        })
        res.status(201).json({token,userId: generatedUserId})
    }catch(err) {
        console.error(err)
    }
})
//Logging in backend processes
app.post('/login', async (req,res) =>{
    const client = mongoose.connection
    const {email, password} = req.body
    //Checking for unique user based on email address
    try{
        const users = client.collection('users')
        const user = await users.findOne({email})
        //Comparing hashed and unhashed password
        const correctPassword = await bcrypt.compare(password,user.hashed_password)
        //User token for 24 hours given to client
        if (user && correctPassword){
            const token = jwt.sign(user, email, {
                expiresIn: 60*24
            })
            res.status(201).json({token, userId:user.user_id})
        }
        console.log('Invalid Credentials')
        res.status(400).send('Invalid Credidentials')
        } catch(err){
    console.log(err)
}})
//Update user information
app.put('/user', async(req, res) => {
    const client = mongoose.connection
    const formData = req.body.formData
    try {
        const users = client.collection('users')
        //Inserting form data information into database
        const query = {user_id: formData.user_id}
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            }
        }
        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)
    }finally{
        await client.close()
    }
})
//Getting a user's information from their database object
app.get('/user', async (req, res) => {
    const client = mongoose.connection
    const userId = req.query.userId
    console.log('userId', userId)
    try{
        const users = client.collection('users')
        const query = {user_id: userId}
        const user = await users.findOne(query)
        console.log('User Sent:',user)
        res.send(user)
    } catch(err){
        console.log(err)
    }
})

//Lookup Users for dashboard initialization
app.get('/gendered-users', async (req, res) =>{
    const client = mongoose.connection
    const gender = req.query.gender
    try{
        const users = client.collection('users')
        const query = {gender_identity: {$eq: gender}}
        const foundUsers = await users.find(query).toArray()
        console.log(console.log('Users Sent:',foundUsers))
        res.send(foundUsers)
    } catch(err){
        console.log(err)
    }
})

app.post('/tinder/users',(req,res) => {
    const dbCard= req.body;
    Users.create(dbCard,(err, data) => {
        if (err){
            console.log("Database Create Card Failed")
            console.log("Mongoose Database Connection State: "+ mongoose.connection.readyState)
            res.status(500).send(err)
        }else{
            console.log("Database Create Card Successful")
            console.log("Mongoose Database Connection State: "+ mongoose.connection.readyState)
            res.status(201).send(data)
        }
        })
    })

app.get('/tinder/users',(req,res) => {
    Users.find((err, data) => {
        if (err){
            console.log("Database Fetch Failed")
            console.log("Mongoose Database Connection State: "+ mongoose.connection.readyState)
            res.status(500).send(err)
        }else{
            console.log("Database Fetch Successful")
            console.log("Mongoose Database Connection State: "+ mongoose.connection.readyState)
            console.log(data)
            res.status(200).send(data)
        }
        })
})

//Listener
app.listen(port,() => console.log('listening on localhost:', {port}));