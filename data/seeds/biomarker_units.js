/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('biomarker_units').del()
  await knex('biomarker_units').insert([
    { units: '%' },
    { units: '/hpf' },
    { units: '/lpf' },
    { units: '10^3/µL' },
    { units: '10^6/µL' },
    { units: 'fL' },
    { units: 'g/dL' },
    { units: 'IU/L' },
    { units: 'K/µL' },
    { units: 'M/µL' },
    { units: 'mg/dL' },
    { units: 'mg/L' },
    { units: 'mIU/mL' },
    { units: 'mL/min' },
    { units: 'mL/min/1.73m^2' },
    { units: 'mmol/L' },
    { units: 'nmol/L' },
    { units: 'ng/dl' },
    { units: 'ng/mL' },
    { units: 'pg' },
    { units: 'pg/mL' },
    { units: 'pmol/L' },
    { units: 'U/L' },
    { units: 'µg/dL' },
    { units: 'µIU/mL' },
    { units: 'µmol/L' }
  ]);
};
