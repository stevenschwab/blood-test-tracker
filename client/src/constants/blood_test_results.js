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
        blood_test_results.decimal(10, 2)('value')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('charts')
};
