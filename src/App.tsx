import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Reserve from './Pages/Reserve'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Payment from './Pages/Payment'
import Trip from './Pages/Trip'
import Account from './Pages/Account'
import Profile from './Pages/Profile'
import ListHosting from './Pages/ListHosting'
import Hosting from './Pages/Hosting'





function App() {



  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/reserve/:id' element={<Reserve />} />
          <Route path='/register' element={<Register />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/trip' element={<Trip />} />
          <Route path='/account' element={<Account />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/listhosting' element={<ListHosting />} />
          <Route path='/hosting' element={<Hosting />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
