const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const secret = 'mysecretsshhh';
//Get all the users
router.get('/', async (req,res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (err) {  
        //CODE 500 ERROR ON OUR SERVER
        res.status(500).json(err.message)
    }
})


// Get one user
router.get('/:id', getUser, async (req,res) => {
   res.json(res.user)
})

router.get('/myuser', getUser, async (req,res) => {
    res.json({message: 'Hello from myuser '})
 })


router.post('/register' , async (req, res, next) => {
  
  try {

    const { username, email, password ,number, avatarURL} = req.body;
    console.log(username, email, password)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      number,
      avatarURL,

    });

    console.log(email, username, password, number, avatarURL)
    delete user.password;
    return res.json({ status: true, user });

  } catch (ex) {
    next(ex);
  }
})



router.post('/Login' , async (req, res) => {

    const { email, password } = req.body;
    console.log(email,password)

    const user = await User.findOne({ email }); 
    if (user){
      console.log("User exists");
    } 
    
     if (!user) {
      res.status(401)
        .json({
          message: 'Incorrect email'
        });

    } else {

        const isPasswordValid = await bcrypt.compare(password, user.password)
      
        if (!isPasswordValid) {
          
          res.status(401)
            .json({
              message: 'Incorrect password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
            if (user && isPasswordValid) {

              const Token = jwt.sign(user, email, {
                  expiresIn: 60 * 24,
              })
  
              response.status(200).json({Token, userId : user , email})
          }
         
        }
    
    }
  })




router.get('/logOut',getUser,async  = (req, res, next) => {
    try {
     
      
      const userlogout = onlineUsers.delete(user);

      if(!userlogout){
        res.status(401)
            .json({ message: 'can not logout'});
      }


      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  })




// Create one
router.post('/signup', async (req,res) => {
    try {
        // Create Salt For Hashing
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.hashed_password, salt)

        const {username, email, password, number, avatarURL} = require.body
        console.log(username + email + password + number + avatarURL)
        //User Object
        const user = new User({
            user_id: req.body.user_id,
            email: req.body.email,
            hashed_password: hashedPassword,
            user_name: req.body.user_name,
            number_id: req.body.number_id,
            avatarURL_id: req.body.avatarURL_id, })
        const newUser = await user.save()
        
        //201 CODE CREATED SOMETHING SUCCESSFUL
        res.status(201).json(newUser)
    }
    catch (error) {
        //400 IF USER PUT IN WRONG INPUT
        res.status(400).json({message: error.message})
    }
})

// Update one
router.patch('/:id', getUser, async (req,res) => {

  if (req.body.username != null) {
      res.user.username = req.body.username
  }
  if (req.body.number_id != null) {
      res.user.number_id = req.body.number_id
  }
  if (req.body.avatarURL_id != null) {
      res.user.avatarURL_id = req.body.avatarURL
  }

  try {
      const updateUser = await res.user.save()
      res.status(200).json(updateUser)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
})

// Delete one
router.delete('/:id', getUser, async (req,res) => {
    try {
        await res.user.remove()
        res.status(204).json({message: 'User deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: 'User not found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }

    res.user = user
    next()
}

module.exports = router