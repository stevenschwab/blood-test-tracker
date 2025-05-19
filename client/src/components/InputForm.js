import React, { useState } from "react";

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
      { name: "Neutrophil %", key: "neutrophilPct", range: [], unit: "%", info: "Primary white blood cells fighting infection. High levels may indicate infection." },
      { name: "Lymphocyte %", key: "lymphocytePct", range: [], unit: "%", info: "Supports immune response. Abnormal levels may indicate viral infections." },
      { name: "Monocyte %", key: "monocytePct", range: [], unit: "%", info: "Fights chronic infections. High levels may indicate chronic inflammation." },
      { name: "Eosinophil %", key: "eosinophilPct", range: [], unit: "%", info: "Involved in allergic responses. High levels may indicate allergies or parasites." },
      { name: "Basophil %", key: "basophilPct", range: [], unit: "%", info: "Involved in allergic reactions. High levels are rare but may indicate inflammation." },
      { name: "Neutrophil #", key: "neutrophilNum", range: [1.4, 7.0], unit: "K/uL", info: "Absolute count of neutrophils. High levels indicate acute infection." },
      { name: "Lymphocyte #", key: "lymphocyteNum", range: [0.7, 3.1], unit: "K/uL", info: "Absolute count of lymphocytes. Low levels may indicate immune deficiency." },
      { name: "Monocyte #", key: "monocyteNum", range: [0.1, 0.9], unit: "K/uL", info: "Absolute count of monocytes. High levels may indicate chronic infection." },
      { name: "Eosinophil #", key: "eosinophilNum", range: [0.0, 0.4], unit: "K/uL", info: "Absolute count of eosinophils. High levels may indicate allergies." },
      { name: "Basophil #", key: "basophilNum", range: [0.0, 0.2], unit: "K/uL", info: "Absolute count of basophils. High levels are rare." },
      { name: "Immature Granulocytes %", key: "immatureGranulocytesPct", range: [], unit: "%", info: "Measures the percentage of immature granulocytes (early-stage neutrophils, eosinophils, or basophils) in the white blood cell count." },
      { name: "Immature Granulocytes #", key: "immatureGranulocytesNum", range: [0.0, 0.1], unit: "K/ul", info: "Absolute count of immature granulocytes. Normally, IG levels are very low." },
      { name: "NRBC", key: "nrbc", range: [], unit: "", info: "" }
    ],
    generalChemistry: [
      { name: "Glucose", key: "glucose", range: [65, 100], unit: "mg/dL", info: "Blood sugar level. High levels may indicate diabetes." },
      { name: "BUN", key: "bun", range: [6, 20], unit: "mg/dL", info: "Blood urea nitrogen measures kidney function." },
      { name: "Creatinine, serum", key: "creatinine", range: [0.7, 1.3], unit: "mg/dL", info: "Measures kidney function. High levels may indicate kidney issues." },
      { name: "BUN/Creat Ratio", key: "bunCreatRatio", range: [7.3, 21.7], unit: "", info: "Ratio of BUN to creatinine. Helps assess kidney function." },
      { name: "Sodium", key: "sodium", range: [136, 145], unit: "mmol/L", info: "Electrolyte balance. Abnormal levels may indicate dehydration or kidney issues." },
      { name: "Potassium", key: "potassium", range: [3.5, 5.1], unit: "mmol/L", info: "Electrolyte critical for heart and muscle function." },
      { name: "Chloride", key: "chloride", range: [100, 110], unit: "mmol/L", info: "Electrolyte maintaining fluid balance." },
      { name: "CO2", key: "co2", range: [20, 31], unit: "mmol/L", info: "Measures blood acidity and lung function." },
      { name: "Calcium", key: "calcium", range: [8.3, 10.6], unit: "mg/dL", info: "Critical for bones, muscles, and nerves." },
      { name: "Globulin", key: "globulin", range: [2.1, 3.6], unit: "g/dL", info: "Proteins supporting immune function." },
      { name: "Albumin/Globulin Ratio", key: "albGlobRatio", range: [0.8, 2.0], unit: "", info: "Ratio of albumin to globulin. Helps assess liver function." },
      { name: "GFR, estimated", key: "gfr", range: [60, 120], unit: "mL/min", info: "Measures kidney filtration rate." },
    ],
    hepaticFunctionPanel: [
      { name: "Protein, total", key: "totalProtein", range: [6.0, 8.5], unit: "g/dL", info: "Measures overall protein in blood." },
      { name: "Albumin", key: "albumin", range: [4.3, 5.2], unit: "g/dL", info: "Protein maintaining blood volume." },
      { name: "Bilirubin, Total", key: "totalBilirubin", range: [0.0, 1.2], unit: "mg/dL", info: "Measures liver function. High levels may indicate liver disease." },
      { name: "Bilirubin, Direct", key: "directBilirubin", range: [0.00, 0.40], unit: "mg/dL", info: "Measures liver function. High levels may indicate liver disease." },
      { name: "Alkaline Phosphatase", key: "alkPhos", range: [44, 121], unit: "IU/L", info: "Enzyme related to liver and bone health." },
      { name: "AST (SGOT)", key: "ast", range: [0, 40], unit: "IU/L", info: "Liver enzyme. High levels may indicate liver or muscle damage." },
      { name: "ALT (SGPT)", key: "alt", range: [0, 44], unit: "IU/L", info: "Liver enzyme. High levels may indicate liver damage." },
    ],
    lipidPanel: [
      { name: "Triglycerides", key: "triglycerides", range: [0, 149], unit: "mg/dL", info: "Type of fat in blood. High levels increase heart disease risk." },
      { name: "Cholesterol, Total", key: "cholesterolTotal", range: [100, 199], unit: "mg/dL", info: "Total cholesterol level. High levels increase heart disease risk." },
      { name: "HDL Cholesterol", key: "hdl", range: [39], unit: "mg/dL", info: "Good cholesterol. Higher levels reduce heart disease risk." },
      { name: "VLDL Cholesterol Cal", key: "vldl", range: [5, 40], unit: "mg/dL", info: "(Very Low-Density Lipoprotein Cholesterol, calculated) VLDL carries triglycerides and some cholesterol to tissues. It's calculated using the formula: VLDL = Triglycerides / 5 (when triglycerides are <400 mg/dL). High VLDL levels are associated with increased cardiovascular risk." },
      { name: "LDL Cholesterol, calc.", key: "ldl", range: [0, 99], unit: "mg/dL", info: "Bad cholesterol. High levels increase heart disease risk." },
      { name: "Chol/HDL Ratio", key: "cholHDLRatio", range: [0, 5], unit: "", info: "The higher the ratio, the higher CHD risk." }
    ],
    ironAndTIBC: [
      { name: "Iron Bind.Cap.(TIBC)", key: "ironBindCapTIBC", range: [250, 450], unit: "ug/dL", info: "(Total Iron-Binding Capacity) Measures the blood's ability to bind and transport iron, primarily via transferrin, a protein that carries iron. High TIBC often indicates iron deficiency (e.g. anemia), while low TIBC may suggest iron overload (e.g. hemochromatosis) or conditions like liver disease." },
      { name: "UIBC", key: "uibc", range: [111, 343], unit: "ug/dL", info: "(Unsaturated Iron-Binding Capacity) measures the portion of transferrin (an iron-transporting protein) that is not bound to iron, indicating the blood's remaining capacity to bind iron." },
      { name: "Iron", key: "iron", range: [38, 169], unit: "ug/dL", info: "Iron is an essential mineral critical for several bodily functions: oxygen transport, energy production, enzyme function, and brain and immune health." },
      { name: "Iron Saturation", key: "ironSaturation", range: [15, 55], unit: "%", info: "Measures the percentage of transferrin (the protein that transports iron in the blood) that is bound to iron. It's calculated using the formula: Iron Saturation (%) = (Serum Iron / TIBC) * 100" },
    ],
    thyroidTesting: [
      { name: "TSH", key: "tsh", range: [0.550, 4.780], unit: "uIU/mL", info: "Thyroid-stimulating hormone. Abnormal levels may indicate thyroid dysfunction." },
    ],
    tumorMarkers: [
      { name: "PSA, Total", key: "psa", range: [0.000, 4.000], unit: "ng/mL", info: "Prostate-specific antigen. High levels may indicate prostate issues." },
    ],
    endocrineEvaluation: [
      { name: "FSH", key: "fsh", range: [1.4, 18.1], unit: "mIU/mL", info: "Follicle-stimulating hormone. Regulates reproductive processes." },
      { name: "LH", key: "lh", range: [1.5, 9.3], unit: "mIU/mL", info: "Luteinizing hormone. Regulates reproductive processes." },
      { name: "Prolactin", key: "prolactin", range: [2.1, 17.7], unit: "ng/mL", info: "Hormone affecting reproduction and lactation." },
      { name: "Estradiol (E2)", key: "estradiol", range: [11.8, 39.9], unit: "pg/mL", info: "Primary female sex hormone. Affects reproductive and bone health." },
      { name: "Testosterone, Total", key: "testosteroneTotal", range: [280, 1100], unit: "ng/dL", info: "Primary male sex hormone. Affects muscle, bone, and sex drive." },
      { name: "Sex Hormone Bind Globulin", key: "shbg", range: [15, 95], unit: "nmol/L", info: "Binds sex hormones. Affects hormone availability." },
      { name: "Testosterone, Free", key: "testosteroneFree", range: [4.3, 24.0], unit: "ng/dL", info: "Unbound testosterone. Affects male characteristics." },
    ],
};

