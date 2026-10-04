const test = require('node:test');
const assert = require('node:assert/strict');
const {
  validateCreateIntern,
  validateUpdateIntern,
  validateId,
  validatePagination
} = require('../src/validators/intern.validator');

test('accepts valid intern creation data', () => {
  assert.deepEqual(
    validateCreateIntern({
      name: 'Test Intern',
      email: 'test@example.com',
      role: 'Backend Intern',
      password: 'secret123'
    }),
    { valid: true }
  );
});

test('rejects invalid email and role data', () => {
  assert.equal(validateCreateIntern({
    name: 'Test Intern',
    email: 'not-an-email',
    role: 'Backend Intern',
    password: 'secret123'
  }).valid, false);

  assert.equal(validateUpdateIntern({
    name: 'Test Intern',
    email: 'test@example.com',
    role: 'Unknown Role'
  }).valid, false);
});

test('rejects invalid IDs and pagination values', () => {
  assert.equal(validateId({ id: 'abc' }).valid, false);
  assert.equal(validateId({ id: '-1' }).valid, false);
  assert.equal(validatePagination({ limit: '101', offset: '0' }).valid, false);
  assert.equal(validatePagination({ limit: '10', offset: '-1' }).valid, false);
});

test('accepts bounded pagination values', () => {
  assert.deepEqual(validatePagination({ limit: '10', offset: '20' }), { valid: true });
});