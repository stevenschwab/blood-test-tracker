/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('blood_test_results', blood_test_results => {
        blood_test_results.increments('id').primary()
        blood_test_results.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        blood_test_results.integer('medical_lab_id')
            .unsigned()
            .notNullable()
            .references('medical_lab_id')
            .inTable('medical_laboratories')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        blood_test_results.integer('physician_id')
            .unsigned()
            .notNullable()
            .references('medical_physician_id')
            .inTable('medical_physicians')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        blood_test_results.integer('fasting_id')
            .unsigned()
            .notNullable()
            .references('fasting_id')
            .inTable('fasting')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        blood_test_results.integer('account_number')
        blood_test_results.integer('chart_number')
        blood_test_results.text('first_reported_on')
        blood_test_results.date('collection_date')
        blood_test_results.time('collection_time')
        blood_test_results.date('receival_date')
        blood_test_results.time('receival_time')
        blood_test_results.date('final_report_date')
        blood_test_results.date('print_date')
        blood_test_results.time('print_time')
        blood_test_results.integer('report_id')
        blood_test_results.integer('report_status_id')
            .unsigned()
            .references('report_status_id')
            .inTable('report_statuses')
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
    .dropTableIfExists('blood_test_results')
};
