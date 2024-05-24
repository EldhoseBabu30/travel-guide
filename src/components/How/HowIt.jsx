import React from 'react';
import { Parallax } from 'react-parallax';
import Lottie from 'react-lottie';
import tripRequestAnimation from '../../assets/Lottiefiles/request.json';
import craftTripAnimation from '../../assets/Lottiefiles/craft.json';
import bookTripAnimation from '../../assets/Lottiefiles/booking.json';
import takeOffAnimation from '../../assets/Lottiefiles/take.json';
import arrowAnimation from '../../assets/Lottiefiles/arrow.json';
import backgroundImage from '../../assets/banner.jpg';

const HowItWorksSection = () => {
  const steps = [
    {
      animation: tripRequestAnimation,
      title: "Make a Trip Request",
      description: "Your adventure starts now. Make a trip request to your desired destination. It’s simple and fast and will help you find all your needs.",
      color: 'bg-gradient-to-r from-red-100 via-red-200 to-red-300'
    },
    {
      animation: craftTripAnimation,
      title: "Craft Your Trip",
      description: "All our trips are built from the ground up with thoughtful personalization and attention to detail. Discuss options and alternatives until your trip is tweaked to perfection.",
      color: 'bg-gradient-to-r from-green-100 via-green-200 to-green-300'
    },
    {
      animation: bookTripAnimation,
      title: "Book Your Trip",
      description: "The planning is officially done. Now it's time to make that dream trip a reality. Next step, secure your trip by paying the deposit. The countdown to take-off is in sight.",
      color: 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300'
    },
    {
      animation: takeOffAnimation,
      title: "Take Off",
      description: "The countdown is officially over! Your expert is there for you pre-trip, on-trip, and even post-trip with 24/7 support and concierge service. Whatever you need, don’t hesitate.",
      color: 'bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300'
    },
  ];

  const lottieOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    height: 150, // Adjust the height here
    width: 150, // Adjust the width here
  });

  return (
    <Parallax bgImage={backgroundImage} strength={300}>
      <section className="relative py-16 text-center text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Fast & Easy</h2>
          <h3 className="text-3xl font-bold mb-8">Plan Your Dream Trip With Us</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${step.color} rounded-lg p-8 w-full max-w-xs text-left relative`}
                style={{ height: '400px' }}
              >
                <div className="w-full h-36 mb-4 overflow-hidden">
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Lottie options={lottieOptions(step.animation)} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute bottom-4 right-4 transform translate-x-full translate-y-1/2 w-16 h-16 flex justify-center items-center">
                    <Lottie options={lottieOptions(arrowAnimation)} height={50} width={50} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default HowItWorksSection;
