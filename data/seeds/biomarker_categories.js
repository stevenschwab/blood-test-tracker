/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('biomarker_categories').del()

  await knex('biomarker_categories').insert([
    { category_name: 'Complete Blood Count', category_key: 'completeBloodCount' },
    { category_name: 'Automated Differential', category_key: 'automatedDifferential' },
    { category_name: 'General Chemistry', category_key: 'generalChemistry' },
    { category_name: 'Hepatic Function Panel', category_key: 'hepaticFunctionPanel' },
    { category_name: 'Lipid Panel', category_key: 'lipidPanel' },
    { category_name: 'Iron and TIBC', category_key: 'ironAndTIBC' },
    { category_name: 'Thyroid Testing', category_key: 'thyroidTesting' },
    { category_name: 'Tumor Markers', category_key: 'tumorMarkers' },
    { category_name: 'Endocrine Evaluation', category_key: 'endocrineEvaluation' },
    { category_name: 'Coronary Risk', category_key: 'coronaryRisk' },
    { category_name: 'C-Reactive Protein, Cardiac', category_key: 'cReactiveProteinCardiac' },
    { category_name: 'Thyroid Cascade Profile', category_key: 'thyroidCascadeProfile' },
    { category_name: 'Hemoglobin A1c', category_key: 'hemoglobinA1c' },
    { category_name: 'Microscopic Examination', category_key: 'microscopicExamination' },
    { category_name: 'UA/M w/rflx Culture, Routine', category_key: 'uA/MW/rflxCultureRoutine' },
    { category_name: 'Complete. Metabolic Panel', category_key: 'completeMetabolicPanel' },
    { category_name: 'CBC With Differential/Platelet', category_key: 'cBCWithDifferentialPlatelet' },
    { category_name: 'Lamotrigine (Lamictal), Serum', category_key: 'lamotrigine(Lamictal)Serum' },
    { category_name: 'Ferritin', category_key: 'ferritin' }
  ]);
};
