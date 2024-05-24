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
    },
    {
      animation: craftTripAnimation,
      title: "Craft Your Trip",
      description: "All our trips are built from the ground up with thoughtful personalization and attention to detail. Discuss options and alternatives until your trip is tweaked to perfection.",
    },
    {
      animation: bookTripAnimation,
      title: "Book Your Trip",
      description: "The planning is officially done. Now it's time to make that dream trip a reality. Next step, secure your trip by paying the deposit. The countdown to take-off is in sight.",
    },
    {
      animation: takeOffAnimation,
      title: "Take Off",
      description: "The countdown is officially over! Your expert is there for you pre-trip, on-trip, and even post-trip with 24/7 support and concierge service. Whatever you need, don’t hesitate.",
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
                className={`bg-gray-800 rounded-lg p-8 max-w-xs w-full text-left relative ${
                  index < steps.length - 1 ? 'mr-8' : ''
                }`}
              >
                <div className="w-24 h-24 mx-auto mb-4">
                  <Lottie options={lottieOptions(step.animation)} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-pink-500">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute bottom-0 right-0 transform translate-x-full translate-y-1/2 w-16 h-16 flex justify-center items-center">
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
