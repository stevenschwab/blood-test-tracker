/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('biomarker_categories', biomarker_categories => {
        biomarker_categories.increments('category_id').primary();
        biomarker_categories.string('category_name', 100).notNullable().unique();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('biomarker_categories');
};
