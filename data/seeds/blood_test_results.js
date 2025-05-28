/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('blood_test_results').del()
  await knex('blood_test_results').insert([
    { 
      chart_id: 4,
      biomarker_id: 1,
      value: 5.70
    },
    { 
      chart_id: 4,
      biomarker_id: 2,
      value: 5.70
    },
    { 
      chart_id: 4,
      biomarker_id: 3,
      value: 14.60
    },
    { 
      chart_id: 4,
      biomarker_id: 4,
      value: 46.70
    },
    { 
      chart_id: 4,
      biomarker_id: 5,
      value: 82.00
    },
    { 
      chart_id: 4,
      biomarker_id: 6,
      value: 25.60
    },
    { 
      chart_id: 4,
      biomarker_id: 7,
      value: 31.30
    },
    { 
      chart_id: 4,
      biomarker_id: 8,
      value: 13.00
    },
    { 
      chart_id: 4,
      biomarker_id: 9,
      value: 264.00
    },
    { 
      chart_id: 4,
      biomarker_id: 10,
      value: 10.50
    },
    { 
      chart_id: 4,
      biomarker_id: 11,
      value: 64.80
    },
    { 
      chart_id: 4,
      biomarker_id: 12,
      value: 20.50
    },
    { 
      chart_id: 4,
      biomarker_id: 13,
      value: 13.40
    },
    { 
      chart_id: 4,
      biomarker_id: 14,
      value: 0.90
    },
    { 
      chart_id: 4,
      biomarker_id: 15,
      value: 0.40
    },
    { 
      chart_id: 4,
      biomarker_id: 16,
      value: 3.7
    },
    { 
      chart_id: 4,
      biomarker_id: 17,
      value: 1.20
    },
    { 
      chart_id: 4,
      biomarker_id: 18,
      value: 0.80
    },
    { 
      chart_id: 4,
      biomarker_id: 19,
      value: 0.10
    },
    { 
      chart_id: 4,
      biomarker_id: 20,
      value: 0.00
    },
    { 
      chart_id: 4,
      biomarker_id: 24,
      value: 92.00
    },
    { 
      chart_id: 4,
      biomarker_id: 25,
      value: 10.00
    },
    { 
      chart_id: 4,
      biomarker_id: 26,
      value: 1.00
    },
    { 
      chart_id: 4,
      biomarker_id: 28,
      value: 140.00
    },
    { 
      chart_id: 4,
      biomarker_id: 29,
      value: 4.60
    },
    { 
      chart_id: 4,
      biomarker_id: 30,
      value: 104.00
    },
    { 
      chart_id: 4,
      biomarker_id: 31,
      value: 31.00
    },
    { 
      chart_id: 4,
      biomarker_id: 32,
      value: 9.30
    },
    { 
      chart_id: 4,
      biomarker_id: 36,
      value: 6.60
    },
    { 
      chart_id: 4,
      biomarker_id: 37,
      value: 4.40
    },
    { 
      chart_id: 4,
      biomarker_id: 33,
      value: 2.20
    },
    { 
      chart_id: 4,
      biomarker_id: 38,
      value: 0.50
    },
    { 
      chart_id: 4,
      biomarker_id: 40,
      value: 113.00
    },
    { 
      chart_id: 4,
      biomarker_id: 42,
      value: 46.00
    },
    { 
      chart_id: 4,
      biomarker_id: 41,
      value: 24.00
    },
    { 
      chart_id: 4,
      biomarker_id: 34,
      value: 2.00
    },
    { 
      chart_id: 4,
      biomarker_id: 35,
      value: 93.00
    },
    { 
      chart_id: 4,
      biomarker_id: 43,
      value: 64.00
    },
    { 
      chart_id: 4,
      biomarker_id: 44,
      value: 179.00
    },
    { 
      chart_id: 4,
      biomarker_id: 45,
      value: 45.00
    },
    { 
      chart_id: 4,
      biomarker_id: 47,
      value: 122.00
    },
    { 
      chart_id: 4,
      biomarker_id: 48,
      value: 4.00
    },
    { 
      chart_id: 4,
      biomarker_id: 53,
      value: 0.582
    },
    { 
      chart_id: 4,
      biomarker_id: 54,
      value: 0.270
    },
    { 
      chart_id: 4,
      biomarker_id: 55,
      value: 1.70
    },
    { 
      chart_id: 4,
      biomarker_id: 56,
      value: 3.50
    },
    { 
      chart_id: 4,
      biomarker_id: 57,
      value: 4.80
    },
    { 
      chart_id: 4,
      biomarker_id: 58,
      value: 20.40
    },
    { 
      chart_id: 4,
      biomarker_id: 59,
      value: 210.00
    },
    { 
      chart_id: 4,
      biomarker_id: 60,
      value: 18.00
    },
    { 
      chart_id: 4,
      biomarker_id: 61,
      value: 5.40
    }
  ]);
};
