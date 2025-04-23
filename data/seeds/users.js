/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('roles').truncate()
  await knex('roles').insert([
    { role_name: 'admin' },
    { role_name: 'customer' },
  ])
  await knex('users').insert([
    {
      username: 'steven.schwab1@gmail.com',
      password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq',
      role_id: 1,
    },
  ])
};
