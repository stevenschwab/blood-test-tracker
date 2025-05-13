const db = require('../../data/db-config.js');

async function findById(user_id) {
    return await db('test_results as tr')
        .select('*')
        .where('user_id', user_id)
}

module.exports = {
    findTestsById,
};