/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('charts', charts => {
        charts.increments('chart_id').primary()
        charts.integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        charts.integer('medical_lab_id')
            .unsigned()
            .notNullable()
            .references('medical_lab_id')
            .inTable('medical_laboratories')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        charts.integer('physician_id')
            .unsigned()
            .notNullable()
            .references('medical_physician_id')
            .inTable('medical_physicians')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        charts.integer('fasting_id')
            .unsigned()
            .notNullable()
            .references('fasting_id')
            .inTable('fasting')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        charts.integer('account_number')
        charts.integer('chart_number')
        charts.text('first_reported_on')
        charts.date('collection_date')
        charts.time('collection_time')
        charts.date('receival_date')
        charts.time('receival_time')
        charts.date('final_report_date')
        charts.date('print_date')
        charts.time('print_time')
        charts.integer('report_id')
        charts.integer('report_status_id')
            .unsigned()
            .references('report_status_id')
            .inTable('report_statuses')
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
    .dropTableIfExists('charts')
};
