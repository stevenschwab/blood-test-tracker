const Tests = require('./tests-model');

const checkPayload = (req, res, next) => {
    next()
}

const checkTestId = async (req, res, next) => {
    const [test] = await Tests.getByTestId({ test_id: req.body.test_id })
    if (test) {
        next()
    } else {
        next({ status: 401, message: "Invalid test id" })
    }
}

module.exports = {
    checkPayload,
    checkTestId,
}