function InputForm({ handleShowForm, handleInputChange, manualData, showForm, handleSubmit, testDate, handleTestDate, handleManualData }) {
    // Function to format test category name
    const formatCategoryName = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (char) => char.toUpperCase())
            .trim();
    };

    // Render biomarker input fields
    const renderInputs = (section, items) => {
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{formatCategoryName(section)}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(({ name, key, unit }) => (
                    <div key={key} className="flex flex-col">
                        <label className="text-sm font-medium">{name} ({unit})</label>
                        <input
                            type="number"
                            step="0.1"
                            value={manualData[section]?.[key] || ""}
                            onChange={(e) => handleInputChange(section, key, e.target.value)}
                            className="border rounded p-2"
                            placeholder="Enter value"
                        />
                    </div>
                ))}
            </div>
        </div>
    };

    return (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Add New Blood Test</h3>
                <button
                    onClick={() => handleShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    {showForm ? 'Cancel' : 'Enter Manually'}
                </button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Test Date</label>
                        <input
                            type="date"
                            value={testDate}
                            onChange={(e) => handleTestDate(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {Object.entries(biomarkers).map(([section, items]) => (
                        <div key={section}>{renderInputs(section, items)}</div>
                    ))}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => {
                                handleShowForm(false);
                                handleManualData({});
                                handleTestDate('');
                            }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Save Test
                        </button>
                    </div>
                </form>
            )}
        </section>
    )
}

export default InputForm;