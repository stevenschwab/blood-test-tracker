const router = require("express").Router();
const Tests = require("./tests-model.js");
const { restricted } = require("../auth/auth-middleware.js");

router.get('/', restricted, (req, res, next) => {
    Tests.findTestsById(req.params.user_id)
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
router.put('/:id', restricted, checkPayload, checkId, (req, res, next) => {
    Tests.update(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(next)
});

/* Delete previous test */
router.delete('/:id', restricted, checkId, (req, res, next) => {
    Tests.delete()
})

module.exports = router;
