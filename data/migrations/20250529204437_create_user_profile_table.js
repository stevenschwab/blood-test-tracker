/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('user_profiles', user_profiles => {
    user_profiles.increments('user_profile_id').primary();
    user_profiles.string('first_name', 100).notNullable();
    user_profiles.string('last_name', 100).notNullable();
    user_profiles.text('phone_number');
    user_profiles.date('date_of_birth');
    user_profiles.string('sex', 10);
    user_profiles.string('address_1');
    user_profiles.string('address_2');
    user_profiles.string('city');
    user_profiles.integer('state_id')
        .unsigned()
        .references('state_id')
        .inTable('states')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    user_profiles.text('zipcode');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('user_profiles');
};
