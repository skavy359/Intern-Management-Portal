const ALLOWED_ROLES = ['Admin', 'Backend Intern', 'Frontend Intern', 'Web Developer', 'QA Intern', 'DevOps Intern', 'UI/UX Intern', 'Data Intern'];

function validateCreateIntern(body) {
  const { name, email, role, password } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, message: 'Name is required' };
  }

  if (name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, message: 'Name must be between 2 and 100 characters' };
  }

  if (!email || typeof email !== 'string') {
    return { valid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Invalid email format' };
  }

  if (email.trim().length > 150) {
    return { valid: false, message: 'Email must not exceed 150 characters' };
  }

  if (!role || typeof role !== 'string' || role.trim().length === 0) {
    return { valid: false, message: 'Role is required' };
  }

  if (!ALLOWED_ROLES.includes(role.trim())) {
    return { valid: false, message: `Invalid role. Allowed roles: ${ALLOWED_ROLES.join(', ')}` };
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return { valid: false, message: 'Password is required and must be at least 6 characters' };
  }

  if (password.length > 128) {
    return { valid: false, message: 'Password must not exceed 128 characters' };
  }

  return { valid: true };
}

function validateUpdateIntern(body) {
  const { name, email, role } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, message: 'Name is required' };
  }

  if (name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, message: 'Name must be between 2 and 100 characters' };
  }

  if (!email || typeof email !== 'string') {
    return { valid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Invalid email format' };
  }

  if (email.trim().length > 150) {
    return { valid: false, message: 'Email must not exceed 150 characters' };
  }

  if (!role || typeof role !== 'string' || role.trim().length === 0) {
    return { valid: false, message: 'Role is required' };
  }

  if (!ALLOWED_ROLES.includes(role.trim())) {
    return { valid: false, message: `Invalid role. Allowed roles: ${ALLOWED_ROLES.join(', ')}` };
  }

  return { valid: true };
}

function validateId(params) {
  const id = Number(params.id);
  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return { valid: false, message: 'Invalid intern ID. Must be a positive integer.' };
  }
  return { valid: true };
}

function validatePagination(query) {
  const { limit, offset } = query;

  if (limit !== undefined) {
    const numLimit = Number(limit);
    if (isNaN(numLimit) || numLimit <= 0) {
      return { valid: false, message: 'Invalid limit value. Must be a positive number.' };
    }
    if (numLimit > 100) {
      return { valid: false, message: 'Limit cannot exceed 100.' };
    }
  }

  if (offset !== undefined) {
    const numOffset = Number(offset);
    if (isNaN(numOffset) || numOffset < 0) {
      return { valid: false, message: 'Invalid offset value. Must be a non-negative number.' };
    }
  }

  return { valid: true };
}

module.exports = { validateCreateIntern, validateUpdateIntern, validateId, validatePagination, ALLOWED_ROLES };
