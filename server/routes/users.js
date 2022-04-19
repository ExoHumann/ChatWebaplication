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

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck){
      res.status(401)
      .json({
        message: "Username already used"
      });
     
    }
    const emailCheck = await User.findOne({ email });
    if(emailCheck){
      res.status(401)
      .json({
        message: "Email already used"
      });
    }
    
    
    
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
    const token=jwt.sign(user.toJSON(),secret,{expiresIn:30});

    
    return res.json({ status: true,  userId : {_id :user._id , username : user.username  , email :user.email , avatarURL : user.avatarURL, isAvatarImageSet : user.isAvatarImageSet }})
          
   

  } catch (ex) {
  
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
          const token=jwt.sign(user.toJSON(),secret,{expiresIn:30});
        
            if (user && isPasswordValid) {

            
  
              res.status(200).json({token, userId : {_id :user._id , username : user.username  , email , avatarURL : user.avatarURL, isAvatarImageSet : user.isAvatarImageSet}})
          }
         
        }
    
    }
  })


  router.post('/setavatar/:id',getUser, async (req, res)  => {

    try {
      console.log("User exilkfjlkdsts");
    
      const userId = req.params.id;
      const avatarURL = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarURL,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarURL,
      });
    } catch (ex) {
     
    }
  })

  router.get('/getallusers/:id',getUser, async (req, res)  => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarURL",
        "_id",
      ]);
      console.log(users)
      return res.json(users);

    } catch (ex) {
    
    }
  })



router.get('/logOut/:id',getUser,async  = (req, res, next) => {
    
  
  
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
  
  /* try {
     
      
      const userlogout = onlineUsers.delete(user);

      if(!userlogout){
        res.status(401)
            .json({ message: 'can not logout'});
      }


      return res.status(200).send();
    } catch (ex) {
      next(ex);
    } */
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
router.delete('/delete/:id', getUser, async (req,res) => {
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