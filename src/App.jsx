import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './Header/Nav'
import Hero from './Hero/Hero'
import Destination from './Pages/Destination/Destination'
import Packages from './Pages/Packages/Packages'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/packages" element={<Packages />} />

        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App
