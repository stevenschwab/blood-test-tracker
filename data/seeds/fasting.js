/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('fasting').del()
  await knex('fasting').insert([
    { fasted: 'Yes' },
    { fasted: 'No' },
    { fasted: 'Unknown' }
  ]);
};
