/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('blood_test_results', blood_test_results => {
        blood_test_results.increments('id').primary()
        blood_test_results.integer('chart_id')
            .unsigned()
            .notNullable()
            .references('chart_id')
            .inTable('charts')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        blood_test_results.integer('biomarker_id')
            .unsigned()
            .notNullable()
            .references('biomarker_id')
            .inTable('biomarkers')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        blood_test_results.decimal('value', 10, 2)
        blood_test_results.integer('lab_id')
            .unsigned()
            .nullable()
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
  return knex.schema
    .dropTableIfExists('blood_test_results')
};
