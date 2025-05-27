import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Patient Views
import PatientLoginView from "./pages/PatientLoginView";
import PatientSignup from './pages/PatientSignup.jsx';
import PatientLogin1 from './pages/PatientLogin1.jsx';
import PatientLogin2 from './pages/PatientLogin2.jsx';
import AppointmentBooking from './pages/AppointmentBooking.jsx';
import ShowPatientAppointment from './pages/ShowPatientAppointment.jsx';
import UpdatePatientInfo from './pages/UpdatePatientInfo.jsx';
import Services from "./pages/ServicesShow";
import InsuranceClaimPage from "./pages/InsuranceClaim.jsx";
import ServicesReviewPage from "./pages/ServiesReview.jsx";
import Servicestaken from "./pages/Servicestaken.jsx";
import PatientDue from './pages/PatientDue.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

// Doctor Views
import DoctorLoginView from "./pages/DoctorLoginView";
import ShowDoctors from './pages/ShowDoctors.jsx';
import DeleteDoctor from './pages/DeleteDoctor.jsx';
import ShowDoctorAppointment from './pages/ShowDoctorAppointment.jsx';
import RescheduleAppointmentTiming from './pages/DoctorRescheduleTiming.jsx';
import CancelAppointment from './pages/DoctorCancelTiming.jsx';
import DoctorLogin from './pages/DoctorLogin.jsx';
import DoctorAddTest from './pages/DoctorAddTest.jsx';

// Admin Views
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AddDoctors from './pages/AddDoctors.jsx';
import AdminPatients from "./pages/AdminPatient.jsx"
import DeletePatient from "./pages/DeletePatient.jsx"
import AdminFetchMedicine from "./pages/AdminFetchMedicine.jsx"
import InsuranceReviewApprove from "./pages/InsuranceReviewApprove.jsx";
//import RestrictPatient from './pages/RestrictPatient.jsx';
import ControlPatientAvailability from './pages/ControlPatientAvailability.jsx';
import EmergencyBooking from './pages/EmergencyBooking.jsx';

// General Views
import Healopharm from "./pages/start";
import Invoice from "./components/invoice";
import ShowService from "./pages/ShowReviews.jsx";

// Other Routes
import ShowReview from "./pages/ShowReviews.jsx";
import { ServicesReview } from '../../backend/models/ServicesReviewmodel.js';
import LabBooking from './pages/LabBooking.jsx';
import BedBooking from './pages/BedBooking.jsx';
import BookAmbulance from './pages/BookAmbulance.jsx';
import AddMedicine from './pages/AddMedicine.jsx';
import DoctorAdmin from './pages/DoctorAdmin.jsx';
import ServerCart from './pages/ServiceCart.jsx';
import Prescription from './pages/Prescription.jsx';
import BillingCart from './pages/BillingCart.jsx';
import MakePayment from './pages/MakePyament.jsx';


const App = () => {
  return (
    <Routes>
      {/* Patient Routes */}
      <Route path="/patient/dashboard" element={<PatientLoginView />} />
      <Route path="/patient/signup" element={<PatientSignup />} />
      <Route path="/patient/login" element={<PatientLogin1 />} />
      <Route path="/patient/loginWelcome" element={<PatientLogin2 />} />
      <Route path="/patient/services" element={<Services />} />
      <Route path="/patient/insurance" element={<InsuranceClaimPage />} />
      <Route path="/patient/servicereview" element={<ServicesReviewPage />} />
      <Route path="/patient/servicestaken" element={<Servicestaken />} />
      <Route path="/patient/appointmentBooking" element={<AppointmentBooking />} />
      <Route path="/patient/showAppointments" element={<ShowPatientAppointment />} />
      <Route path="/patient/updateInfo" element={<UpdatePatientInfo />} />
      <Route path='/patient/patientDue' element={<PatientDue/>} />
      <Route path='/patient/forgotPassword' element={<ForgotPassword />} />
      <Route path='/patient/resetPassword' element={<ResetPassword />} />
      
      {/* Doctor Routes */}
      <Route path="/doctor/dashboard" element={<DoctorLoginView />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctorAppointments" element={<ShowDoctors />} />
      <Route path="/deleteDoc/:id" element={<DeleteDoctor />} />
      <Route path="/doctor/showAppointments" element={<ShowDoctorAppointment />} />
      <Route path="/doctor/rescheduleAppointment" element={<RescheduleAppointmentTiming />} />
      <Route path="/doctor/cancelAppointment" element={<CancelAppointment />} />
      <Route path="/doctor/addTest" element={<DoctorAddTest />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/addDoctor" element={<AddDoctors />} />
      <Route path="/admin/insurance-review" element={<InsuranceReviewApprove />} />
      <Route path="/admin/deletedoctor" element={<DeleteDoctor />} />
      <Route path="/admin/doctordashboard" element={<DoctorAdmin />} />
      <Route path="/admin/patients" element={<AdminPatients />} />
      <Route path="/admin/deletePatient" element={<DeletePatient />} />
      <Route path='/admin/adminFetchMedicine' element={<AdminFetchMedicine />} />
      <Route path='/doctor/prescription' element={<Prescription />} />
      <Route path="/admin/reviewInsurance" element={<InsuranceReviewApprove />} />
      
      <Route path='/admin/makeAvailable' element={<ControlPatientAvailability />} />
      <Route path='/admin/emergencybooking' element={<EmergencyBooking />} />

      {/* General Routes */}
      <Route path="/home" element={<Healopharm />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/patient/servicereview" element={<ServicesReview />} />
      <Route path="/showservicereviews" element={<ShowReview />} />
      <Route path='/patient/serviceCart' element={<ServerCart />} />
      <Route path="/patient/billingCart" element={<BillingCart />} />
      <Route path="/patient/makePayment" element={<MakePayment />} />
      <Route path="/showservicereviews" element={<ShowService />} />


      {/* service Routes */}
      <Route path="/bedservices" element={<BedBooking />} />
      <Route path="/labservices" element={<LabBooking />} />
      <Route path="/ambulnceservices" element= {<BookAmbulance/>}/>
      <Route path="/patient/addmedicine" element={<AddMedicine/>} />
    </Routes>
  );
};

export default App;
