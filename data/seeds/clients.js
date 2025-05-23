/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('clients').del()
  await knex('clients').insert([
    { 
      client_name: 'One Medical Group',
      client_address: '1931 N Halsted Street',
      client_address_two: '',
      client_city: 'Chicago',
      client_state_id: 13,
      client_zip_code: '60614',
      client_phone_number: '2243243452'
    },
    { 
      client_name: 'One Medical Group',
      client_address: '4505 La Jolla Village Dr',
      client_address_two: 'Suite C-5',
      client_city: 'San Diego',
      client_state_id: 5,
      client_zip_code: '92122',
      client_phone_number: '8589883849'
    },
    { 
      client_name: 'One Medical Group',
      client_address: '19505 Biscayne Blvd',
      client_address_two: 'Suite 2180',
      client_city: 'Aventura',
      client_state_id: 9,
      client_zip_code: '33180',
      client_phone_number: '8447937588'
    },
    { 
      client_name: 'Gameday Mens Health - DEL',
      client_address: '15340 S Jog Rd',
      client_address_two: 'STE 208',
      client_city: 'Delray Beach',
      client_state_id: 9,
      client_zip_code: '33446',
      client_phone_number: '5618700616'
    }
  ]);
};
