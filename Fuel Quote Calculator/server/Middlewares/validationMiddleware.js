const validation = (schema) => async (req, res, next) => {
    const body = req.body;

    try {
        await schema.validate(body);
        next();
    } 
    catch(error) {
        res.send({isError: true, responseError: error});
    }
}

module.exports = validation;