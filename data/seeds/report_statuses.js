/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('report_statuses').del()
  await knex('report_statuses').insert([
    { report_status_name: 'Final'},
    { report_status_name: 'In Progress'},
    { report_status_name: 'Unknown'}
  ]);
};
