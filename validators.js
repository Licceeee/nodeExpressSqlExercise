const { check } = require('express-validator')
module.exports = {
    validateFirstName: check('first_name')
        .not()
        .isEmpty()
        .withMessage("Firstname can't be empty")
        .isAlpha()
        .withMessage("Alphabet chars only")
        .isLength({ min: 2 })
        .withMessage("Min length 2 chats"),
    validateLastName: check('last_name')
        .not()
        .isEmpty()
        .withMessage("Firstname can't be empty")
        .isAlpha()
        .withMessage("Alphabet chars only")
        .isLength({ min: 2 })
        .withMessage("Min length 2 chats"),
    validateAge: check('age')
        .not()
        .isEmpty()
        .withMessage("Firstname can't be empty")
        .isNumeric()
        .withMessage("ID has to be numeric"),
    validateID: check('id')
        .isNumeric()
        .withMessage("ID has to be numeric"),
    validatePrice: check('price')
        .not()
        .isEmpty()
        .withMessage("Price can't be empty")
        .isNumeric()
        .withMessage("Price has to be numeric"),
    validateDate: check('date')
        .isDate()
        .withMessage("Date has to have format: YYYY/MM/DD"),
    validateUserID: check('user_id')
        .not()
        .isEmpty()
        .withMessage("User ID cant be empty")
        .isNumeric()
        .isDecimal()
        .withMessage("Price has to be numeric"),

}
