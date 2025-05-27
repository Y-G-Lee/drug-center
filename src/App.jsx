import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Navigation from './components/Navigation/Navigation'
import MedicalList from './pages/MedicalList/MedicalList.jsx'

function App() {


  return (
    <div>
      <Navigation />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/medical-list' element={<MedicalList />} />
    </Routes>
    </div>
    
  )
}

export default App
