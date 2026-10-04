const express = require('express');
const router = express.Router();
const internController = require('../controllers/intern.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorization.middleware');
const validate = require('../middleware/validate.middleware');
const {
  validateCreateIntern,
  validateUpdateIntern,
  validateId,
  validatePagination
} = require('../validators/intern.validator');

const validateIdParam = (body, params) => validateId(params);
const validatePaginationQuery = (body, params, query) => validatePagination(query);

router.get('/health', internController.checkHealth);

router.use(authenticate);

router.get('/search', validate(validatePaginationQuery), internController.searchInterns);

router.put('/profile', internController.updateProfile);
router.put('/change-password', internController.changePassword);

router.get('/', validate(validatePaginationQuery), internController.getAllInterns);

router.get('/:id', validate(validateIdParam), internController.getInternById);

router.post('/', authorize('Admin'), validate(validateCreateIntern), internController.createIntern);
router.put('/:id', authorize('Admin'), validate(validateIdParam), validate(validateUpdateIntern), internController.updateIntern);
router.delete('/:id', authorize('Admin'), validate(validateIdParam), internController.disableIntern);
router.patch('/:id/enable', authorize('Admin'), validate(validateIdParam), internController.enableIntern);

module.exports = router;
