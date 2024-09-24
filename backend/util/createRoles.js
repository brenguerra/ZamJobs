const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const findOrCreateRole = async (name) => {
  return await Role.exists({name:name}) ? await Role.findOne({name:name}) : await Role.create({
    name: name,
    permissions: `${name}Permissions`
  });
}


const findOrCreateAdmin  = async () => {
  const adminRole =  await findOrCreateRole('admin');
  const admin = await User.findOne({role:adminRole._id});
  if(!admin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
    const newAdmin = await User.create({
      email: process.env.ADMIN_EMAIL,
      firstname: process.env.ADMIN_NAME,
      lastname: process.env.ADMIN_LASTNAME,
      phone: process.env.ADMIN_PHONE_NUMBER,
      password: hashedPassword,
      role: adminRole._id,
      address: 'Zamboanga City',
      status:'admin'
    })
    return newAdmin;
  }
  return admin;
}
module.exports = {
  findOrCreateRole,
  findOrCreateAdmin
}