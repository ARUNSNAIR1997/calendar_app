// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import AppointmentForm from "./appointment";
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';




// function CalendarView(){

// const [date, setDate] = useState(new Date());
//   const [appointments, setAppointments] = useState(() => {
//     return JSON.parse(localStorage.getItem("appointments")) || [];
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     localStorage.setItem("appointments", JSON.stringify(appointments));
//   }, [appointments]);

//   const handleDayClick = (value) => {
//     setSelectedDate(value);
//     setShowForm(true);
//   };

//   const handleSave = (newAppointment) => {
//     setAppointments((prev) => [...prev.filter(a => a.date !== newAppointment.date || a.time !== newAppointment.time), newAppointment]);
//     setShowForm(false);
//   };

//   const appointmentsForDate = (day) => {
//     return appointments.filter(a => new Date(a.date).toDateString() === day.toDateString());
//   };


//     return(
//         <>
//         {/* <div className="calendar-container">
//       <h2>Appointment Calendar</h2>
//       <Calendar onClickDay={handleDayClick} value={date} tileContent={({ date }) => (
//         <ul className="appointment-list">
//           {appointmentsForDate(date).map((a, i) => (
//             <li key={i}>{a.time} - {a.patient}</li>
//           ))}
//         </ul>
//       )} />
//       {showForm && (
//         <AppointmentForm
//           selectedDate={selectedDate}
//           onSave={handleSave}
//         />
//       )}
//     </div> */}
// <div className="calendar-body">

// <div className="calendar-container">
//   <h2 className="calendar-title">Appointment Calendar</h2>

//   {/* Mobile View */}
//   <div className="mobile-view">
//     <label className="date-label">Pick a Date</label>
//     <DatePicker
//       selected={date}
//       onChange={(d) => {
//         setDate(d);
//         handleDayClick(d);
//       }}
//       className="date-picker"
//     />

//     <h3 className="date-label">Appointments for {date.toDateString()}:</h3>
//     <div className="appointment-list">
//       <ul>
//         {appointmentsForDate(date).length > 0 ? (
//           appointmentsForDate(date).map((a, i) => (
//             <li key={i} className="appointment-item">
//               {a.time} - {a.patient}
//             </li>
//           ))
//         ) : (
//           <li className="empty-text">No appointments</li>
//         )}
//       </ul>
//     </div>

//     {showForm && (
//       <div className="form-section">
//         <AppointmentForm selectedDate={selectedDate} onSave={handleSave} />
//       </div>
//     )}
//   </div>

//   {/* Desktop View */}
//   <div className="desktop-view calendar-layout">
//     <div className="calendar-column">
//       <Calendar
//         onClickDay={handleDayClick}
//         value={date}
//         tileContent={({ date }) => (
//           <ul className="text-sm text-blue-700 mt-1">
//             {appointmentsForDate(date).map((a, i) => (
//               <li key={i}>{a.time} - {a.patient}</li>
//             ))}
//           </ul>
//         )}
//       />
//     </div>

//     {showForm && (
//       <div className="form-column">
//         <AppointmentForm selectedDate={selectedDate} onSave={handleSave} />
//       </div>
//     )}
//   </div>
// </div>

// </div>

//         </>
//     )
// }


// export default CalendarView


import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import AppointmentForm from "./appointment";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "../App.css";

function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem("appointments")) || [];
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDayClick = (value) => {
    setSelectedDate(value);
    setDate(value);
    setShowForm(true);
  };

  const handleSave = (newAppointment) => {
    setAppointments((prev) =>
      [...prev.filter(a => !(a.date === newAppointment.date && a.time === newAppointment.time)), newAppointment]
    );
    setShowForm(false);
  };

  const handleDelete = (appt) => {
    if (window.confirm("Delete this appointment?")) {
      setAppointments((prev) =>
        prev.filter(a => !(a.date === appt.date && a.time === appt.time))
      );
    }
  };

  const appointmentsForDate = (day) => {
    let filtered = appointments.filter(
      a => new Date(a.date).toDateString() === day.toDateString()
    );
    if (filterType !== "all" && filterValue !== "") {
      filtered = filtered.filter(a => a[filterType] === filterValue);
    }
    return filtered;
  };

  const uniqueDoctors = [...new Set(appointments.map(a => a.doctor))];
  const uniquePatients = [...new Set(appointments.map(a => a.patient))];

  return (
    <div className={`calendar-body ${darkMode ? "dark" : ""}`}>
      <div className="top-bar p-3 d-flex flex-wrap justify-content-between align-items-center">
        <h2 className="calendar-title m-0">Appointment Calendar</h2>
        <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">
          <button className="btn btn-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <select className="form-select" onChange={(e) => {
            setFilterType("doctor");
            setFilterValue(e.target.value);
          }}>
            <option value="">Filter by Doctor</option>
            {uniqueDoctors.map(d => <option key={d}>{d}</option>)}
          </select>

          <select className="form-select" onChange={(e) => {
            setFilterType("patient");
            setFilterValue(e.target.value);
          }}>
            <option value="">Filter by Patient</option>
            {uniquePatients.map(p => <option key={p}>{p}</option>)}
          </select>

          <button className="btn btn-outline-danger" onClick={() => {
            setFilterType("all");
            setFilterValue("");
          }}>
            Clear Filters
          </button>
        </div>

        
      </div>

      {/* Mobile Layout */}
      {isMobile ? (
        <div className="mobile-layout p-3">
          <label className="form-label">Pick a Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => {
              setDate(d);
              handleDayClick(d);
            }}
            className="form-control"
          />

          <h4 className="mt-3">Appointments for {date.toDateString()}:</h4>
          <ul className="list-group mb-3">
            {appointmentsForDate(date).length > 0 ? (
              appointmentsForDate(date).map((a, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                  {a.time} - {a.patient} with {a.doctor}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a)}>Delete</button>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No appointments</li>
            )}
          </ul>

          {showForm && (
            <div className="form-section">
              <AppointmentForm selectedDate={selectedDate} onSave={handleSave} />
            </div>
          )}
        </div>
      ) : (
        <div className="desktop-layout d-flex p-4 gap-4">
          <div className="calendar-column w-100">
            <Calendar
              onClickDay={handleDayClick}
              value={date}
              tileContent={({ date }) => (
                <ul className="text-sm text-primary mt-1">
                  {appointmentsForDate(date).map((a, i) => (
                    <li key={i}>{a.time} - {a.patient}</li>
                  ))}
                </ul>
              )}
            />
          </div>

          <div className="appointment-list-column">
            <h4 className="mb-3">Appointments for {date.toDateString()}:</h4>
            <ul className="list-group mb-3">
              {appointmentsForDate(date).length > 0 ? (
                appointmentsForDate(date).map((a, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    {a.time} - {a.patient} with {a.doctor}
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a)}>Delete</button>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">No appointments</li>
              )}
            </ul>
          </div>

          {showForm && (
            <div className="form-column">
              <AppointmentForm selectedDate={selectedDate} onSave={handleSave} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarView;
