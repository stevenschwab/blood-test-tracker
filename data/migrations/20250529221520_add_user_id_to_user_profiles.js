/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('user_profiles_temp', table => {
    table.increments('user_profile_id').primary();
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.text('phone_number');
    table.date('date_of_birth');
    table.string('sex', 10);
    table.string('address_1');
    table.string('address_2');
    table.string('city');
    table.integer('state_id')
        .unsigned()
        .references('state_id')
        .inTable('states')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    table.text('zipcode');
  });

  await knex('user_profiles_temp').insert(
    await knex('user_profiles')
        .select(
            'user_profile_id', 
            'first_name', 
            'last_name', 
            'phone_number', 
            'date_of_birth',
            'sex',
            'address_1',
            'address_2',
            'city',
            'state_id',
            'zipcode'
        )
  );

  await knex.schema.dropTable('user_profiles');

  await knex.schema.createTable('user_profiles', table => {
    table.increments('user_profile_id').primary();
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.text('phone_number');
    table.date('date_of_birth');
    table.string('sex', 10);
    table.string('address_1');
    table.string('address_2');
    table.string('city');
    table.integer('state_id')
        .unsigned()
        .references('state_id')
        .inTable('states')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    table.text('zipcode');
    table.integer('user_id')
        .unsigned()
        .unique()
        .references('user_id')
        .inTable('users')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
  });

  await knex('user_profiles').insert(
    await knex('user_profiles_temp')
        .select(
            'user_profile_id', 
            'first_name', 
            'last_name', 
            'phone_number', 
            'date_of_birth',
            'sex',
            'address_1',
            'address_2',
            'city',
            'state_id',
            'zipcode'
        )
  );

  await knex.schema.dropTable('user_profiles_temp');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.createTable('user_profiles_temp', table => {
    table.increments('user_profile_id').primary();
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.text('phone_number');
    table.date('date_of_birth');
    table.string('sex', 10);
    table.string('address_1');
    table.string('address_2');
    table.string('city');
    table.integer('state_id')
        .unsigned()
        .references('state_id')
        .inTable('states')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    table.text('zipcode');
  });

  await knex('user_profiles_temp').insert(
    await knex('user_profiles')
        .select(
            'user_profile_id', 
            'first_name', 
            'last_name', 
            'phone_number', 
            'date_of_birth',
            'sex',
            'address_1',
            'address_2',
            'city',
            'state_id',
            'zipcode'
        )
  );

  await knex.schema.dropTable('user_profiles');

  await knex.schema.createTable('user_profiles', table => {
    table.increments('user_profile_id').primary();
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.text('phone_number');
    table.date('date_of_birth');
    table.string('sex', 10);
    table.string('address_1');
    table.string('address_2');
    table.string('city');
    table.integer('state_id')
        .unsigned()
        .references('state_id')
        .inTable('states')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    table.text('zipcode');
  });

  await knex('user_profiles').insert(
    await knex('user_profiles_temp')
        .select(
            'user_profile_id', 
            'first_name', 
            'last_name', 
            'phone_number', 
            'date_of_birth',
            'sex',
            'address_1',
            'address_2',
            'city',
            'state_id',
            'zipcode'
        )
  );

  await knex.schema.dropTable('user_profiles_temp');
};
