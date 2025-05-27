/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('charts', charts => {
    charts.integer('medical_lab_id_2')
        .unsigned()
        .references('medical_lab_id')
        .inTable('medical_laboratories')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('charts', charts => {
    charts.dropColumn('medical_lab_id_2')
  })
};
