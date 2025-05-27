/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('biomarkers').del()
  await knex('biomarkers').insert([
    { 
      biomarker_category_id: 1,
      biomarker_name: 'White Blood Cell',
      biomarker_blood_key: 'wbc',
      biomarker_range_min: 3.4,
      biomarker_range_max: 10.8,
      biomarker_unit_id: 9,
      biomarker_info: 'Measures immune system cells fighting infection. Abnormal levels may indicate infection or immune disorders.'
    },
  ]);
};
