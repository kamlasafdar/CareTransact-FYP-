const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const controllers = require('../controller/auth_controller');


// Patient Routes
router.post('/patients', controllers.addPatient);
router.get('/patient-details', controllers.getPatientDetails);
router.put('/update-patient', controllers.updatePatient);
router.get('/insurance-companies', controllers.getInsuranceCompanies);

// Doctor Routes
router.post('/get-doctor', controllers.getDoctorDetails);
router.get('/doctor-details', controllers.getDoctorDetails);
router.get('/doctor-profile', controllers.getDoctorProfile);
router.put('/update-doctor', controllers.updateDoctor);

//doctor confirming appointment
router.get('/get-doctor-appointments', controllers.getDoctorAppointments);
router.put('/update-appointment-status', controllers.updateAppointmentStatus);



//Auth Appointment
router.post('/save-appointment-slot', controllers.saveAppointmentSlot);
router.get('/get-available-slots', controllers.getAvailableSlots);
router.delete('/remove-expired-slots', controllers.removeExpiredSlots);
router.get('/get-categorized-slots', controllers.getCategorizedSlots);
router.delete('/remove-past-appointments', controllers.removePastAppointments);


// patient side appointment
router.get('/find-doctor-email', controllers.findDoctorEmail);
router.get('/get-data-ofslots', controllers.getAvailableDoctorAppointments);
router.post('/book-appointment', controllers.bookAppointment);
router.get('/get-patient-appointments', controllers.getPatientAppointments);
router.get('/get-future-appointments', controllers.getFutureAppointments);
router.post('/cancel-appointment', controllers.cancelAppointment);
router.post('/reschedule-appointment', controllers.rescheduleAppointment);

router.get('/get-future-pending-and-confirm', controllers.getFuturePendingAndConfirmAppointments);


// Auth Routes     login
router.post('/check-user-type', controllers.checkUserType);



// Prescription

router.post("/prescriptions/create", controllers.savePrescription);
router.get("/prescriptions_before/check", controllers.checkPrescription_before);
router.get("/prescriptions/check", controllers.checkPrescription);
router.post("/lab-tests/create", controllers.createLabTests);
router.get("/lab-tests/check", controllers.checkLabTests);
router.post("/pharmacy-requests/create", controllers.createPharmacyRequest);
router.get("/medicines/check", controllers.checkMedicines);




// pharmacist

router.get('/pharmacist/medicines', controllers.getPharmacistMedicines);
router.put('/update-medicine-status', controllers.updateMedicineStatus);




//  lab attendent
// Lab Attendee Routes
router.get('/lab-attendee-tests', controllers.getLabAttendeeTests); // Fetch all lab tests
router.get('/patient-name', controllers.getPatientName);
router.put('/update-lab-test-status', controllers.updateLabTestStatus);
router.get('/lab-tests-by-prescription', controllers.getLabTestsByPrescriptionId); // Fetch lab tests by prescription ID


///////  claim

// Add these endpoints to your backend
router.get('/claims/:prescriptionId', controllers.getClaimByPrescriptionId);
router.post('/lab-tests/create-and-update-claim', controllers.createLabTestsAndUpdateClaim);
router.post('/pharmacy-requests/create-and-update-claim', controllers.createPharmacyRequestAndUpdateClaim);





////////////////  admin
router.get('/user-counts', controllers.getUserCounts);
router.get('/getAppointmentCount', controllers.getAppointmentCounts);
//get user for admin pop up
router.get('/get-users', controllers.getUsers);

router.delete('/remove-user/:id/:role', controllers.removeUser);

// Route to add a new user
router.post("/add-user", controllers.handleAddUser);

router.get('/user-details/:entity/:id', controllers.getUserDetails);


/////  record doctor

router.get('/doctor-records/:doctorEmail', controllers.getDoctorMedicalRecords);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});








module.exports = router;