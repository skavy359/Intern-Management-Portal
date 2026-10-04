const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepo = require('../repositories/auth.repository');
const env = require('../config/env');

async function login(email, password) {
  const user = await authRepo.findByEmail(email);

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  if (!user.is_enabled) {
    return { success: false, message: 'Account is disabled. Contact administrator.' };
  }

  if (!user.password_hash) {
    return { success: false, message: 'Account not set up for login. Contact administrator.' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return { success: false, message: 'Invalid email or password' };
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
}

async function getProfile(userId) {
  const user = await authRepo.findByEmail(null);
  return user;
}

module.exports = { login };
