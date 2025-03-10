import React, { useState, useEffect } from "react";
import "./patient_medical_record.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import bg from "../../assets/images/patinet_bg.avif";
import SidebarPatient from "./sidebarPatient"; // Import Sidebar

const PatientPrescription = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [activeTab, setActiveTab] = useState("prescriptions");
    const [patientInfo, setPatientInfo] = useState({
        name: "N/A",
        age: "N/A",
        gender: "N/A"
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar State

    const { email } = useAuth();

    useEffect(() => {
        // Fetch patient details
        const fetchPatientDetails = async () => {
            try {
                setPatientInfo({
                    name: "John Doe",
                    age: "34",
                    gender: "Male"
                });
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };

        // Fetch patient prescriptions
        const fetchPatientPrescriptions = async () => {
            setIsLoading(true);
            try {
                const dummyPrescriptions = [
                    {
                        id: "PRESC123456",
                        date: "2025-02-15T10:30:00Z",
                        doctorName: "Dr. Sarah Johnson",
                        doctorSpecialization: "Cardiologist",
                        diagnosis: "Hypertension with mild anxiety",
                        medications: [
                            { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days", claimStatus: "Approved", refillDate: "2025-03-15" },
                            { name: "Propranolol", dosage: "40mg", frequency: "Twice daily", duration: "30 days", claimStatus: "Pending", refillDate: "2025-03-15" }
                        ],
                        labTests: [
                            { name: "Complete Blood Count", status: "Completed", result: "Normal", date: "2025-02-16" },
                            { name: "Lipid Profile", status: "Scheduled", date: "2025-02-20" }
                        ],
                        advice: "Reduce salt intake, exercise regularly for 30 minutes at least 5 days a week. Monitor blood pressure daily.",
                        followUpDate: "2025-03-15",
                        insuranceClaim: {
                            status: "Partially Approved",
                            submissionDate: "2025-02-16",
                            claimNumber: "INS78901",
                            coverage: "80%",
                            notes: "Propranolol pending approval due to formulary restrictions."
                        }
                    },
                    {
                        id: "PRESC789012",
                        date: "2025-01-05T14:15:00Z",
                        doctorName: "Dr. Michael Chen",
                        doctorSpecialization: "Pulmonologist",
                        diagnosis: "Acute bronchitis",
                        medications: [
                            { name: "Azithromycin", dosage: "500mg", frequency: "Once daily", duration: "5 days", claimStatus: "Approved", refillDate: "N/A" },
                            { name: "Dextromethorphan", dosage: "30mg", frequency: "Every 6-8 hours as needed", duration: "7 days", claimStatus: "Over-the-counter", refillDate: "N/A" }
                        ],
                        labTests: [
                            { name: "Chest X-ray", status: "Completed", result: "No pneumonia detected", date: "2025-01-06" }
                        ],
                        advice: "Rest adequately. Increase fluid intake. Avoid smoking and second-hand smoke exposure.",
                        followUpDate: "2025-01-19",
                        insuranceClaim: {
                            status: "Approved",
                            submissionDate: "2025-01-06",
                            claimNumber: "INS65432",
                            coverage: "100%",
                            notes: "No additional documentation required."
                        }
                    }
                ];
                setPrescriptions(dummyPrescriptions);
            } catch (error) {
                console.error("Error fetching patient prescriptions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientDetails();
        fetchPatientPrescriptions();
    }, [email]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderClaimStatusBadge = (status) => {
        let badgeClass = "status-badge ";
        switch (status.toLowerCase()) {
            case "approved":
                badgeClass += "status-approved";
                break;
            case "pending":
                badgeClass += "status-pending";
                break;
            case "partially approved":
                badgeClass += "status-partially";
                break;
            case "denied":
                badgeClass += "status-denied";
                break;
            case "over-the-counter":
                badgeClass += "status-otc";
                break;
            default:
                badgeClass += "status-pending";
        }
        return <span className={badgeClass}>{status}</span>;
    };

    const renderLabStatusBadge = (status) => {
        let badgeClass = "lab-badge ";
        switch (status.toLowerCase()) {
            case "completed":
                badgeClass += "lab-completed";
                break;
            case "scheduled":
                badgeClass += "lab-scheduled";
                break;
            case "pending":
                badgeClass += "lab-pending";
                break;
            default:
                badgeClass += "lab-pending";
        }
        return <span className={badgeClass}>{status}</span>;
    };

    const handleDownloadPrescription = (prescriptionId) => {
        alert(`Downloaded prescription ${prescriptionId} as PDF`);
    };

    const handleRequestRefill = (medicationName) => {
        alert(`Refill request sent for ${medicationName}`);
    };

    return (
        <div className="patient-medical-record-container">
            {/* Sidebar */}
            <SidebarPatient isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

            <div className={`patient-home-container ${isSidebarVisible ? "sidebar-visible" : "sidebar-hidden"}`}
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: "100vh",
                }}>
                <div className="scrollable-container">
                    <div className={`patient-prescription-card ${isSidebarVisible ? "with-sidebar" : ""}`}>
                        <div className="prescription-header">
                            <div className="prescription-title">
                                <h2>My Health Records</h2>
                                <p className="prescription-date">As of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="patient-info">
                                <h3>{patientInfo.name}</h3>
                                <p>Age: {patientInfo.age} | Gender: {patientInfo.gender}</p>
                            </div>
                        </div>

                        <div className="tab-navigation">
                            <button
                                className={`tab-button ${activeTab === "prescriptions" ? "active" : ""}`}
                                onClick={() => setActiveTab("prescriptions")}
                            >
                                Prescriptions
                            </button>
                            <button
                                className={`tab-button ${activeTab === "claims" ? "active" : ""}`}
                                onClick={() => setActiveTab("claims")}
                            >
                                Insurance Claims
                            </button>
                            <button
                                className={`tab-button ${activeTab === "labtests" ? "active" : ""}`}
                                onClick={() => setActiveTab("labtests")}
                            >
                                Lab Tests
                            </button>
                        </div>

                        <div className="tab-content">
                            {isLoading ? (
                                <div style={{ padding: "20px", textAlign: "center" }}>
                                    Loading data... Please wait.
                                </div>
                            ) : (
                                <>
                                    {activeTab === "prescriptions" && (
                                        <div className="prescriptions-container">
                                            {prescriptions.length === 0 ? (
                                                <div style={{ padding: "20px", textAlign: "center" }}>
                                                    No prescriptions found. Please check your connection.
                                                </div>
                                            ) : (
                                                prescriptions.map((prescription, index) => (
                                                    <div key={index} className="prescription-item">
                                                        <div className="prescription-item-header">
                                                            <div>
                                                                <h4>Prescription #{prescription.id}</h4>
                                                                <p>Date: {formatDate(prescription.date)}</p>
                                                            </div>
                                                            <div className="prescription-actions">
                                                                <button className="download-btn" onClick={() => handleDownloadPrescription(prescription.id)}>
                                                                    Download PDF
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="prescription-doctor-info">
                                                            <p><strong>Doctor:</strong> {prescription.doctorName}</p>
                                                            <p><strong>Specialization:</strong> {prescription.doctorSpecialization}</p>
                                                        </div>
                                                        <div className="prescription-details">
                                                            <div className="prescription-section">
                                                                <h5>Diagnosis</h5>
                                                                <p>{prescription.diagnosis}</p>
                                                            </div>
                                                            <div className="prescription-section">
                                                                <h5>Medications</h5>
                                                                <div className="medication-list">
                                                                    {prescription.medications.map((med, medIndex) => (
                                                                        <div key={medIndex} className="medication-item-patient">
                                                                            <div className="medication-name-status">
                                                                                <h6>{med.name}</h6>
                                                                                {renderClaimStatusBadge(med.claimStatus)}
                                                                            </div>
                                                                            <div className="medication-details-patient">
                                                                                <p><strong>Dosage:</strong> {med.dosage}</p>
                                                                                <p><strong>Frequency:</strong> {med.frequency}</p>
                                                                                <p><strong>Duration:</strong> {med.duration}</p>
                                                                                <p><strong>Refill Date:</strong> {med.refillDate}</p>
                                                                            </div>
                                                                            {med.refillDate !== "N/A" && (
                                                                                <button className="refill-btn" onClick={() => handleRequestRefill(med.name)}>
                                                                                    Request Refill
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="prescription-section">
                                                                <h5>Additional Advice</h5>
                                                                <p>{prescription.advice}</p>
                                                            </div>
                                                            <div className="prescription-section">
                                                                <h5>Follow-up</h5>
                                                                <p>Next appointment: {formatDate(prescription.followUpDate)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                    {activeTab === "claims" && (
                                        <div className="claims-container">
                                            {prescriptions.length === 0 ? (
                                                <div style={{ padding: "20px", textAlign: "center" }}>
                                                    No claims found.
                                                </div>
                                            ) : (
                                                prescriptions.map((prescription, index) => (
                                                    <div key={index} className="claim-item">
                                                        <div className="claim-header">
                                                            <h4>Claim #{prescription.insuranceClaim.claimNumber}</h4>
                                                            {renderClaimStatusBadge(prescription.insuranceClaim.status)}
                                                        </div>
                                                        <div className="claim-details">
                                                            <p><strong>Prescription ID:</strong> {prescription.id}</p>
                                                            <p><strong>Submission Date:</strong> {formatDate(prescription.insuranceClaim.submissionDate)}</p>
                                                            <p><strong>Coverage:</strong> {prescription.insuranceClaim.coverage}</p>
                                                            <p><strong>Doctor:</strong> {prescription.doctorName} ({prescription.doctorSpecialization})</p>
                                                            <div className="claim-medications">
                                                                <h5>Medications</h5>
                                                                <ul>
                                                                    {prescription.medications.map((med, medIndex) => (
                                                                        <li key={medIndex}>
                                                                            {med.name} ({med.dosage}) - {renderClaimStatusBadge(med.claimStatus)}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div className="claim-notes">
                                                                <h5>Notes</h5>
                                                                <p>{prescription.insuranceClaim.notes}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                    {activeTab === "labtests" && (
                                        <div className="labtests-container">
                                            {prescriptions.length === 0 ? (
                                                <div style={{ padding: "20px", textAlign: "center" }}>
                                                    No lab tests found.
                                                </div>
                                            ) : (
                                                prescriptions.flatMap((prescription, prescIndex) =>
                                                    prescription.labTests.map((test, testIndex) => (
                                                        <div key={`${prescIndex}-${testIndex}`} className="lab-test-item">
                                                            <div className="lab-test-header">
                                                                <h4>{test.name}</h4>
                                                                {renderLabStatusBadge(test.status)}
                                                            </div>
                                                            <div className="lab-test-details">
                                                                <p><strong>Date:</strong> {formatDate(test.date)}</p>
                                                                <p><strong>Prescribed by:</strong> {prescription.doctorName}</p>
                                                                <p><strong>Related to:</strong> {prescription.diagnosis}</p>
                                                                {test.result && (
                                                                    <div className="lab-test-result">
                                                                        <h5>Result</h5>
                                                                        <p>{test.result}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientPrescription;