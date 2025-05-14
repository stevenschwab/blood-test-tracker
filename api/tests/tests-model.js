const db = require('../../data/db-config.js');

async function getTestsByUserId(user_id) {
    return await db('test_results as tr')
        .select('*')
        .where('user_id', user_id)
}

async function getByTestId(test_id) {
    return await db('labs as l')
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
    getTestsByUserId,
    getByTestId,
    create,
    update,
    removeById,
};