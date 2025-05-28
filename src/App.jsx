import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Navigation from './components/Navigation/Navigation'
import MedicalList from './pages/MedicalList/MedicalList.jsx'
import MedicalChart from './pages/MedicalChart/MedicalChart.jsx'
import MedicalPharmacy from './pages/MedicalPharmacy/MedicalPharmacy.jsx'

function App() {


  return (
    <div>
      <Navigation />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/medical-list' element={<MedicalList />} />
      <Route path='/medical-chart' element={<MedicalChart />} />
      <Route path='/pharmacy' element={<MedicalPharmacy />} />
    </Routes>
    </div>
    
  )
}

export default App
