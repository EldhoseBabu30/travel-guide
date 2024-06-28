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
import FloatingButton from './components/FloatingButton'
import HotelMap from './Pages/Hotel/HotelListings'
import FoodSpots from './Pages/FoodSpots/Foodspots'
import Community from './Pages/Community/Community'
import TripForm from './components/AI Travel Planner/TripForm';
import Suggestions from './components/AI Travel Planner/Suggestions';
import Finalize from './components/AI Travel Planner/Finalize';
import CreateTrip from './components/AI Travel Planner/CreateTrip';



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
          <Route path="/hotels" element={<HotelMap />} />
          <Route path="/food-spots" element={<FoodSpots />} />
          <Route path="/community" element={<Community />} />
          <Route path="/trip-form" element={<TripForm />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/finalize" element={<Finalize />} />
        <Route path="/create-trip" element={<CreateTrip />} />




        </Routes>
        <FloatingButton/>
      </BrowserRouter>


    </div>
  )
}

export default App