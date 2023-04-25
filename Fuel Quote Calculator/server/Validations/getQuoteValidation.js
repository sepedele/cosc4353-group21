const yup = require('yup');

const userSchema = yup.object({
    user_id: yup.number().required(),
    gallons: yup.number().required(),
});

module.exports = userSchema;