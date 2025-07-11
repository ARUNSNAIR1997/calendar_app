import React, { useState } from "react";

const patients = ["Appu", "ammu", "Kannan"];
const doctors = ["Dr. Arun", "Dr. Adithya", "Dr. Aswin"];

function AppointmentForm({ selectedDate, onSave, appointment }){

const [patient, setPatient] = useState(appointment?.patient || "");
  const [doctor, setDoctor] = useState(appointment?.doctor || "");
  const [time, setTime] = useState(appointment?.time || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date: selectedDate, patient, doctor, time });
  };

    return(
        <>
        <form className="appointment-form text-center" onSubmit={handleSubmit}>
      <h3>{appointment ? "Edit" : "Add"} Appointment</h3>
      <div className="pt-3">
        <select value={patient} onChange={(e) => setPatient(e.target.value)} required className="form-control">
        <option value="">Select Patient</option>
        {patients.map((p) => <option key={p}>{p}</option>)}
      </select>
      </div>
      <div className="pt-3">
        <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required className="form-control">
        <option value="">Select Doctor</option>
        {doctors.map((d) => <option key={d}>{d}</option>)}
      </select>
      </div>
      <div className="pt-3">
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="form-control"/>
      </div>
      <div className="pt-3">
        <button type="submit" className="form-control text-white bg-primary btn">Save</button>
      </div>
      
    </form>


        </>
    )
}


export default AppointmentForm