import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import AppStore from '../../assets/app.png';
import Play from '../../assets/play.png';

const Footer = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="mb-8 md:mb-0">
          <h1 className="text-2xl font-bold text-orange-400">NjanSanchari</h1>
          <p className="text-xl font-bold">Don't Dream It, Explore It</p>
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
              <span>0812 3456 7890</span>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <span>hello@njansanchari.com</span>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <span>+6222 3456 7891</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h2 className="font-bold mb-2">Quick Tabs</h2>
            <ul>
              <li>About</li>
              <li>Destinations</li>
              <li>Hotels</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-2">Destinations</h2>
            <ul>
              <li>Ooty</li>
              <li>Munnar</li>
              <li>Lakshadweep</li>
              <li>Kodaikanal</li>
              <li>Varkala</li>
              <li>Wayanad</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-2">Support</h2>
            <ul>
              <li>Help Center</li>
              <li>Group Booking</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Register Your Hotel</li>
              <li>Register Your Activities/Events</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-2">Download Our App</h2>
            <div className="flex flex-col space-y-2">
              <img src={AppStore} alt="App Store" className="w-32" />
              <img src={Play} alt="Google Play" className="w-32" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-bold mb-2">Follow Us On</h2>
        <div className="flex space-x-4">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faYoutube} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
