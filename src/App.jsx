import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './Header/Nav'
import Hero from './Hero/Hero'
import ActionAreaCard from './Hero/Popular'


function App() {

  return (
    <div>
      <BrowserRouter>
      <Nav/>
     
    
      <Routes> 
         <Route path='/' element={<Hero/>}/> 
       </Routes>
      </BrowserRouter>
      
       
    </div>
  )
}

export default App
