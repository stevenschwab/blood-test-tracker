const db = require('../../data/db-config.js');

async function getAllTestsByUserId(user_id) {
    return await db('blood_test_results as btr')
        .join('biomarkers as b', 'btr.biomarker_id', 'b.biomarker_id')
        .select('*')
        .where('btr.user_id', user_id)
}

async function getByTestId(test_id) {
    return await db('labs as l')
        .join('biomarkers as b', 'l.biomarker_id', '')
        .select('*')
        .where('lab_id', test_id)
}

async function create() {
    return 'create test'
}

async function update() {
    return 'update test'
}

async function removeById() {
    return 'delete test'
}

module.exports = {
    getAllTestsByUserId,
    getByTestId,
    create,
    update,
    removeById,
};