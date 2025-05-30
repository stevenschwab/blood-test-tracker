const router = require('express').Router();
const Biomarkers = require('./biomarkers-model')
const { restricted } = require('../auth/auth-middleware.js');

/* Get all biomarkers */
router.get('/', restricted, (req, res, next) => {
    Biomarkers.getAllBiomarkers()
        .then(data => {
            if (Object.keys(data).length) {
                res.json(data);
            } else {
                res.status(404).json({ message: "No biomarker data found." })
            }
        })
        .catch(next);
})

module.exports = router;