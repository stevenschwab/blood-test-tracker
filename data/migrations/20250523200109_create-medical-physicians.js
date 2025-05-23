/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('medical_physicians', medical_physicians => {
        medical_physicians.increments('medical_physician_id').primary()
        medical_physicians.text('medical_physician_name').notNullable()
        medical_physicians.text('medical_physician_address')
        medical_physicians.text('medical_physician_address_two')
        medical_physicians.text('medical_physician_city')
        medical_physicians.integer('medical_physician_state_id')
            .unsigned()
            .references('state_id')
            .inTable('states')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        medical_physicians.text('medical_physician_zip_code')
        medical_physicians.text('medical_physician_phone_number').unique()
        medical_physicians.text('medical_physician_medical_license_number').unique()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('medical_physicians');
};
