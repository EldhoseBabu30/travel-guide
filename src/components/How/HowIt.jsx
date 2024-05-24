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
      description: "Start your adventure with a simple trip request to your desired destination.",
      color: 'bg-gradient-to-r from-gray-200 to-gray-100'
    },
    {
      animation: craftTripAnimation,
      title: "Craft Your Trip",
      description: "Personalize and tweak your trip until it’s perfect for you.",
      color: 'bg-gradient-to-r from-gray-200 to-gray-100'
    },
    {
      animation: bookTripAnimation,
      title: "Book Your Trip",
      description: "Secure your trip by paying the deposit. Get ready to take off!",
      color: 'bg-gradient-to-r from-gray-200 to-gray-100'
    },
    {
      animation: takeOffAnimation,
      title: "Take Off",
      description: "Enjoy 24/7 support during your trip for a worry-free experience.",
      color: 'bg-gradient-to-r from-gray-200 to-gray-100'
    },
  ];

  const lottieOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
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
                className={`${step.color} rounded-lg p-6 w-full max-w-xs text-left relative transition duration-500 transform hover:scale-105 hover:shadow-xl`}
                style={{ height: '320px' }}
              >
                <div className="w-full h-28 mb-4 overflow-hidden flex justify-center items-center border border-gray-300 rounded-md">
                  <Lottie options={lottieOptions(step.animation)} height={170} width={170} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute bottom-4 right-4 transform translate-x-full translate-y-1/2 w-12 h-12 flex justify-center items-center">
                    <Lottie options={lottieOptions(arrowAnimation)} height={40} width={40} />
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
