// src/App.jsx
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Header/Nav';
import Hero from './Hero/Hero';
import Destination from './Pages/Destination/Destination';
import Packages from './Pages/Packages/Packages';
import SignIn from './Pages/Sign In/SignIn';
import SignUp from './Pages/Sign Up/SignUp';
import Profile from './Pages/Profile/Profile';
import Munnar from './Pages/Destinations-single/Munnar';
import Ooty from './Pages/Destinations-single/Ooty';
import Kodaikanal from './Pages/Destinations-single/Kodaikanal';
import Kovalam from './Pages/Destinations-single/Kovalam';
import Kanyakumari from './Pages/Destinations-single/Kanyakumari';
import FloatingButton from './components/FloatingButton';
import HotelMap from './Pages/Hotel/HotelListings';
import FoodSpots from './Pages/FoodSpots/Foodspots';
import Community from './Pages/Community/Community';
import AiTravelHome from './Pages/AiTravel/AiTravelHome';
import AiTraveller from './Pages/AiTravel/AiTraveller';
import AiSelect from './Pages/AiTravel/AiSelect';
import AiSchedule from './Pages/AiTravel/AiSchedule';
import AiHotel from './Pages/AiTravel/AiHotel';
import AiFood from './Pages/AiTravel/AiFood';
import AiSummary from './Pages/AiTravel/AiSummary';
import AiFinalize from './Pages/AiTravel/AiFinalize';
import { TripProvider } from './Pages/AiTravel/context/TripContext';
import TripDetails from './Pages/Trip/TripDetails';
import MyTrips from './Pages/AiTravel/MyTrips/MyTrips';

function App() {
  return (
    <div>
      <BrowserRouter>
        <TripProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/munnar" element={<Munnar />} />
          <Route path="/ooty" element={<Ooty />} />
          <Route path="/kodaikanal" element={<Kodaikanal />} />
          <Route path="/kovalam" element={<Kovalam />} />
          <Route path="/kanyakumari" element={<Kanyakumari />} />
          <Route path="/hotels" element={<HotelMap />} />
          <Route path="/food-spots" element={<FoodSpots />} />
          <Route path="/community" element={<Community />} />
          <Route path="/travelplanner/ai-home" element={<AiTravelHome />} />
          <Route path="/travelplanner/traveller" element={<AiTraveller />} />
          <Route path="/travelplanner/select" element={<AiSelect />} />
          <Route path="/travelplanner/schedule" element={<AiSchedule />} />
          <Route path="/travelplanner/hotel" element={<AiHotel />} />
          <Route path="/travelplanner/food" element={<AiFood />} />
          <Route path="/travelplanner/summary" element={<AiSummary />} />
          <Route path="/travelplanner/finalize" element={<AiFinalize />} />
          <Route path="/trip-details" element={<TripDetails />} />
          <Route path="/my-trips" element={<MyTrips />} />



        </Routes>
        <FloatingButton />
        </TripProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
