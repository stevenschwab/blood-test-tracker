/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('clients', clients => {
        clients.increments('client_id').primary()
        clients.text('client_name').notNullable()
        clients.text('client_address').unique()
        clients.text('client_address_two')
        clients.text('client_city')
        clients.integer('client_state_id')
            .unsigned()
            .references('state_id')
            .inTable('states')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        clients.text('client_zip_code')
        clients.text('client_phone_number').unique()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('clients');
};
