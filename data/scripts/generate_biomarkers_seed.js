const { biomarkers } = require('../../client/src/constants/biomarkers.js');

const Knex = require('knex');
const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: '../auth.db3',
  },
  useNullAsDefault: true,
  pool: {
        afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
        },
  },
});

// Get biomarkerCategories table from sqllite
async function getBiomarkerCategories() {
    try {
        const biomarkerCategories = await knex('biomarker_categories')
            .select('category_id', 'category_key')
        
        if (biomarkerCategories.length === 0) {
            throw new Error('No biomarker categories found in the database');
        }

        return biomarkerCategories
    } catch (error) {
        console.log(error);
    }
}

// Get biomarkerUnit table from sqllite
async function getBiomarkerUnits() {
    try {
        const biomarkerUnits = await knex('biomarker_units')
            .select('unit_id', 'units')
        
        if (biomarkerUnits.length === 0) {
            throw new Error('No biomarker units found in the database');
        }

        return biomarkerUnits
    } catch (error) {
        console.log(error);
    }
}

// getBiomarkerUnits()

// Map biomarkers to seed data
async function generateBiomarkers() {
    try {
        const biomarkerCategories = await getBiomarkerCategories();
        //console.log(biomarkerCategories)
        const biomarkerUnits = await getBiomarkerUnits();

        const seedData = Object.entries(biomarkers).flatMap(([categoryKey, biomarkers]) => {
            const category = biomarkerCategories.find(c => c.category_key === categoryKey );

            if (!category) {
                console.warn(`Category not found: ${categoryKey}`);
                return [];
            }

            return biomarkers.map(biomarker => {
                const unit = biomarkerUnits.find(u =>
                     u.units.toLowerCase() === biomarker.unit.toLowerCase() ||
                     u.units.replace('µ', 'u').toLowerCase() === biomarker.unit.toLowerCase());

                if (!unit && biomarker.unit) {
                    console.warn(`Unit not found for ${biomarker.name}: ${biomarker.unit}`)
                }
                
                return {
                    biomarker_category_id: category.category_id,
                    biomarker_name: biomarker.name,
                    biomarker_blood_key: biomarker.key,
                    biomarker_min_range: biomarker.range.length === 2 ? biomarker.range[0] : (biomarker.range.length === 1 ? biomarker.range[0] : null),
                    biomarker_max_range: biomarker.range.length === 2 ? biomarker.range[1] : null,
                    biomarker_unit_id: unit ? unit.unit_id : null,
                    biomarker_info: biomarker.info || null,
                }
            })
        })

        seedData.forEach((item, index) => {
            console.log(`{`);
            console.log(`biomarker_category_id: ${item.biomarker_category_id},`);
            console.log(`biomarker_name: '${item.biomarker_name.replace(/'/g, "\\'")}',`); // Escape single quotes
            console.log(`biomarker_blood_key: '${item.biomarker_blood_key}',`);
            console.log(`biomarker_min_range: ${item.biomarker_min_range === null ? 'null' : item.biomarker_min_range.toFixed(2)},`);
            console.log(`biomarker_max_range: ${item.biomarker_max_range === null ? 'null' : item.biomarker_max_range.toFixed(2)},`);
            console.log(`biomarker_unit_id: ${item.biomarker_unit_id === null ? 'null' : item.biomarker_unit_id},`);
            console.log(`biomarker_info: '${item.biomarker_info ? item.biomarker_info.replace(/'/g, "\\'") : ''}'`);
            console.log(`}${index < seedData.length - 1 ? ',' : ''}`);
        });
    } catch (error) {
        console.error('Error generating seed file:', error.message);
    } finally {
        await knex.destroy()
    }
}

generateBiomarkers();