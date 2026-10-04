const bcrypt = require('bcryptjs');
const internRepo = require('../repositories/intern.repository');

const SALT_ROUNDS = 10;

async function getAllInterns({ limit, offset }) {
  const interns = await internRepo.findAll({ limit, offset });
  const totalActive = await internRepo.countActive();

  return {
    interns,
    pagination: {
      limit,
      offset,
      total: totalActive,
      hasMore: offset + limit < totalActive
    }
  };
}

async function getAllInternsAdmin({ limit, offset }) {
  const interns = await internRepo.findAllIncludingDisabled({ limit, offset });
  const totalAll = await internRepo.countAll();

  return {
    interns,
    pagination: {
      limit,
      offset,
      total: totalAll,
      hasMore: offset + limit < totalAll
    }
  };
}

async function getInternById(id) {
  return internRepo.findById(id);
}

async function createIntern(data) {
  const { name, email, role, password } = data;

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  const insertId = await internRepo.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role.trim(),
    password_hash
  });

  return internRepo.findById(insertId);
}

async function updateIntern(id, data) {
  const existing = await internRepo.findById(id);
  if (!existing) {
    return null;
  }

  await internRepo.update(id, {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    role: data.role.trim()
  });

  return internRepo.findById(id);
}

async function disableIntern(id) {
  const existing = await internRepo.findById(id);
  if (!existing) {
    return { found: false, message: 'Intern not found' };
  }

  if (!existing.is_enabled) {
    return { found: true, message: 'Intern is already disabled' };
  }

  await internRepo.disable(id);
  return { found: true, message: 'Intern disabled successfully' };
}

async function enableIntern(id) {
  const existing = await internRepo.findById(id);
  if (!existing) {
    return { found: false, message: 'Intern not found' };
  }

  if (existing.is_enabled) {
    return { found: true, message: 'Intern is already active' };
  }

  await internRepo.enable(id);
  return { found: true, message: 'Intern enabled successfully' };
}

async function searchInterns(keyword, { limit, offset }) {
  const interns = await internRepo.search(keyword, { limit, offset });
  const total = await internRepo.countSearch(keyword);
  return {
    interns,
    pagination: {
      limit,
      offset,
      total,
      hasMore: offset + limit < total
    }
  };
}

async function updateProfile(id, data) {
  const existing = await internRepo.findById(id);
  if (!existing) {
    return null;
  }

  await internRepo.updateProfile(id, {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase()
  });

  return internRepo.findById(id);
}

async function changePassword(id, currentPassword, newPassword) {
  const authRepo = require('../repositories/auth.repository');
  const intern = await internRepo.findById(id);
  if (!intern) {
    return { success: false, message: 'Intern not found' };
  }

  const fullUser = await authRepo.findByEmail(intern.email);
  if (!fullUser || !fullUser.password_hash) {
    return { success: false, message: 'Cannot change password for this account' };
  }

  const isCurrentValid = await bcrypt.compare(currentPassword, fullUser.password_hash);
  if (!isCurrentValid) {
    return { success: false, message: 'Current password is incorrect' };
  }

  const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await internRepo.updatePassword(id, newHash);

  return { success: true, message: 'Password changed successfully' };
}

module.exports = {
  getAllInterns,
  getAllInternsAdmin,
  getInternById,
  createIntern,
  updateIntern,
  disableIntern,
  enableIntern,
  searchInterns,
  updateProfile,
  changePassword
};
