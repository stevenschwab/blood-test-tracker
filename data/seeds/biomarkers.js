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
    biomarker_min_range: 3.40,
    biomarker_max_range: 10.80,
    biomarker_unit_id: 9,
    biomarker_info: 'Measures immune system cells fighting infection. Abnormal levels may indicate infection or immune disorders.'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'Red Blood Cell',
    biomarker_blood_key: 'rbc',
    biomarker_min_range: 4.14,
    biomarker_max_range: 5.80,
    biomarker_unit_id: 10,
    biomarker_info: 'Carries oxygen in the blood. Low levels may indicate anemia; high levels may suggest dehydration.'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'Hemoglobin',
    biomarker_blood_key: 'hemoglobin',
    biomarker_min_range: 13.00,
    biomarker_max_range: 17.70,
    biomarker_unit_id: 7,
    biomarker_info: 'Protein in red blood cells carrying oxygen. Low levels indicate anemia.'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'Hematocrit',
    biomarker_blood_key: 'hematocrit',
    biomarker_min_range: 37.50,
    biomarker_max_range: 51.00,
    biomarker_unit_id: 1,
    biomarker_info: 'Percentage of blood volume made up of red blood cells. Abnormal levels may indicate anemia or dehydration.'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'MCV',
    biomarker_blood_key: 'mcv',
    biomarker_min_range: 79.00,
    biomarker_max_range: 97.00,
    biomarker_unit_id: 6,
    biomarker_info: 'Mean corpuscular volume measures red blood cell size. Helps diagnose types of anemia.'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'MCH',
    biomarker_blood_key: 'mch',
    biomarker_min_range: 26.60,
    biomarker_max_range: 33.00,
    biomarker_unit_id: 20,
    biomarker_info: 'Mean corpuscular hemoglobin measures hemoglobin in red blood cells.'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'MCHC',
    biomarker_blood_key: 'mchc',
    biomarker_min_range: 31.50,
    biomarker_max_range: 35.70,
    biomarker_unit_id: 7,
    biomarker_info: 'Mean corpuscular hemoglobin concentration. Helps diagnose anemia.'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'RDW',
    biomarker_blood_key: 'rdw',
    biomarker_min_range: 11.60,
    biomarker_max_range: 15.40,
    biomarker_unit_id: 1,
    biomarker_info: 'Red cell distribution width measures variation in red blood cell size.'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'Platelet Count',
    biomarker_blood_key: 'plc',
    biomarker_min_range: 140.00,
    biomarker_max_range: 400.00,
    biomarker_unit_id: 9,
    biomarker_info: 'Measures the number of platelets (small cell fragments that help with blood clotting to stop bleeding) in your blood'
    },
    {
    biomarker_category_id: 1,
    biomarker_name: 'MPV',
    biomarker_blood_key: 'mpv',
    biomarker_min_range: 7.50,
    biomarker_max_range: 11.60,
    biomarker_unit_id: 6,
    biomarker_info: 'Mean platelet volume measures the average size of platelets'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Neutrophil %',
    biomarker_blood_key: 'neutrophilPct',
    biomarker_min_range: null,
    biomarker_max_range: null,
    biomarker_unit_id: 1,
    biomarker_info: 'Primary white blood cells fighting infection. High levels may indicate infection.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Lymphocyte %',
    biomarker_blood_key: 'lymphocytePct',
    biomarker_min_range: null,
    biomarker_max_range: null,
    biomarker_unit_id: 1,
    biomarker_info: 'Supports immune response. Abnormal levels may indicate viral infections.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Monocyte %',
    biomarker_blood_key: 'monocytePct',
    biomarker_min_range: null,
    biomarker_max_range: null,
    biomarker_unit_id: 1,
    biomarker_info: 'Fights chronic infections. High levels may indicate chronic inflammation.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Eosinophil %',
    biomarker_blood_key: 'eosinophilPct',
    biomarker_min_range: null,
    biomarker_max_range: null,
    biomarker_unit_id: 1,
    biomarker_info: 'Involved in allergic responses. High levels may indicate allergies or parasites.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Basophil %',
    biomarker_blood_key: 'basophilPct',
    biomarker_min_range: null,
    biomarker_max_range: null,
    biomarker_unit_id: 1,
    biomarker_info: 'Involved in allergic reactions. High levels are rare but may indicate inflammation.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Neutrophil #',
    biomarker_blood_key: 'neutrophilNum',
    biomarker_min_range: 1.40,
    biomarker_max_range: 7.00,
    biomarker_unit_id: 9,
    biomarker_info: 'Absolute count of neutrophils. High levels indicate acute infection.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Lymphocyte #',
    biomarker_blood_key: 'lymphocyteNum',
    biomarker_min_range: 0.70,
    biomarker_max_range: 3.10,
    biomarker_unit_id: 9,
    biomarker_info: 'Absolute count of lymphocytes. Low levels may indicate immune deficiency.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Monocyte #',
    biomarker_blood_key: 'monocyteNum',
    biomarker_min_range: 0.10,
    biomarker_max_range: 0.90,
    biomarker_unit_id: 9,
    biomarker_info: 'Absolute count of monocytes. High levels may indicate chronic infection.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Eosinophil #',
    biomarker_blood_key: 'eosinophilNum',
    biomarker_min_range: 0.00,
    biomarker_max_range: 0.40,
    biomarker_unit_id: 9,
    biomarker_info: 'Absolute count of eosinophils. High levels may indicate allergies.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Basophil #',
    biomarker_blood_key: 'basophilNum',
    biomarker_min_range: 0.00,
    biomarker_max_range: 0.20,
    biomarker_unit_id: 9,
    biomarker_info: 'Absolute count of basophils. High levels are rare.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Immature Granulocytes %',
    biomarker_blood_key: 'immatureGranulocytesPct',
    biomarker_min_range: null,
    biomarker_max_range: null,
    biomarker_unit_id: 1,
    biomarker_info: 'Measures the percentage of immature granulocytes (early-stage neutrophils, eosinophils, or basophils) in the white blood cell count.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'Immature Granulocytes #',
    biomarker_blood_key: 'immatureGranulocytesNum',
    biomarker_min_range: 0.00,
    biomarker_max_range: 0.10,
    biomarker_unit_id: 9,
    biomarker_info: 'Absolute count of immature granulocytes. Normally, IG levels are very low.'
    },
    {
    biomarker_category_id: 2,
    biomarker_name: 'NRBC',
    biomarker_blood_key: 'nrbc',
    biomarker_min_range: null,
    biomarker_max_range: null,
    biomarker_unit_id: null,
    biomarker_info: ''
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'Glucose',
    biomarker_blood_key: 'glucose',
    biomarker_min_range: 65.00,
    biomarker_max_range: 100.00,
    biomarker_unit_id: 11,
    biomarker_info: 'Blood sugar level. High levels may indicate diabetes.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'BUN',
    biomarker_blood_key: 'bun',
    biomarker_min_range: 6.00,
    biomarker_max_range: 20.00,
    biomarker_unit_id: 11,
    biomarker_info: 'Blood urea nitrogen measures kidney function.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'Creatinine, serum',
    biomarker_blood_key: 'creatinine',
    biomarker_min_range: 0.70,
    biomarker_max_range: 1.30,
    biomarker_unit_id: 11,
    biomarker_info: 'Measures kidney function. High levels may indicate kidney issues.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'BUN/Creat Ratio',
    biomarker_blood_key: 'bunCreatRatio',
    biomarker_min_range: 7.30,
    biomarker_max_range: 21.70,
    biomarker_unit_id: null,
    biomarker_info: 'Ratio of BUN to creatinine. Helps assess kidney function.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'Sodium',
    biomarker_blood_key: 'sodium',
    biomarker_min_range: 136.00,
    biomarker_max_range: 145.00,
    biomarker_unit_id: 16,
    biomarker_info: 'Electrolyte balance. Abnormal levels may indicate dehydration or kidney issues.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'Potassium',
    biomarker_blood_key: 'potassium',
    biomarker_min_range: 3.50,
    biomarker_max_range: 5.10,
    biomarker_unit_id: 16,
    biomarker_info: 'Electrolyte critical for heart and muscle function.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'Chloride',
    biomarker_blood_key: 'chloride',
    biomarker_min_range: 100.00,
    biomarker_max_range: 110.00,
    biomarker_unit_id: 16,
    biomarker_info: 'Electrolyte maintaining fluid balance.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'CO2',
    biomarker_blood_key: 'co2',
    biomarker_min_range: 20.00,
    biomarker_max_range: 31.00,
    biomarker_unit_id: 16,
    biomarker_info: 'Measures blood acidity and lung function.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'Calcium',
    biomarker_blood_key: 'calcium',
    biomarker_min_range: 8.30,
    biomarker_max_range: 10.60,
    biomarker_unit_id: 11,
    biomarker_info: 'Critical for bones, muscles, and nerves.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'Globulin',
    biomarker_blood_key: 'globulin',
    biomarker_min_range: 2.10,
    biomarker_max_range: 3.60,
    biomarker_unit_id: 7,
    biomarker_info: 'Proteins supporting immune function.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'Albumin/Globulin Ratio',
    biomarker_blood_key: 'albGlobRatio',
    biomarker_min_range: 0.80,
    biomarker_max_range: 2.00,
    biomarker_unit_id: null,
    biomarker_info: 'Ratio of albumin to globulin. Helps assess liver function.'
    },
    {
    biomarker_category_id: 3,
    biomarker_name: 'GFR, estimated',
    biomarker_blood_key: 'gfr',
    biomarker_min_range: 60.00,
    biomarker_max_range: 120.00,
    biomarker_unit_id: 14,
    biomarker_info: 'Measures kidney filtration rate.'
    },
    {
    biomarker_category_id: 4,
    biomarker_name: 'Protein, total',
    biomarker_blood_key: 'totalProtein',
    biomarker_min_range: 6.00,
    biomarker_max_range: 8.50,
    biomarker_unit_id: 7,
    biomarker_info: 'Measures overall protein in blood.'
    },
    {
    biomarker_category_id: 4,
    biomarker_name: 'Albumin',
    biomarker_blood_key: 'albumin',
    biomarker_min_range: 4.30,
    biomarker_max_range: 5.20,
    biomarker_unit_id: 7,
    biomarker_info: 'Protein maintaining blood volume.'
    },
    {
    biomarker_category_id: 4,
    biomarker_name: 'Bilirubin, Total',
    biomarker_blood_key: 'totalBilirubin',
    biomarker_min_range: 0.00,
    biomarker_max_range: 1.20,
    biomarker_unit_id: 11,
    biomarker_info: 'Measures liver function. High levels may indicate liver disease.'
    },
    {
    biomarker_category_id: 4,
    biomarker_name: 'Bilirubin, Direct',
    biomarker_blood_key: 'directBilirubin',
    biomarker_min_range: 0.00,
    biomarker_max_range: 0.40,
    biomarker_unit_id: 11,
    biomarker_info: 'Measures liver function. High levels may indicate liver disease.'
    },
    {
    biomarker_category_id: 4,
    biomarker_name: 'Alkaline Phosphatase',
    biomarker_blood_key: 'alkPhos',
    biomarker_min_range: 44.00,
    biomarker_max_range: 121.00,
    biomarker_unit_id: 8,
    biomarker_info: 'Enzyme related to liver and bone health.'
    },
    {
    biomarker_category_id: 4,
    biomarker_name: 'AST (SGOT)',
    biomarker_blood_key: 'ast',
    biomarker_min_range: 0.00,
    biomarker_max_range: 40.00,
    biomarker_unit_id: 8,
    biomarker_info: 'Liver enzyme. High levels may indicate liver or muscle damage.'
    },
    {
    biomarker_category_id: 4,
    biomarker_name: 'ALT (SGPT)',
    biomarker_blood_key: 'alt',
    biomarker_min_range: 0.00,
    biomarker_max_range: 44.00,
    biomarker_unit_id: 8,
    biomarker_info: 'Liver enzyme. High levels may indicate liver damage.'
    },
    {
    biomarker_category_id: 5,
    biomarker_name: 'Triglycerides',
    biomarker_blood_key: 'triglycerides',
    biomarker_min_range: 0.00,
    biomarker_max_range: 149.00,
    biomarker_unit_id: 11,
    biomarker_info: 'Type of fat in blood. High levels increase heart disease risk.'
    },
    {
    biomarker_category_id: 5,
    biomarker_name: 'Cholesterol, Total',
    biomarker_blood_key: 'cholesterolTotal',
    biomarker_min_range: 100.00,
    biomarker_max_range: 199.00,
    biomarker_unit_id: 11,
    biomarker_info: 'Total cholesterol level. High levels increase heart disease risk.'
    },
    {
    biomarker_category_id: 5,
    biomarker_name: 'HDL Cholesterol',
    biomarker_blood_key: 'hdl',
    biomarker_min_range: 39.00,
    biomarker_max_range: null,
    biomarker_unit_id: 11,
    biomarker_info: 'Good cholesterol. Higher levels reduce heart disease risk.'
    },
    {
    biomarker_category_id: 5,
    biomarker_name: 'VLDL Cholesterol Cal',
    biomarker_blood_key: 'vldl',
    biomarker_min_range: 5.00,
    biomarker_max_range: 40.00,
    biomarker_unit_id: 11,
    biomarker_info: '(Very Low-Density Lipoprotein Cholesterol, calculated) VLDL carries triglycerides and some cholesterol to tissues. It\'s calculated using the formula: VLDL = Triglycerides / 5 (when triglycerides are <400 mg/dL). High VLDL levels are associated with increased cardiovascular risk.'
    },
    {
    biomarker_category_id: 5,
    biomarker_name: 'LDL Cholesterol, calc.',
    biomarker_blood_key: 'ldl',
    biomarker_min_range: 0.00,
    biomarker_max_range: 99.00,
    biomarker_unit_id: 11,
    biomarker_info: 'Bad cholesterol. High levels increase heart disease risk.'
    },
    {
    biomarker_category_id: 5,
    biomarker_name: 'Chol/HDL Ratio',
    biomarker_blood_key: 'cholHDLRatio',
    biomarker_min_range: 0.00,
    biomarker_max_range: 5.00,
    biomarker_unit_id: null,
    biomarker_info: 'The higher the ratio, the higher CHD risk.'
    },
    {
    biomarker_category_id: 6,
    biomarker_name: 'Iron Bind.Cap.(TIBC)',
    biomarker_blood_key: 'ironBindCapTIBC',
    biomarker_min_range: 250.00,
    biomarker_max_range: 450.00,
    biomarker_unit_id: 24,
    biomarker_info: '(Total Iron-Binding Capacity) Measures the blood\'s ability to bind and transport iron, primarily via transferrin, a protein that carries iron. High TIBC often indicates iron deficiency (e.g. anemia), while low TIBC may suggest iron overload (e.g. hemochromatosis) or conditions like liver disease.'
    },
    {
    biomarker_category_id: 6,
    biomarker_name: 'UIBC',
    biomarker_blood_key: 'uibc',
    biomarker_min_range: 111.00,
    biomarker_max_range: 343.00,
    biomarker_unit_id: 24,
    biomarker_info: '(Unsaturated Iron-Binding Capacity) measures the portion of transferrin (an iron-transporting protein) that is not bound to iron, indicating the blood\'s remaining capacity to bind iron.'
    },
    {
    biomarker_category_id: 6,
    biomarker_name: 'Iron',
    biomarker_blood_key: 'iron',
    biomarker_min_range: 38.00,
    biomarker_max_range: 169.00,
    biomarker_unit_id: 24,
    biomarker_info: 'Iron is an essential mineral critical for several bodily functions: oxygen transport, energy production, enzyme function, and brain and immune health.'
    },
    {
    biomarker_category_id: 6,
    biomarker_name: 'Iron Saturation',
    biomarker_blood_key: 'ironSaturation',
    biomarker_min_range: 15.00,
    biomarker_max_range: 55.00,
    biomarker_unit_id: 1,
    biomarker_info: 'Measures the percentage of transferrin (the protein that transports iron in the blood) that is bound to iron. It\'s calculated using the formula: Iron Saturation (%) = (Serum Iron / TIBC) * 100'
    },
    {
    biomarker_category_id: 7,
    biomarker_name: 'TSH',
    biomarker_blood_key: 'tsh',
    biomarker_min_range: 0.55,
    biomarker_max_range: 4.78,
    biomarker_unit_id: 25,
    biomarker_info: 'Thyroid-stimulating hormone. Abnormal levels may indicate thyroid dysfunction.'
    },
    {
    biomarker_category_id: 8,
    biomarker_name: 'PSA, Total',
    biomarker_blood_key: 'psa',
    biomarker_min_range: 0.00,
    biomarker_max_range: 4.00,
    biomarker_unit_id: 19,
    biomarker_info: 'Prostate-specific antigen. High levels may indicate prostate issues.'
    },
    {
    biomarker_category_id: 9,
    biomarker_name: 'FSH',
    biomarker_blood_key: 'fsh',
    biomarker_min_range: 1.40,
    biomarker_max_range: 18.10,
    biomarker_unit_id: 13,
    biomarker_info: 'Follicle-stimulating hormone. Regulates reproductive processes.'
    },
    {
    biomarker_category_id: 9,
    biomarker_name: 'LH',
    biomarker_blood_key: 'lh',
    biomarker_min_range: 1.50,
    biomarker_max_range: 9.30,
    biomarker_unit_id: 13,
    biomarker_info: 'Luteinizing hormone. Regulates reproductive processes.'
    },
    {
    biomarker_category_id: 9,
    biomarker_name: 'Prolactin',
    biomarker_blood_key: 'prolactin',
    biomarker_min_range: 2.10,
    biomarker_max_range: 17.70,
    biomarker_unit_id: 19,
    biomarker_info: 'Hormone affecting reproduction and lactation.'
    },
    {
    biomarker_category_id: 9,
    biomarker_name: 'Estradiol (E2)',
    biomarker_blood_key: 'estradiol',
    biomarker_min_range: 11.80,
    biomarker_max_range: 39.90,
    biomarker_unit_id: 21,
    biomarker_info: 'Primary female sex hormone. Affects reproductive and bone health.'
    },
    {
    biomarker_category_id: 9,
    biomarker_name: 'Testosterone, Total',
    biomarker_blood_key: 'testosteroneTotal',
    biomarker_min_range: 280.00,
    biomarker_max_range: 1100.00,
    biomarker_unit_id: 18,
    biomarker_info: 'Primary male sex hormone. Affects muscle, bone, and sex drive.'
    },
    {
    biomarker_category_id: 9,
    biomarker_name: 'Sex Hormone Bind Globulin',
    biomarker_blood_key: 'shbg',
    biomarker_min_range: 15.00,
    biomarker_max_range: 95.00,
    biomarker_unit_id: 17,
    biomarker_info: 'Binds sex hormones. Affects hormone availability.'
    },
    {
    biomarker_category_id: 9,
    biomarker_name: 'Testosterone, Free',
    biomarker_blood_key: 'testosteroneFree',
    biomarker_min_range: 4.30,
    biomarker_max_range: 24.00,
    biomarker_unit_id: 18,
    biomarker_info: 'Unbound testosterone. Affects male characteristics.'
    }
  ]);
};
