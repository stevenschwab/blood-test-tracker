/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
    .createTable('biomarkers_new', biomarkers => {
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
        biomarkers.decimal('biomarker_min_range', 10, 2)
        biomarkers.decimal('biomarker_max_range', 10, 2)
        biomarkers.integer('biomarker_unit_id')
            .unsigned()
            .references('unit_id')
            .inTable('biomarker_units')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        biomarkers.text('biomarker_info')
    });

    await knex.schema.dropTable('biomarkers');

    await knex.schema.renameTable('biomarkers_new', 'biomarkers');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .createTable('biomarkers_new', biomarkers => {
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
        biomarkers.float('biomarker_min_range', 2)
        biomarkers.float('biomarker_max_range', 2)
        biomarkers.integer('biomarker_unit_id')
            .unsigned()
            .references('unit_id')
            .inTable('biomarker_units')
            .onUpdate('RESTRICT')
            .onDelete('RESTRICT')
        biomarkers.text('biomarker_info')
    });

    await knex.schema.dropTable('biomarkers');

    await knex.schema.renameTable('biomarkers_new', 'biomarkers');
};
