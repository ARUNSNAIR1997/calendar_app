import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/login'
import CalendarView from './components/calendar'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/calendar' element={<CalendarView/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
