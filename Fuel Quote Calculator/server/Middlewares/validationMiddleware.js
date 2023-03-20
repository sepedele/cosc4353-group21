const validation = (schema) => async (req, res, next) => {
    const body = req.body;

    try {
        await schema.validate(body);
        next();
    } 
    catch(error) {
        res.status(400).send({responseError: error.errors[0]});
    }
}

module.exports = validation;