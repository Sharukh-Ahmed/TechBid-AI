import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import EstimatorPage from './pages/EstimatorPage'
import Navbar from './components/Navbar'
import About from './pages/About'
import TeachOurAI from './pages/TeachAI'

const App = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/estimator' element={<EstimatorPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/teach-ai' element={<TeachOurAI/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;