import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './BloodTestResults.css';

// Function to determine flag (High, Low, Normal)
const getFlag = (value, minRange, maxRange) => {
    if (!value) return '';
    if (maxRange === undefined) {
        if (value < minRange) return 'Low';
        return 'Normal';
    }
    if (minRange === undefined) {
        if (value > maxRange) return 'High';
        return 'Normal';
    }
    if (value < minRange) return 'Low';
    if (value > maxRange) return 'High';
    return 'Normal';
};

// Function to format reference interval
const formatReferenceInterval = (minRange, maxRange) => {
    if ((minRange === undefined && maxRange === undefined)) return 'N/A';
    if (maxRange === undefined) return `> ${minRange}`;
    return `${minRange} - ${maxRange}`;
}

// Function to format test category name
const formatCategoryName = (key) => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase())
        .trim();
};

function BloodTestResults({ results, biomarkers }) {
    return (
        <div>
            {Object.keys(biomarkers).map((category) => (
                <div key={category} className='biomarker-category'>
                    <h2>{formatCategoryName(category)}</h2>
                    <table className='results-table'>
                        <thead>
                            <tr>
                                <th className='table-header'>Tests</th>
                                <th className='table-header'>Results</th>
                                <th className='table-header'>Flag</th>
                                <th className='table-header'>Reference Interval</th>
                                <th className='table-header'>Units</th>
                                <th className='table-header'>Info</th>
                                <th className='table-header'>Lab</th>
                            </tr>
                        </thead>
                        <tbody>
                            {biomarkers[category].map((biomarker) => {
                                console.log(biomarker.biomarker_blood_key)
                                const result = results.find((r) => r.biomarker_blood_key === biomarker.biomarker_blood_key) || {};
                                console.log(result)
                                const blood_value = result.value ?? 'N/A';
                                const labId = result.lab_id ?? 'N/A';
                                const flag = blood_value !== 'N/A' ? getFlag(blood_value, biomarker.biomarker_min_range, biomarker.biomarker_max_range) : '';

                                return (
                                    <tr key={biomarker.key}>
                                        <td className='table-cell'>{biomarker.biomarker_name}</td>
                                        <td className='table-cell'>{blood_value}</td>
                                        <td className='table-cell'>{flag}</td>
                                        <td className='table-cell'>{formatReferenceInterval(biomarker.biomarker_min_range, biomarker.biomarker_max_range)}</td>
                                        <td className='table-cell'>{biomarker.units}</td>
                                        <td className='table-cell table-cell--info'>
                                            {biomarker.biomarker_info && (
                                                <span className="info-icon">
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    <span className="tooltip">
                                                        {biomarker.biomarker_info}
                                                    </span>
                                                </span>
                                            )}
                                        </td>
                                        <td className='table-cell'>{labId}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default BloodTestResults;