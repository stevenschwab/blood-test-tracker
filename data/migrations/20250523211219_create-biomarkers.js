/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('biomarkers', biomarkers => {
        biomarkers.increments('biomarker_id').primary()
        biomarkers.integer('biomarker_category_id')
            .unsigned()
            .notNullable()
            .references('category_id')
            .inTable('biomarker_categories')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        biomarkers.text('biomarker_name').notNullable().unique()
        biomarkers.text('biomarker_blood_key').notNullable().unique()
        biomarkers.text('biomarker_range')
        biomarkers.integer('biomarker_unit_id')
            .unsigned()
            .references('unit_id')
            .inTable('biomarker_units')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        biomarkers.text('biomarker_info')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('biomarkers')
};
