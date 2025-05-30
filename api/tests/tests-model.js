const db = require('../../data/db-config.js');

async function getAllTestsByUserId(user_id) {
    return await db('charts as c')
        .join('blood_test_results as btr', 'c.chart_id', 'btr.chart_id')
        .join('biomarkers as b', 'btr.biomarker_id', 'b.biomarker_id')
        .join('biomarker_categories as bc', 'b.biomarker_category_id', 'bc.category_id')
        .select('b.biomarker_blood_key', 'btr.value', 'btr.lab_id')
        .where('c.user_id', user_id)
}

async function getByTestId(test_id) {
    return await db('labs as l')
        .join('biomarkers as b', 'l.biomarker_id', '')
        .select('*')
        .where('lab_id', test_id)
}

async function create(user_id, request_body) {
    return await db('test_results')
        .insert({
            user_id,
            ...request_body
        })
        .returning('*')
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