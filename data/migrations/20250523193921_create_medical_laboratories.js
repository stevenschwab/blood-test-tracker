/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('medical_laboratories', medical_laboratories => {
        medical_laboratories.increments('medical_lab_id').primary()
        medical_laboratories.text('medical_lab_name').notNullable().unique()
        medical_laboratories.text('medical_lab_address')
        medical_laboratories.text('medical_lab_address_two')
        medical_laboratories.text('medical_lab_city')
        medical_laboratories.integer('medical_lab_state_id')
            .unsigned()
            .references('state_id')
            .inTable('states')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        medical_laboratories.text('medical_lab_zip_code')
        medical_laboratories.text('medical_lab_phone_number').unique()
        medical_laboratories.text('medical_director_name').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('medical_laboratories');
};
