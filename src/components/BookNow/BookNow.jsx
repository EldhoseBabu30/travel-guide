import React, { useState } from 'react';
import Lottie from 'react-lottie';
import emailjs from 'emailjs-com';
import balloonAnimation from '../../assets/Lottiefiles/reservation.json'; // Replace with your Lottie animation file path
import checkSuccessAnimation from '../../assets/Lottiefiles/checking.json'; // Replace with your Lottie animation file path
import bookSuccessAnimation from '../../assets/Lottiefiles/email.json'; // Replace with your Lottie animation file path

const BookNowSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    tickets: '',
    message: '',
    newsletter: false,
  });

  const [showAnimation, setShowAnimation] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  const lottieOptions = (animation) => ({
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;

    if (action === 'checkAvailability') {
      sendEmail('Check Availability', checkSuccessAnimation);
    } else if (action === 'bookNow') {
      sendEmail('Book Now', bookSuccessAnimation);
    }
  };

  const sendEmail = (requestType, animation) => {
    const templateParams = {
      from_name: formData.name,
      email_id: formData.email,
      phone: formData.phone,
      date: formData.date,
      tickets: formData.tickets,
      message: formData.message,
      newsletter: formData.newsletter ? 'Yes' : 'No',
      request_type: requestType,
    };

    emailjs
      .send('service_pyekxjn', 'template_p2oo20m', templateParams, 'XMO9tIIzOkdU0UaPk')
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert(`${requestType} request sent successfully!`);
          triggerAnimation(animation);
        },
        (error) => {
          console.error('FAILED...', error);
          alert(`Failed to send ${requestType} request. Please try again.`);
        }
      );
  };

  const triggerAnimation = (animation) => {
    setAnimationData(animation);
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000); // 3 seconds
  };

  return (
    <section className="relative py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-red-500 text-2xl font-bold mb-2">Book Now</h2>
        <h3 className="text-4xl font-bold mb-4">Plan Your Trip</h3>
        <p className="text-lg mb-8">Why wait? Start planning your dream getaway today with Triplify and turn your travel dreams into reality!</p>
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-start gap-8">
          <div className="flex-1 flex justify-center items-center lg:justify-start lg:items-start">
            <Lottie options={lottieOptions(balloonAnimation)} height={400} width={400} />
          </div>
          <div className="flex-1 bg-gray-200 p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-100" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded bg-gray-100" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded bg-gray-100" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 rounded bg-gray-100" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Number Of Tickets</label>
                <input type="number" name="tickets" value={formData.tickets} onChange={handleChange} className="w-full p-2 rounded bg-gray-100" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-2 rounded bg-gray-100" rows="4"></textarea>
              </div>
              <div className="mb-4 flex items-center">
                <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="mr-2" />
                <label className="text-gray-700">Subscribe to our newsletter</label>
              </div>
              <div className="flex justify-between">
                <button type="submit" name="checkAvailability" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                  Check Availability
                </button>
                <button type="submit" name="bookNow" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animation-move-and-zoom">
          <Lottie options={lottieOptions(animationData)} height={200} width={200} />
        </div>
      )}
    </section>
  );
};

export default BookNowSection;
