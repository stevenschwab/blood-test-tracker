const router = require('express').Router();
const Tests = require('./tests-model.js');
const { restricted } = require('../auth/auth-middleware.js');
const { checkPayload, checkTestId } = require('./tests-middleware.js');

/* Get all test results for a user */
router.get('/', restricted, (req, res, next) => {
    Tests.getTestsByUserId(req.params.user_id)
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

/* Post test results from form */
router.post('/', restricted, checkPayload, (req, res, next) => {
    Tests.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(next)
});

/* Update previously uploaded results */
router.put('/:id', restricted, checkPayload, checkTestId, (req, res, next) => {
    Tests.update(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(next)
});

/* Delete previous test */
router.delete('/:id', restricted, checkTestId, (req, res, next) => {
    Tests.removeById(req.params.user_id)
})

module.exports = router;
