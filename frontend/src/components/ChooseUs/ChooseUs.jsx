import React from 'react';
import Lottie from 'react-lottie';
import guidedTourAnimation from '../../assets/Lottiefiles/guide.json';
import hiddenDestinationAnimation from '../../assets/Lottiefiles/destination.json';
import exclusiveDealsAnimation from '../../assets/Lottiefiles/deals.json';
import customerServiceAnimation from '../../assets/Lottiefiles/support.json';

const ServicesSection = () => {
  const sectionStyle = {
    backgroundColor: '#f0f0f0', // Light grey background
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '4rem 0',
  };

  const bgImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("path-to-your-background-image.png")', // Add your background image path here
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: 0.1,
    zIndex: 0,
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#fb923c', // Tailwind CSS orange-400 hex code
  };

  const cardStyle = {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    zIndex: 10,
  };

  const containerStyle = {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    zIndex: 10,
  };

  const lottieOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  });

  return (
    <section style={sectionStyle}>
      <div style={bgImageStyle}></div>
      <div className="relative z-10 container mx-auto">
        <h2 style={headingStyle} className="color-animation">WE OFFER BEST SERVICES</h2>
        <div style={containerStyle} className="responsive-container">
          <div style={cardStyle} className="hover:transform hover:scale-105 responsive-card">
            <Lottie options={lottieOptions(guidedTourAnimation)} height={150} width={150} />
            <h3 className="text-xl font-semibold mb-2">Guided Tours</h3>
            <p className="text-gray-600">Guided tours provided by Njansanchari offer travelers the opportunity to explore destinations with the expertise of knowledgeable guides.</p>
          </div>
          <div style={cardStyle} className="hover:transform hover:scale-105 responsive-card">
            <Lottie options={lottieOptions(hiddenDestinationAnimation)} height={150} width={150} />
            <h3 className="text-xl font-semibold mb-2">Hidden Destinations</h3>
            <p className="text-gray-600">Njansanchari scours through various destinations to uncover hidden gems and off-the-beaten-path locations for travelers.</p>
          </div>
          <div style={cardStyle} className="hover:transform hover:scale-105 responsive-card">
            <Lottie options={lottieOptions(exclusiveDealsAnimation)} height={150} width={150} />
            <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
            <p className="text-gray-600">Exclusive deals offered by Njansanchari are special offers and discounts available only to users of the Njansanchari platform.</p>
          </div>
          <div style={cardStyle} className="hover:transform hover:scale-105 responsive-card">
            <Lottie options={lottieOptions(customerServiceAnimation)} height={150} width={150} />
            <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
            <p className="text-gray-600">Travel plans can change unexpectedly, which is why Njansanchari's customer support is available round-the-clock.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes colorSlide {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .color-animation {
          background-size: 200% 200%;
          animation: colorSlide 5s linear infinite;
        }

        @media (max-width: 768px) {
          .responsive-container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .responsive-card {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
