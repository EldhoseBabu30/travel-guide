import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './Header/Nav'
import Hero from './Hero/Hero'
import Destination from './Pages/Destination/Destination'
import Packages from './Pages/Packages/Packages'
import SignIn from './Pages/Sign In/SignIn'
import SignUp from './Pages/Sign Up/SignUp'
import Profile from './Pages/Profile/Profile'
import Munnar from './Pages/Destinations-single/Munnar'
import Ooty from './Pages/Destinations-single/Ooty'
import Kodaikanal from './Pages/Destinations-single/Kodaikanal'
import Kovalam from './Pages/Destinations-single/Kovalam'
import Kanyakumari from './Pages/Destinations-single/Kanyakumari'
import Airlines from './Pages/FoodSpots/FoodSpots-single/Airlines'
import ArabianPalace from './Pages/FoodSpots/FoodSpots-single/ArabianPalace'
import Delicia from './Pages/FoodSpots/FoodSpots-single/Delicia'
import Majlis from './Pages/FoodSpots/FoodSpots-single/Majlis'
import Paragon from './Pages/FoodSpots/FoodSpots-single/Paragon'
import FloatingButton from './components/FloatingButton'
import HotelMap from './Pages/Hotel/HotelListings'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile   />} />
          <Route path="/munnar" element={<Munnar />} />
          <Route path="/ooty" element={<Ooty />} />
          <Route path="/kodaikanal" element={<Kodaikanal />} />
          <Route path="/kovalam" element={<Kovalam />} />
          <Route path="/kanyakumari" element={<Kanyakumari />} />
          <Route path="/airlines" element={<Airlines />} />
          <Route path="/arabian-palace" element={<ArabianPalace />} />
          <Route path="/delicia" element={<Delicia />} />
          <Route path="/majlis" element={<Majlis />} />
          <Route path="/paragon" element={<Paragon />} />
          <Route path="/hotels" element={<HotelMap />} />




        </Routes>
        <FloatingButton/>
      </BrowserRouter>


    </div>
  )
}

export default App
