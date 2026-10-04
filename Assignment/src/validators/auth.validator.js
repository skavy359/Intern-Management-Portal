function validateLogin(body) {
  const { email, password } = body;

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return { valid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Invalid email format' };
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    return { valid: false, message: 'Password is required' };
  }

  return { valid: true };
}

module.exports = { validateLogin };
