/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.table('biomarkers', biomarkers => {
    biomarkers.float('biomarker_min_range', 2);
    biomarkers.float('biomarker_max_range', 2);
    biomarkers.dropColumn('biomarker_range');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.table('biomarkers', biomarkers => {
    biomarkers.text('biomarker_range')
    biomarkers.dropColumn('biomarker_min_range')
    biomarkers.dropColumn('biomarker_max_range')
  })
};
