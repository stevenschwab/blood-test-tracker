/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('biomarker_categories', biomarker_categories => {
        biomarker_categories.increments('category_id').primary()
        biomarker_categories.text('category_name').notNullable().unique()
    })
    .createTable('biomarker_units', biomarker_units => {
        biomarker_units.increments('unit_id').primary()
        biomarker_units.text('unit').notNullable().unique()
    })
    .createTable('labs', labs => {
        labs.increments('lab_id').primary()
        labs.text('lab_number').notNullable()
        labs.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        labs.text('collection_date')
        labs.text('collection_time')
        labs.text('medical_lab_id')
            .unsigned()
            .notNullable()
            .references('medical_lab_id')
            .inTable('laboratories')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
    })
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
            .notNullable()
            .references('unit_id')
            .inTable('biomarker_units')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        biomarkers.text('biomarker_info')
    })
    .createTable('test_results', blood_test_results => {
        blood_test_results.increments('result_id').primary()
        blood_test_results.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        blood_test_results.integer('biomarker_id')
            .unsigned()
            .notNullable()
            .references('biomarker_id')
            .inTable('biomarkers')
            .onDelete('CASCADE')
        blood_test_results.float('value')
        blood_test_results.text('blood_tests_results_lab_id')
            .unsigned()
            .notNullable()
            .references('lab_id')
            .inTable('labs')
            .onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('test_results')
    .dropTableIfExists('biomarkers')
    .dropTableIfExists('labs')
    .dropTableIfExists('biomarker_units')
    .dropTableIfExists('biomarker_categories')
};
