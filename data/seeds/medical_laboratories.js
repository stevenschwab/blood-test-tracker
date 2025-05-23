/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('medical_laboratories').del()
  await knex('medical_laboratories').insert([
    { 
      medical_lab_name: 'Access Medical Labs', 
      medical_lab_address: '5151 Corporate Way', 
      medical_lab_address_two: '', 
      medical_lab_city: 'Jupiter', 
      medical_lab_state_id: 9,
      medical_lab_zip_code: '33458-3101',
      medical_lab_phone_number: '8667208386',
      medical_director_name: 'Alan Sara, M.D.'
    },
    { 
      medical_lab_name: 'Labcorp Tampa', 
      medical_lab_address: '5610 W LaSalle Street', 
      medical_lab_address_two: '', 
      medical_lab_city: 'Tampa', 
      medical_lab_state_id: 9,
      medical_lab_zip_code: '33607-1770',
      medical_lab_phone_number: '8008775227',
      medical_director_name: 'Sean Farrier, M.D.'
    },
    { 
      medical_lab_name: 'Labcorp Burlington', 
      medical_lab_address: '1447 York Court', 
      medical_lab_address_two: '', 
      medical_lab_city: 'Burlington', 
      medical_lab_state_id: 33,
      medical_lab_zip_code: '27215-3361',
      medical_lab_phone_number: '3365848484',
      medical_director_name: 'Sanja Nagendra, M.D.'
    },
    { 
      medical_lab_name: 'Labcorp San Diego', 
      medical_lab_address: '13112 Evening Creek Dr So', 
      medical_lab_address_two: 'Ste 200', 
      medical_lab_city: 'San Diego', 
      medical_lab_state_id: 5,
      medical_lab_zip_code: '92128-4108',
      medical_lab_phone_number: '8586683700',
      medical_director_name: 'Earle Collum, Jr, M.D.'
    },
    { 
      medical_lab_name: 'Labcorp Dublin', 
      medical_lab_address: '6370 Wilcox Road', 
      medical_lab_address_two: '', 
      medical_lab_city: 'Dublin', 
      medical_lab_state_id: 35,
      medical_lab_zip_code: '43016-1269',
      medical_lab_phone_number: '8002827300',
      medical_director_name: 'Vincent Ricchiuti, Phd.'
    },
  ]);
};
