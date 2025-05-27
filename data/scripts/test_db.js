const Knex = require('knex');
const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: '../auth.db3',
  },
  useNullAsDefault: true,
  pool: {
        afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
        },
  },
});

async function testDb() {
  try {
    // Test database connection
    const biomarkerCategories = await knex('biomarker_categories').select('category_id', 'category_key');
    console.log(biomarkerCategories);
  } catch (error) {
    console.log(error)
  } finally {
    await knex.destroy();
  }
}

testDb();