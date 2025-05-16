const Tests = require('./tests-model');

const checkTestsPayload = (req, res, next) => {
    next()
}

const checkReportId = async (req, res, next) => {
    const [test] = await Tests.getByTestId({ test_id: req.body.test_id })
    if (test) {
        next()
    } else {
        next({ status: 401, message: "Invalid test id" })
    }
}

module.exports = {
    checkTestsPayload,
    checkReportId,
}