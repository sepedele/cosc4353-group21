const yup = require('yup');

const userSchema = yup.object({
    username: yup.string().required("A username is required"),
    password: yup.string().min(4).max(20).required(),
});

module.exports = userSchema;