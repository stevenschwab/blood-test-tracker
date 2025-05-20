import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './BloodResultsTable.css';

// Function to determine flag (High, Low, Normal)
const getFlag = (value, range) => {
    if (!value || !range || range.length === 0) return '';
    if (range.length === 1) {
        const min = range[0];
        if (value < min) return 'Below Range';
        return 'Normal';
    }
    const [min, max] = range;
    if (value < min) return 'Below Range';
    if (value > max) return 'Above Range';
    return 'Normal';
};

// Function to format reference interval
const formatReferenceInterval = (range) => {
    if (!range || range.length === 0) return 'N/A';
    if (range.length === 1) return `> ${range[0]}`;
    return `${range[0]} - ${range[1]}`;
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
                                <th className='table-header'>Units</th>
                                <th className='table-header'>Reference Interval</th>
                                <th className='table-header'>Info</th>
                                <th className='table-header'>Lab Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {biomarkers[category].map((biomarker) => {
                                // Find the result for this biomarker (assuming results is an array of objects)
                                const result = results.find((r) => r[biomarker.key] !== undefined) || {};
                                const value = result[biomarker.key] ?? 'N/A';
                                const labNumber = result.labNumber ?? 'N/A';
                                const flag = value !== 'N/A' ? getFlag(value, biomarker.range) : '';

                                return (
                                    <tr key={biomarker.key}>
                                        <td className='table-cell'>{biomarker.name}</td>
                                        <td className='table-cell'>{value}</td>
                                        <td className='table-cell'>{flag}</td>
                                        <td className='table-cell'>{biomarker.unit}</td>
                                        <td className='table-cell'>{formatReferenceInterval(biomarker.range)}</td>
                                        <td className='table-cell table-cell--info'>
                                            {biomarker.info && (
                                                <span className="info-icon">
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    <span className="tooltip">
                                                        {biomarker.info}
                                                    </span>
                                                </span>
                                            )}
                                        </td>
                                        <td className='table-cell'>{labNumber}</td>
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