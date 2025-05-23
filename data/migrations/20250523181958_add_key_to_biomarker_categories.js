/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .table('biomarker_categories', biomarker_categories => {
        biomarker_categories.string('category_key', 100).notNullable().unique();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .table('biomarker_categories', biomarker_categories => {
        biomarker_categories.dropColumn('category_key');
    })
};
