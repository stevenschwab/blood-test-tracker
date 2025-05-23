/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('medical_physicians').del()
  await knex('medical_physicians').insert([
    { 
      medical_physician_name: 'Madhi Taha',
      medical_physician_address: '5130 LINTON BLVD',
      medical_physician_address_two: 'STE B4',
      medical_physician_city: 'DELRAY BEACH',
      medical_physician_state_id: 9,
      medical_physician_zip_code: '33484',
      medical_physician_phone_number: '5616218231',
      medical_physician_medical_license_number: 'OS17126'
    },
    { 
      medical_physician_name: 'Kritika Joshi',
      medical_physician_address: '19505 BISCAYNE BLVD',
      medical_physician_address_two: 'STE 2170',
      medical_physician_city: 'Aventura',
      medical_physician_state_id: 9,
      medical_physician_zip_code: '33180',
      medical_physician_phone_number: '',
      medical_physician_medical_license_number: 'OS16370'
    },
    { 
      medical_physician_name: 'Robert Hickman',
      medical_physician_address: '4545 LA JOLLA VILLAGE DR',
      medical_physician_address_two: 'STE C5',
      medical_physician_city: 'San Diego',
      medical_physician_state_id: 5,
      medical_physician_zip_code: '92122-1241',
      medical_physician_phone_number: '8886636331',
      medical_physician_medical_license_number: 'G73026'
    },{ 
      medical_physician_name: 'Katrina Gordon',
      medical_physician_address: '109 N ABERDEEN ST',
      medical_physician_address_two: '',
      medical_physician_city: 'Chicago',
      medical_physician_state_id: 13,
      medical_physician_zip_code: '60607-1668',
      medical_physician_phone_number: '3122192230',
      medical_physician_medical_license_number: 'R2346'
    },
  ]);
};
