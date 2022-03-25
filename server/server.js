const PORT = 8000
const express = require('express');
const {MongoClient} = require('mongodb');
const {v1: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const e = require('express');
const uri = 'mongodb+srv://chatapp2022:chatapp2022@cluster0.g9lcn.mongodb.net/Cluster0?retryWrites=true&w=majority'


const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', function (req, res) {
    res.send('Hello from home ')

})

app.post('/signup', async (require, response) => {

    const client = new MongoClient(uri)

    const {username, email, password, number, avatarURL} = require.body
    console.log(username + email + password + number + avatarURL)

    try {
        await client.connect()
        const generatuserid = uuidv4()
        const hashedpassword = await bcrypt.hash(password, 10)


        const database = client.db('app-data')
        const users = database.collection('users')

        const exist = users.findOne({email})

        const sanitizedemail = email.toLowerCase()

        const data = {
            user_id: generatuserid,
            email: sanitizedemail,
            hashed_password: hashedpassword,
            user_name: username,
            number_id: number,
            avatarURL_id: avatarURL


        }

        const inertedUser = await users.insertOne(data)

        const Token = jwt.sign(inertedUser, sanitizedemail, {
            expiresIn: 60 * 24,
        })

        response.status(200).json({Token, userId: generatuserid, email: sanitizedemail})


    } catch (err) {
        console.log(err)
    }


})

 app.post('/login', async (require, response) => {

    const client = new MongoClient(uri)

    try {
        const { email, password} = require.body
        await client.connect()
        console.log(email +password)

        const database = client.db('app-data')
        const users = database.collection('users')

        const  user = await  users.findOne({email})
      
    
       
        const  correctPassword = await  bcrypt.compare(password, user.hashed_password)
        console.log( correctPassword)

        if(!correctPassword){
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }

        if (user && correctPassword) {

            const Token = jwt.sign(user, email, {
                expiresIn: 60 * 24,
            })

            response.status(201).json({Token, userId : user , email})
        }
       
        
       
        response.status(401).send('Invalid Password')
       
        console.log('Invalid Password')

    }catch(error){
        error
     }
    
})
 
app.post('/log', async (req, res, next) => {
    const client = new MongoClient(uri)
    await client.connect()
  
    const database =  client.db('app-data')
    const User =  database.collection('users')

    try {

      const { email, password } = req.body;
      console.log(email +password)
      const user = await User.findOne({ email });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  })

 app.get('/logOut',async  = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  })

app.get('/user', async (req, res) => {

    const client = new MongoClient(uri)


    try {
        await client.connect()
        

        const database = client.db('app-data')
        const users = database.collection('users')

        const returnusers = await users.find().toArray()
        res.send(returnusers)



    } finally {
        await client.close()
    }

})

app.listen(PORT, () => console.log('Server running on port ' + PORT))
