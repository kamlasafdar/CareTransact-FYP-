import React, { useState } from "react";
import { FaHourglassHalf, FaClock, FaTimes, FaCheckCircle } from "react-icons/fa";
import "./insurance.css";
import insuranceCardImage from "../../assets/images/card_front.png";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ReactCardFlip from "react-card-flip";

const InsuranceDashboard = () => {
  const [showPendingPopup, setShowPendingPopup] = useState(false);
  const [showClaimDetails, setShowClaimDetails] = useState(null);
  const [showProcessedPopup, setShowProcessedPopup] = useState(false);
  const [showInsuranceCard, setShowInsuranceCard] = useState(false);
  const [showAcceptedClaimsPopup, setShowAcceptedClaimsPopup] = useState(false);
  const [showAcceptedClaimDetails, setShowAcceptedClaimDetails] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Sample Pending Claims Data
  const pendingClaims = [
    {
      id: "P001", name: "Ali Khan", doctor: "Dr. Ahmed", date: "2025-03-01",
      medicines: [{ name: "Panadol", price: 200 }, { name: "Antibiotic", price: 500 }],
      tests: [{ name: "Blood Test", price: 1500 }],
    },
    {
      id: "P002", name: "Sara Malik", doctor: "Dr. Fatima", date: "2025-03-02",
      medicines: [{ name: "Vitamin C", price: 300 }],
      tests: [{ name: "X-Ray", price: 2500 }, { name: "MRI", price: 5000 }],
    }
  ];

  const processedClaims = [
    { id: "P005", name: "Zain Ali", doctor: "Dr. Khan", date: "2025-02-20", amount: 5000 },
    { id: "P006", name: "Ayesha Noor", doctor: "Dr. Asad", date: "2025-02-22", amount: 7500 },
    { id: "P007", name: "Daniya", doctor: "Dr. Zhalay", date: "2025-02-23", amount: 6500 },
    { id: "P008", name: "kamla safdar", doctor: "Dr. Almas", date: "2025-02-24", amount: 5500 }
  ];

  const acceptedClaims = [
    {
      id: "P001", name: "Olivia Johnson", doctor: "Dr. Sarah", date: "2025-02-01",
      medicines: [{ name: "Panadol", price: 200 }, { name: "Aspirin", price: 300 }],
      tests: [{ name: "Blood Test", price: 1500 }]
    },
    {
      id: "P002", name: "Benjamin", doctor: "Dr. Michael Smith", date: "2025-02-01",
      medicines: [{ name: "Vitamin C", price: 300 }],
      tests: [{ name: "X-Ray", price: 2500 }]
    },
  ];
  const data = [
    { month: "Jan", Pending: 40, Processed: 25, Accepted: 35 },
    { month: "Feb", Pending: 30, Processed: 20, Accepted: 50 },
    { month: "Mar", Pending: 50, Processed: 30, Accepted: 20 },
    { month: "Apr", Pending: 20, Processed: 40, Accepted: 40 },
    { month: "May", Pending: 35, Processed: 25, Accepted: 40 },
    { month: "Jun", Pending: 45, Processed: 30, Accepted: 25 },
  ];

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("insurance-card-overlay")) {
      setShowInsuranceCard(false);
    }
  };

  const handleAcceptedClaimClick = (claim) => {
    setShowAcceptedClaimDetails(claim);
  };
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="dashboard-container">
      <h1>Insurance Company Dashboard</h1>

      {/* Cards Section */}
      <div className="dashboard-cards">
        <div className="card" onClick={() => setShowAcceptedClaimsPopup(true)}>
          <FaCheckCircle className="card-icon accepted-icon" size={30} />
          <h3>Accepted Claims</h3>
          <p>50</p>
        </div>

        <div className="card" onClick={() => setShowProcessedPopup(true)}>
          <FaHourglassHalf className="card-icon check-icon" size={30} />
          <h3>Under Review Claims</h3>
          <p>85</p>
        </div>

        <div className="card" onClick={() => setShowPendingPopup(true)}>
          <FaClock className="card-icon clock-icon" size={30} />
          <h3>Pending Claims</h3>
          <p>35</p>
        </div>
      </div>

      {/* Pending Claims Popup */}
      {showPendingPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Pending Claims</h2>
            <div className="popup-header-row">
              <span>Patient ID</span>
              <span>Name</span>
              <span>Doctor</span>
              <span>Date</span>
            </div>

            {pendingClaims.map((claim, index) => (
              <div key={index} className="claim-item" onClick={() => setShowClaimDetails(claim)}>
                <span>{claim.id}</span>
                <span>{claim.name}</span>
                <span>{claim.doctor}</span>
                <span>{claim.date}</span>
              </div>
            ))}
            <FaTimes className="close" onClick={() => setShowPendingPopup(false)} />
          </div>
        </div>
      )}

      {/* Claim Details Popup */}
      {showClaimDetails && (
        <div className="popup-overlay">
          <div className="popup claim-details-popup">
            <FaTimes className="close" onClick={() => setShowClaimDetails(null)} />

            <h2>Claim Details</h2>
            <p><strong>Name:</strong> {showClaimDetails.name}</p>
            <p><strong>Date:</strong> {showClaimDetails.date}</p>
            <p><strong>Doctor:</strong> {showClaimDetails.doctor}</p>

            {/* Medicines Section */}
            <h3>Medicines</h3>
            <div className="details-table">
              {showClaimDetails.medicines.map((med, index) => (
                <div key={index} className="table-row">
                  <span>{med.name}</span>
                  <span>{med.price} PKR</span>
                </div>
              ))}
            </div>
            <p><strong>Total Medicine Cost:</strong> {showClaimDetails.medicines.reduce((sum, med) => sum + med.price, 0)} PKR</p>

            {/* Tests Section */}
            <h3>Medical Tests</h3>
            <div className="details-table">
              {showClaimDetails.tests.map((test, index) => (
                <div key={index} className="table-row">
                  <span>{test.name}</span>
                  <span>{test.price} PKR</span>
                </div>
              ))}
            </div>
            <p><strong>Total Test Cost:</strong> {showClaimDetails.tests.reduce((sum, test) => sum + test.price, 0)} PKR</p>

            {/* Total Cost */}
            <h3><strong>Total Combined Price:</strong> {showClaimDetails.medicines.reduce((sum, med) => sum + med.price, 0) + showClaimDetails.tests.reduce((sum, test) => sum + test.price, 0)} PKR</h3>
            <button className="insurance-card-btn" onClick={() => setShowInsuranceCard(true)}>
              View Insurance Card
            </button>

            <button className="accept-btn">
              <FaCheckCircle /> Accept
            </button>
          </div>
        </div>
      )}

      {/* Proccessed claim Popup */}
      {showProcessedPopup && (
        <div className="popup-overlay">
          <div className="popup processed-popup"> {/* Apply new width */}
            <h2>Under Review Claims</h2>

            {/* Header Row */}
            <div className="processed-popup-header">
              <span>Patient ID</span>
              <span>Name</span>
              <span>Doctor</span>
              <span>Date</span>
              <span>Amount</span>
            </div>

            {/* Data Rows */}
            {processedClaims.map((claim, index) => (
              <div key={index} className="processed-claim-row">
                <span>{claim.id}</span>
                <span>{claim.name}</span>
                <span>{claim.doctor}</span>
                <span>{claim.date}</span>
                <span>{claim.amount} PKR</span>
              </div>
            ))}

            {/* Close Button */}
            <FaTimes className="close" onClick={() => setShowProcessedPopup(false)} />
          </div>
        </div>
      )}

      {/* Insurance Card Popup */}
      {showInsuranceCard && (
        <div className="insurance-card-overlay" onClick={handleOutsideClick}>
          <div className="insurance-card-container">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

              {/* Front Side - Click to Flip */}
              <div className="card-side" onClick={() => setIsFlipped(true)}>
                <img src={insuranceCardImage} alt="Insurance Card Front" />
              </div>

              {/* Back Side - Click to Flip */}
              <div className="card-side" onClick={() => setIsFlipped(false)}>
                <img src={require("../../assets/images/card_back.png")} alt="Insurance Card Back" />
              </div>

            </ReactCardFlip>
          </div>
        </div>
      )}


      {/* Accepted Claims Popup (Brief Info) */}
      {showAcceptedClaimsPopup && (
        <div className="popup-overlay">
          <div className="popup accepted-claims-popup">
            <h2>Accepted Claims</h2>
            <div className="popup-header-row">
              <span>Patient ID</span>
              <span>Name</span>
              <span>Doctor</span>
              <span>Date</span>
            </div>

            {acceptedClaims.map((claim, index) => (
              <div
                key={index}
                className="claim-item"
                onClick={() => handleAcceptedClaimClick(claim)}
              >
                <span>{claim.id}</span>
                <span>{claim.name}</span>
                <span>{claim.doctor}</span>
                <span>{claim.date}</span>
              </div>
            ))}

            <FaTimes className="close" onClick={() => setShowAcceptedClaimsPopup(false)} />
          </div>
        </div>
      )}

      {/* Detailed Accepted Claim View */}
      {showAcceptedClaimDetails && (
        <div className="popup-overlay">
          <div className="popup claim-details-popup">
            <FaTimes className="close" onClick={() => setShowAcceptedClaimDetails(null)} />

            <h2>Claim Details</h2>
            <p><strong>Name:</strong> {showAcceptedClaimDetails.name}</p>
            <p><strong>Date:</strong> {showAcceptedClaimDetails.date}</p>
            <p><strong>Doctor:</strong> {showAcceptedClaimDetails.doctor}</p>

            {/* Medicines Section */}
            <h3>Medicines</h3>
            <div className="details-table">
              {showAcceptedClaimDetails.medicines.map((med, index) => (
                <div key={index} className="table-row">
                  <span>{med.name}</span>
                  <span>{med.price} PKR</span>
                </div>
              ))}
            </div>
            <p><strong>Total Medicine Cost:</strong> {showAcceptedClaimDetails.medicines.reduce((sum, med) => sum + med.price, 0)} PKR</p>

            {/* Tests Section */}
            <h3>Medical Tests</h3>
            <div className="details-table">
              {showAcceptedClaimDetails.tests.map((test, index) => (
                <div key={index} className="table-row">
                  <span>{test.name}</span>
                  <span>{test.price} PKR</span>
                </div>
              ))}
            </div>
            <p><strong>Total Test Cost:</strong> {showAcceptedClaimDetails.tests.reduce((sum, test) => sum + test.price, 0)} PKR</p>

            {/* Total Cost */}
            <h3><strong>Total Combined Price:</strong> {showAcceptedClaimDetails.medicines.reduce((sum, med) => sum + med.price, 0) + showAcceptedClaimDetails.tests.reduce((sum, test) => sum + test.price, 0)} PKR</h3>
            <button className="insurance-card-btn" onClick={() => setShowInsuranceCard(true)}>
              View Insurance Card
            </button>
          </div>
        </div>
      )}
      <ResponsiveContainer width={600} height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={30}
        >
          <XAxis dataKey="month" stroke="#000" />
          <YAxis stroke="#000" domain={[5, "auto"]} />

          {/* Tooltip with removed hover effect */}
          <Tooltip
            cursor={{ fill: "none" }}
            contentStyle={{
              backgroundColor: "#0D1B2A",
              borderRadius: "8px",
              border: "1px solid #fff",
              color: "#fff"
            }}
          />

          <Legend />

          {/* Bars */}
          <Bar dataKey="Pending" stackId="a" fill="#ff9800" />
          <Bar dataKey="Processed" stackId="a" fill="#4caf50" />
          <Bar dataKey="Accepted" stackId="a" fill="#2196f3" />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default InsuranceDashboard;
