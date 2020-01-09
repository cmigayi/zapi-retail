const { check, validationResult } = require('express-validator');

checkNameInput = check('name')
   .isAlpha()
   .withMessage('Must be only alphabetical characters')
   .isLength({ min: 2 })
   .withMessage('Must be atleast 2 characters long');

exports.checkNameInput = checkNameInput;
