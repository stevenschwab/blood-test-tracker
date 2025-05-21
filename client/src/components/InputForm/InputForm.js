import React, { useState } from "react";
import axios from 'axios';
import initialTestData from '../../constants/initialTestData';
import './InputForm.css';

function InputForm({ showForm, handleShowForm, biomarkers, token, testResults, setTestResults, handleMessage, handleError }) {
    const [testData, setTestData] = useState(initialTestData);
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

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

    const postTestData = (testData) => {
        setDisabled(true);
        setIsLoading(true);
        axios.post('/api/tests', testData)
            .then(res => {
                const newTestData = res.data;
                setTestResults([...testData, newTestData]);
                setTestData(initialTestData);
                handleShowForm(false);
                handleMessage('Test data saved successfully');
            })
            .catch(handleError)
            .finally(() => {
                setDisabled(false);
                setIsLoading(false);
            })
    };

    // Submit data to backend
    const handleSubmit = (e) => {
        e.preventDefault();

        /* TODO: Make sure all required fields have data */
    
        postTestData();
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
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Test Date</label>
                            <input
                                type="date"
                                name="testDate"
                                value={testData.testDate}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Medical Lab</label>
                            <input
                                type="dropdown"
                                name="medicalLab"
                                value={testData.medicalLab}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Physician</label>
                            <input
                                type="dropdown"
                                name="physician"
                                value={testData.physician}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Fasting</label>
                            <input
                                type="dropdown"
                                name="fasting"
                                value={testData.fasting}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Account Number</label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={testData.accountNumber}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Chart Number</label>
                            <input
                                type="text"
                                name="chartNumber"
                                value={testData.chartNumber}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">First Reported On</label>
                            <input
                                type="date"
                                name="firstReportedOn"
                                value={testData.firstReportedOn}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Collection Date</label>
                            <input
                                type="date"
                                name="collectionDate"
                                value={testData.collectionDate}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Collection Time</label>
                            <input
                                type="time"
                                name="collectionTime"
                                value={testData.collectionTime}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Receival Date</label>
                            <input
                                type="date"
                                name="receivalData"
                                value={testData.receivalData}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Receival Time</label>
                            <input
                                type="time"
                                name="receivalTime"
                                value={testData.receivalTime}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Final Report Date</label>
                            <input
                                type="date"
                                name="finalReportDate"
                                value={testData.finalReportDate}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Print Date</label>
                            <input
                                type="date"
                                name="printDate"
                                value={testData.printDate}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Print Time</label>
                            <input
                                type="time"
                                name="printTime"
                                value={testData.printDate}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Report ID</label>
                            <input
                                type="integer"
                                name="reportId"
                                value={testData.reportId}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
                                required
                            />
                        </div>
                        <div className="inputFormColumn">
                            <label className="inputFormLabel">Report Status</label>
                            <input
                                type="dropdown"
                                name="reportStatus"
                                value={testData.reportStatus}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                className="inputFormInputField"
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
                                disabled={disabled}
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