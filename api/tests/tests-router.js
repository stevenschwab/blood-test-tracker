const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../secrets");
const router = require('express').Router();
const Tests = require('./tests-model.js');
const { restricted } = require('../auth/auth-middleware.js');
const { checkTestsPayload, checkReportId } = require('./tests-middleware.js');

/* Get all test results for a user: http get :9000/api/tests */
router.get('/', restricted, (req, res, next) => {
    const { user_id } = req.decodedJwt;

    Tests.getAllTestsByUserId(user_id)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json({ message: "No test results found" })
            }
        })
        .catch(next);
});

/* Post test results from form */
router.post('/', restricted, checkTestsPayload, (req, res, next) => {
    Tests.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(next)
});

/* Update previously uploaded results */
router.put('/:report_id', restricted, checkTestsPayload, checkReportId, (req, res, next) => {
    Tests.update(req.params.report_id, req.body)
        .then(data => {
            res.json(data);
        })
        .catch(next)
});

/* Delete previous whole lab test: http delete :9000/api/tests/7 */
router.delete('/:report_id', restricted, checkReportId, (req, res, next) => {
    Tests.removeById(req.params.report_id)
        .then(data => {
            res.json(data);
        })
        .catch(next)
})

module.exports = router;
