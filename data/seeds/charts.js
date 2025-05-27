/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('charts').del()
  await knex('charts').insert([
    { 
      user_id: 1,
      medical_lab_id: 5,
      physician_id: 4,
      fasting_id: 3,
      account_number: 12033100,
      chart_number: 18613942240,
      first_reported_on: '2023-07-04',
      collection_date: '2023-07-05',
      collection_time: '11:20:00',
      receival_date: '2023-07-06',
      final_report_date: '2023-07-06',
      print_date: '2023-07-06',
      print_time: '07:36:00',
      timezone: 'PDT',
      report_id: 5457236,
      report_status_id: 1
    },
    { 
      user_id: 1,
      medical_lab_id: 4,
      physician_id: 3,
      fasting_id: 3,
      account_number: 04095600,
      chart_number: 08225311920,
      first_reported_on: '2024-03-23',
      collection_date: '2024-03-22',
      collection_time: '07:41:00',
      receival_date: '2024-03-23',
      final_report_date: '2024-03-23',
      print_date: '2024-03-23',
      print_time: '09:10:00',
      timezone: 'PDT',
      report_id: 6018307,
      report_status_id: 1
    },
  ]);
};
