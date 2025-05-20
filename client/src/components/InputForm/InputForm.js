import React from "react";
import './InputForm.css';

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
        <div className="biomarkerInputFieldContainer">
            <h3 className="biomarkerInputHeader">{formatCategoryName(section)}</h3>
            <div className="bioInputItemGrid">
                {items.map(({ name, key, unit }) => (
                    <div key={key} className="biomarkerItemContainer">
                        <label className="biomarkerItemLabel">{name} ({unit})</label>
                        <input
                            type="number"
                            step="0.1"
                            value={manualData[section]?.[key] || ""}
                            onChange={(e) => handleInputChange(section, key, e.target.value)}
                            className="biomarkerItemInput"
                            placeholder="Enter value"
                        />
                    </div>
                ))}
            </div>
        </div>
    };

    return (
        <section className="inputFormContainer">
            <div className="addNewBloodTestRow">
                <h3 className="addNewBloodTestHeader">Add New Blood Test</h3>
                <button
                    onClick={() => handleShowForm(!showForm)}
                    className="addNewBloodTestButton"
                >
                    {showForm ? 'Cancel' : 'Enter Manually'}
                </button>
            </div>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div className="inputFormDateColumn">
                        <label className="inputFormDateLabel">Test Date</label>
                        <input
                            type="date"
                            value={testDate}
                            onChange={(e) => handleTestDate(e.target.value)}
                            className="inputFormDateInputField"
                            required
                        />
                    </div>
                    {Object.entries(biomarkers).map(([section, items]) => (
                        <div key={section}>{renderInputs(section, items)}</div>
                    ))}
                    <div className="">
                        <button
                            type="button"
                            onClick={() => {
                                handleShowForm(false);
                                handleManualData({});
                                handleTestDate('');
                            }}
                            className="inputFormCancelButton"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inputFormSaveButton"
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