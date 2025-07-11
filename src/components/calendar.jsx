import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import AppointmentForm from "./appointment";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';




function CalendarView(){

const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem("appointments")) || [];
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleDayClick = (value) => {
    setSelectedDate(value);
    setShowForm(true);
  };

  const handleSave = (newAppointment) => {
    setAppointments((prev) => [...prev.filter(a => a.date !== newAppointment.date || a.time !== newAppointment.time), newAppointment]);
    setShowForm(false);
  };

  const appointmentsForDate = (day) => {
    return appointments.filter(a => new Date(a.date).toDateString() === day.toDateString());
  };


    return(
        <>
        {/* <div className="calendar-container">
      <h2>Appointment Calendar</h2>
      <Calendar onClickDay={handleDayClick} value={date} tileContent={({ date }) => (
        <ul className="appointment-list">
          {appointmentsForDate(date).map((a, i) => (
            <li key={i}>{a.time} - {a.patient}</li>
          ))}
        </ul>
      )} />
      {showForm && (
        <AppointmentForm
          selectedDate={selectedDate}
          onSave={handleSave}
        />
      )}
    </div> */}
<div className="calendar-body">

<div className="calendar-container">
  <h2 className="calendar-title">Appointment Calendar</h2>

  {/* Mobile View */}
  <div className="mobile-view">
    <label className="date-label">Pick a Date</label>
    <DatePicker
      selected={date}
      onChange={(d) => {
        setDate(d);
        handleDayClick(d);
      }}
      className="date-picker"
    />

    <h3 className="date-label">Appointments for {date.toDateString()}:</h3>
    <div className="appointment-list">
      <ul>
        {appointmentsForDate(date).length > 0 ? (
          appointmentsForDate(date).map((a, i) => (
            <li key={i} className="appointment-item">
              {a.time} - {a.patient}
            </li>
          ))
        ) : (
          <li className="empty-text">No appointments</li>
        )}
      </ul>
    </div>

    {showForm && (
      <div className="form-section">
        <AppointmentForm selectedDate={selectedDate} onSave={handleSave} />
      </div>
    )}
  </div>

  {/* Desktop View */}
  <div className="desktop-view calendar-layout">
    <div className="calendar-column">
      <Calendar
        onClickDay={handleDayClick}
        value={date}
        tileContent={({ date }) => (
          <ul className="text-sm text-blue-700 mt-1">
            {appointmentsForDate(date).map((a, i) => (
              <li key={i}>{a.time} - {a.patient}</li>
            ))}
          </ul>
        )}
      />
    </div>

    {showForm && (
      <div className="form-column">
        <AppointmentForm selectedDate={selectedDate} onSave={handleSave} />
      </div>
    )}
  </div>
</div>

</div>

        </>
    )
}


export default CalendarView