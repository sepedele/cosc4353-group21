const yup = require('yup');

const submitSchema = yup.object({
    user_id: yup.number().required(),
    gallons: yup.number().required(),
    delivery_date: yup.string().required(),
    delivery_address: yup.string().required(),
    total: yup.number().required(),
    suggested_price: yup.number().required(),
});

module.exports = submitSchema;