const router = require("express").Router();
const Tests = require("./tests-model.js");
const fs = require('fs');
const path = require('path');
const { restricted } = require("../auth/auth-middleware.js");

const dataPath = path.join(__dirname, '../data/tests.json');
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
}

const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data));

router.get('/', restricted, (req, res) => {
    const tests = readData();
    res.json(tests);
});

router.post('/', restricted, (req, res) => {
    const tests = readData()
    const newTest = { id: Date.now(), date: new Date().toISOString().split('T')[0], data: req.body };
    tests.push(newTest);
    writeData(tests);
    res.status(201).json(newTest);
})

module.exports = router;
