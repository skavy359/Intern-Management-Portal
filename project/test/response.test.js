const test = require('node:test');
const assert = require('node:assert/strict');
const { successResponse, errorResponse } = require('../src/utils/response');

function responseDouble() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

test('formats successful responses consistently', () => {
  const response = responseDouble();
  successResponse(response, 200, 'OK', { value: 1 });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    success: true,
    message: 'OK',
    data: { value: 1 }
  });
});

test('formats error responses consistently', () => {
  const response = responseDouble();
  errorResponse(response, 400, 'Invalid request');
  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Invalid request'
  });
});