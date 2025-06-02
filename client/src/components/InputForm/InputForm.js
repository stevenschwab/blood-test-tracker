import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as yup from 'yup';
import initialTestData from '../../constants/initialTestData';
import './InputForm.css';

const validationErrors = {
    testDateIncorrect: 'test date must be selected',
    medicalLabIncorrect: 'medical lab must be selected',
    physicianIncorrect: 'physician must be selected',
    fastingIncorrect: 'fasting must be selected',
    reportIdIncorrect: 'report id must be added',
    reportStatusIncorrect: 'report status must be selected',
};

const formSchema = yup.object().shape({
    test_date: yup
        .string()
        .required(validationErrors.testDateIncorrect),
    medical_lab: yup
        .number()
        .required(validationErrors.medicalLabIncorrect),
    physician_name: yup
        .number()
        .required(validationErrors.physicianIncorrect),
    fasting: yup
        .number()
        .oneOf([1, 2], validationErrors.fastingIncorrect)
        .required(),
    report_id: yup
        .number()
        .required(validationErrors.reportIdIncorrect),
    report_status: yup
        .number()
        .required(validationErrors.reportStatusIncorrect)
});

const initialErrors = { test_date: '', medical_lab: '', physician_name: '', fasting: '', report_id: '', report_status: '' }

function InputForm({ showForm, handleShowForm, biomarkers, token, testResults, setTestResults, handleMessage, handleError }) {
    const [testData, setTestData] = useState(initialTestData);
    const [isLoading, setIsLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [physicians, setPhysicians] = useState([]);
    const [medicalLabs, setMedicalLabs] = useState([]);
    const [errors, setErrors] = useState(initialErrors);

    const getPhysicians = () => {
        axios.get('/api/physicians')
            .then(res => {
                setPhysicians(res.data)
            })
            .catch(handleError)
    }

    const getMedicalLabs = () => {
        axios.get('/api/medical_labs')
            .then(res => {
                setMedicalLabs(res.data)
            })
            .catch(handleError)
    }

    useEffect(() => {
        formSchema.isValid(testData).then(isValid => {
            setEnabled(isValid)
        })
    }, [testData])

    useEffect(() => {
        setIsLoading(true);
        //getPhysicians();
        //getMedicalLabs();
        setIsLoading(false);
    }, [])

    const handleInputChange = (key, value, section = null, name = null) => {
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
                [name]: value,
            });
        }
        
        yup.reach(formSchema, name)
            .validate(value)
            .then(() => { setErrors({ ...errors, [name]: ''}) })
            .catch((error) => { setErrors({ ...errors, [name]: error.errors[0] }) })
    };

    const postTestData = (testData) => {
        setEnabled(false);
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
            .finally(() => setIsLoading(false));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        /* TODO: Make sure all required fields have data */
        console.log('Sending data to server...', testData)
        postTestData();
    };
    
    const formatCategoryName = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (char) => char.toUpperCase())
            .trim();
    };

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
                            {errors.test_date && <span>{errors.test_date}</span>}
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
                            {errors.medical_lab && <span>{errors.medical_lab}</span>}
                            <label className="inputFormLabel">
                                Medical Lab <select
                                            name="medicalLab" 
                                            className="inputFormInputField" 
                                            onChange={(e) => handleInputChange(e.target.name, e.target.value)} 
                                            value={testData.medicalLab}
                                            required
                                            >
                                                <option value="">--select medical lab--</option>
                                                {medicalLabs.map(({ medical_lab_id, medical_lab_name }) => {
                                                    return <option value={medical_lab_id}>{medical_lab_name}</option>
                                                })}
                                        </select>
                            </label>
                        </div>
                        <div className="inputFormColumn">
                            {errors.physician_name && <span>{errors.physician_name}</span>}
                            <label className="inputFormLabel">
                                Physicians <select
                                            name="physician" 
                                            className="inputFormInputField" 
                                            onChange={(e) => handleInputChange(e.target.name, e.target.value)} 
                                            value={testData.physician}
                                            required
                                            >
                                                <option value="">--select physician--</option>
                                                {physicians.map(({ physician_id, physician_name }) => {
                                                    return <option value={physician_id}>{physician_name}</option>
                                                })}
                                        </select>
                            </label>
                        </div>
                        <div className="inputFormColumn">
                            {errors.fasting && <span>{errors.fasting}</span>}
                            <label className="inputFormLabel">
                                Fasting? <select
                                            name="fasting" 
                                            className="inputFormInputField" 
                                            onChange={(e) => handleInputChange(e.target.name, e.target.value)} value={testData.fasting}
                                            required
                                            >
                                                <option value="">--select fasting state--</option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                        </select>
                            </label>
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
                            {errors.report_id && <span>{errors.report_id}</span>}
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
                            {errors.report_status && <span>{errors.report_status}</span>}
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
                                disabled={!enabled}
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