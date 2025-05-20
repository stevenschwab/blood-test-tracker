import React, { useState } from "react";

function InputForm({ handleShowForm, handleInputChange, manualData, showForm, handleSubmit, testDate, handleTestDate, handleManualData, biomarkers }) {
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