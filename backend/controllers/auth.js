const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utilRole = require('../util/createRoles');
const Profile = require('../models/UserProfile')
const registerUser = asyncHandler(async(req, res)=> {
  const {firstname, lastname, email, password, address, phone, role }  = req.body;

  if(!firstname || !lastname || !email || !password || !address || !phone || !role) {
    res.status(400)
    throw new Error('Please fill in all fields.');
  }

  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400)
    throw new Error('User already exits. Try again with a different email.')
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let userRole;
  let userProfile;
  if(role === 'worker') {
    userRole = await utilRole.findOrCreateRole('laborer');

  } else {
    userRole = await utilRole.findOrCreateRole('client');
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    phone,
    address,
    role: userRole,
  });

  if (user) {
    const token = `Bearer ` + await generateToken(user._id, firstname, lastname);
    userProfile = await Profile.create({
      user:user._id
    })
    user.profile=userProfile._id;
    await user.save();
    res.status(201).json({
      success: true,
      message: 'Successfully registered! Please log in to your account.',
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: token,
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser =  asyncHandler(async( req, res) => {
  const {email, password } = req.body

  if(!email || !password) {
    res.status(400);
    throw new Error('Enter your email and password');
  }

  const user = await User.findOne({ email }).populate({path:'role', select:'name'}).populate({path:'photos', select:'url -_id'});

  if(user && await bcrypt.compare(password, user.password)) {
    const token = "Bearer " + await generateToken(user._id, user.firstname, user.lastname);
    res.status(200).json({
      success: true,
      message: 'Login success.',
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        session: user.role.name,
        photos: user.photos[user.photos.length - 1] || null,
        token:token,
      }
    });
  } else {
    res.status(400);
    throw new Error('Wrong email or password.');
  }
})

const generateToken = async (id, firstname, lastname) => {
  return await jwt.sign({
    id,
    name: `${firstname} ${ lastname}`
  }, process.env.JWT_SECRET_DEV, {expiresIn:'30d'});
}

module.exports = {
  registerUser,
  loginUser
};