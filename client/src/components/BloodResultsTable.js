// The form for registration and login.
import React, { useState, useEffect } from 'react';

// Reference ranges and biomarker information
const biomarkers = {
    completeBloodCount: [
      { name: "White Blood Cell", key: "wbc", range: [3.4, 10.8], unit: "K/uL", info: "Measures immune system cells fighting infection. Abnormal levels may indicate infection or immune disorders." },
      { name: "Red Blood Cell", key: "rbc", range: [4.14, 5.8], unit: "M/uL", info: "Carries oxygen in the blood. Low levels may indicate anemia; high levels may suggest dehydration." },
      { name: "Hemoglobin", key: "hemoglobin", range: [13.0, 17.7], unit: "g/dL", info: "Protein in red blood cells carrying oxygen. Low levels indicate anemia." },
      { name: "Hematocrit", key: "hematocrit", range: [37.5, 51.0], unit: "%", info: "Percentage of blood volume made up of red blood cells. Abnormal levels may indicate anemia or dehydration." },
      { name: "MCV", key: "mcv", range: [79, 97], unit: "fL", info: "Mean corpuscular volume measures red blood cell size. Helps diagnose types of anemia." },
      { name: "MCH", key: "mch", range: [26.6, 33.0], unit: "pg", info: "Mean corpuscular hemoglobin measures hemoglobin in red blood cells." },
      { name: "MCHC", key: "mchc", range: [31.5, 35.7], unit: "g/dL", info: "Mean corpuscular hemoglobin concentration. Helps diagnose anemia." },
      { name: "RDW", key: "rdw", range: [11.6, 15.4], unit: "%", info: "Red cell distribution width measures variation in red blood cell size." },
      { name: "Platelet Count", key: "plc", range: [140, 400], unit: "k/ul", info: "Measures the number of platelets (small cell fragments that help with blood clotting to stop bleeding) in your blood"},
      { name: "MPV", key: "mpv", range: [7.5, 11.6], unit: "fl", info: "Mean platelet volume measures the average size of platelets"}
    ],
    automatedDifferential: [
      { name: "Neutrophil %", key: "neutrophilPct", range: [40, 75], unit: "%", info: "Primary white blood cells fighting infection. High levels may indicate infection." },
      { name: "Lymphocyte %", key: "lymphocytePct", range: [20, 45], unit: "%", info: "Supports immune response. Abnormal levels may indicate viral infections." },
      { name: "Monocyte %", key: "monocytePct", range: [2, 12], unit: "%", info: "Fights chronic infections. High levels may indicate chronic inflammation." },
      { name: "Eosinophil %", key: "eosinophilPct", range: [0, 6], unit: "%", info: "Involved in allergic responses. High levels may indicate allergies or parasites." },
      { name: "Basophil %", key: "basophilPct", range: [0, 2], unit: "%", info: "Involved in allergic reactions. High levels are rare but may indicate inflammation." },
      { name: "Neutrophil #", key: "neutrophilNum", range: [1.8, 7.7], unit: "K/uL", info: "Absolute count of neutrophils. High levels indicate acute infection." },
      { name: "Lymphocyte #", key: "lymphocyteNum", range: [1.0, 4.8], unit: "K/uL", info: "Absolute count of lymphocytes. Low levels may indicate immune deficiency." },
      { name: "Monocyte #", key: "monocyteNum", range: [0.1, 0.9], unit: "K/uL", info: "Absolute count of monocytes. High levels may indicate chronic infection." },
      { name: "Eosinophil #", key: "eosinophilNum", range: [0.0, 0.5], unit: "K/uL", info: "Absolute count of eosinophils. High levels may indicate allergies." },
      { name: "Basophil #", key: "basophilNum", range: [0.0, 0.2], unit: "K/uL", info: "Absolute count of basophils. High levels are rare." },
    ],
    generalChemistry: [
      { name: "Glucose", key: "glucose", range: [70, 99], unit: "mg/dL", info: "Blood sugar level. High levels may indicate diabetes." },
      { name: "BUN", key: "bun", range: [7, 20], unit: "mg/dL", info: "Blood urea nitrogen measures kidney function." },
      { name: "Creatinine, serum", key: "creatinine", range: [0.6, 1.2], unit: "mg/dL", info: "Measures kidney function. High levels may indicate kidney issues." },
      { name: "BUN/Creat Ratio", key: "bunCreatRatio", range: [10, 20], unit: "", info: "Ratio of BUN to creatinine. Helps assess kidney function." },
      { name: "Sodium", key: "sodium", range: [135, 145], unit: "mmol/L", info: "Electrolyte balance. Abnormal levels may indicate dehydration or kidney issues." },
      { name: "Potassium", key: "potassium", range: [3.5, 5.0], unit: "mmol/L", info: "Electrolyte critical for heart and muscle function." },
      { name: "Chloride", key: "chloride", range: [98, 106], unit: "mmol/L", info: "Electrolyte maintaining fluid balance." },
      { name: "CO2", key: "co2", range: [23, 29], unit: "mmol/L", info: "Measures blood acidity and lung function." },
      { name: "Calcium", key: "calcium", range: [8.5, 10.2], unit: "mg/dL", info: "Critical for bones, muscles, and nerves." },
      { name: "Total Protein", key: "totalProtein", range: [6.0, 8.3], unit: "g/dL", info: "Measures overall protein in blood." },
      { name: "Albumin", key: "albumin", range: [3.5, 5.0], unit: "g/dL", info: "Protein maintaining blood volume." },
      { name: "Globulin", key: "globulin", range: [2.0, 3.5], unit: "g/dL", info: "Proteins supporting immune function." },
      { name: "Bilirubin, Total", key: "bilirubin", range: [0.1, 1.2], unit: "mg/dL", info: "Measures liver function. High levels may indicate liver disease." },
      { name: "Alkaline Phosphatase", key: "alkPhos", range: [44, 147], unit: "IU/L", info: "Enzyme related to liver and bone health." },
      { name: "ALT", key: "alt", range: [7, 56], unit: "IU/L", info: "Liver enzyme. High levels may indicate liver damage." },
      { name: "AST", key: "ast", range: [10, 40], unit: "IU/L", info: "Liver enzyme. High levels may indicate liver or muscle damage." },
      { name: "Albumin/Globulin Ratio", key: "albGlobRatio", range: [1.0, 2.1], unit: "", info: "Ratio of albumin to globulin. Helps assess liver function." },
      { name: "GFR, estimated", key: "gfr", range: [60, 120], unit: "mL/min", info: "Measures kidney filtration rate." },
    ],
    coronaryRisk: [
      { name: "Triglycerides", key: "triglycerides", range: [0, 150], unit: "mg/dL", info: "Type of fat in blood. High levels increase heart disease risk." },
      { name: "Cholesterol, Total", key: "cholesterolTotal", range: [100, 200], unit: "mg/dL", info: "Total cholesterol level. High levels increase heart disease risk." },
      { name: "HDL Cholesterol", key: "hdl", range: [40, 60], unit: "mg/dL", info: "Good cholesterol. Higher levels reduce heart disease risk." },
      { name: "LDL Cholesterol, calc.", key: "ldl", range: [0, 100], unit: "mg/dL", info: "Bad cholesterol. High levels increase heart disease risk." },
      { name: "Chol/HDL Ratio", key: "cholHdlRatio", range: [0, 5], unit: "", info: "Ratio of total cholesterol to HDL. Lower ratios reduce heart disease risk." },
    ],
    thyroidTesting: [
      { name: "TSH", key: "tsh", range: [0.4, 4.0], unit: "uIU/mL", info: "Thyroid-stimulating hormone. Abnormal levels may indicate thyroid dysfunction." },
    ],
    tumorMarkers: [
      { name: "PSA, Total", key: "psa", range: [0, 4.0], unit: "ng/mL", info: "Prostate-specific antigen. High levels may indicate prostate issues." },
    ],
    endocrineEvaluation: [
      { name: "FSH", key: "fsh", range: [1.5, 12.4], unit: "mIU/mL", info: "Follicle-stimulating hormone. Regulates reproductive processes." },
      { name: "LH", key: "lh", range: [1.7, 8.6], unit: "mIU/mL", info: "Luteinizing hormone. Regulates reproductive processes." },
      { name: "Prolactin", key: "prolactin", range: [4.0, 15.2], unit: "ng/mL", info: "Hormone affecting reproduction and lactation." },
      { name: "Estradiol (E2)", key: "estradiol", range: [7.6, 42.6], unit: "pg/mL", info: "Primary female sex hormone. Affects reproductive and bone health." },
      { name: "Testosterone, Total", key: "testosteroneTotal", range: [300, 1000], unit: "ng/dL", info: "Primary male sex hormone. Affects muscle, bone, and sex drive." },
      { name: "Sex Hormone Bind Globulin", key: "shbg", range: [16.5, 55.9], unit: "nmol/L", info: "Binds sex hormones. Affects hormone availability." },
      { name: "Testosterone, Free", key: "testosteroneFree", range: [5.0, 21.0], unit: "pg/mL", info: "Unbound testosterone. Affects male characteristics." },
    ],
};

function BloodResultsTable() {

    return (
        <div>Blood tests table goes here</div>
    )
}

export default BloodResultsTable;