const router = require("express").Router();
const Tests = require("./tests-model.js");
const { restricted } = require("../auth/auth-middleware.js");

router.get('/', restricted, (req, res, next) => {
    const { user_id } = req.decodedJwt;
    
    Tests.findTestsById(user_id)
        .then(data => {
            res.json(data);
        })
        .catch(next);
});

module.exports = router;
