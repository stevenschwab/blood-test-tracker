const db = require('../../data/db-config.js');

async function getAllBiomarkers() {
    const ungroupedBiomarkers = await db('biomarkers as b')
        .select(
            'b.biomarker_name', 
            'b.biomarker_blood_key', 
            'b.biomarker_min_range', 
            'b.biomarker_max_range', 
            'bu.units', 
            'b.biomarker_info',
            'bc.category_key'
        )
        .leftJoin('biomarker_categories as bc', 'b.biomarker_category_id', 'bc.category_id')
        .leftJoin('biomarker_units as bu', 'b.biomarker_unit_id', 'bu.unit_id')

    if (!ungroupedBiomarkers.length) {
        return {};
    }

    const biomarkers = ungroupedBiomarkers.reduce((acc, biomarker) => {
        const category_key = biomarker.category_key || 'uncategorized';
        const { category_key: _, ...rest } = biomarker;
        if (!acc[category_key]) {
            acc[category_key] = [];
        }
        acc[category_key].push(rest);
        return acc;
    }, {})

    return biomarkers;
}

module.exports = {
    getAllBiomarkers,
};