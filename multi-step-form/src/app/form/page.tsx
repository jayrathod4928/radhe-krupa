"use client";

import React from "react";
import './Form.css';

const validateStep = (step: number, formData: { name: any; email: any; education: any; workExperience: any; skills: any; address: any; }) => {
    switch (step) {
        case 1:
            return formData.name && formData.email;
        case 2:
            return formData.education;
        case 3:
            return formData.workExperience;
        case 4:
            return formData.skills;
        case 5:
            return formData.address;
        default:
            return true;
    }
};

const MultiStepFormPage = () => {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        education: "",
        workExperience: "",
        skills: "",
        address: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const renderStep = () => {
    switch (step) {
        case 1:
        return (
            <div>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={formData.email} onChange={handleChange} required />
                </label>
            </div>
        )
        case 2:
            return (
                <div>
                    <label>
                        Education:
                        <input type="text" name="education" value={formData.education} onChange={handleChange} required />
                    </label>
                </div>
            )
        case 3:
            return (
                <div>
                    <label>
                        Work Experience:
                        <input type="text" name="workExperience"  value={formData.workExperience} onChange={handleChange} required />
                    </label>
                </div>
            )
        case 4:
            return (
                <div>
                    <label>
                        Skills:
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
                    </label>
                </div>
            )
        case 5:
            return (
                <div>
                    <label>
                        Address:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </label>
                </div>
            )
        default:
            return null;
    }
    }

    return (
        <div className="form-container">
            <h1>Multi-Step Form</h1>
            {renderStep()}
            <div>
                {step > 1 && (
                    <button onClick={() => setStep(step - 1)}>
                        Previous
                    </button>
                )}
                {step < 5 && (
                    <button
                        onClick={() => {
                            if (validateStep(step, formData)) {
                                setStep(step + 1);
                            } else {
                                alert("Please fill in all required fields.");
                            }
                        }}
                    >
                        Next
                    </button>
                )}
                {step === 5 && (
                    <button
                        onClick={() => {
                            if (validateStep(step, formData)) {
                                alert("Form submitted!");
                            } else {
                                alert("Please fill in all required fields.");
                            }
                        }}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}
export default MultiStepFormPage;