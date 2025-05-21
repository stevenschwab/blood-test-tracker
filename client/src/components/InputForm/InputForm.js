import React, { useState } from "react";
import initialTestData from '../../constants/initialTestData';
import './InputForm.css';

function InputForm({ showForm, handleShowForm, biomarkers, token, testResults, setTestResults, handleMessage, handleError }) {
    const [testData, setTestData] = useState(initialTestData);
    const [isLoading, setIsLoading] = useState(false);

    // Handle input change for biomarkers
    const handleInputChange = (key, value, section = null) => {
        if (section) {
            setTestData({
                ...testData,
                [section]: {
                    ...testData[section],
                    [key]: value,
                }
            });
        } else {
            setTestData({
                ...testData,
                [key]: value,
            });
        }
    };

    // Submit data to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (Object.keys(testData).length === 0) {
          alert("Please enter or upload some data.");
          return;
        }
    
        fetch('/api/tests', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ...testData }),
        })
          .then(res => res.json())
          .then(data => {
            setTestResults([...testData, data]);
            setTestData(initialTestData);
            handleShowForm(false);
            handleMessage('Test data saved successfully');
          })
          .catch(handleError)
          .finally(setIsLoading(false))
    };
    
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
                            value={testData[section]?.[key] || ""}
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
            {isLoading ? (
                <div className="inputFormLoadingMessage">Submitting test results...</div>
            ) : showForm && (
                    <form onSubmit={handleSubmit}>
                        <div className="inputFormDateColumn">
                            <label className="inputFormDateLabel">Test Date</label>
                            <input
                                type="date"
                                name="testDate"
                                value={testData.testDate}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
                                    setTestData(initialTestData);
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
                )
            }
        </section>
    )
}

export default InputForm;