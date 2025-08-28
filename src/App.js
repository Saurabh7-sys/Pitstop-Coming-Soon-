import React, { useState, useEffect, useRef } from 'react';
import { Container, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import carIcon from "./assets/carIcon.svg";
import bus from "./assets/bus.png";
import gear1 from "./assets/gear1.png";
import phone from "./assets/phone.png";
import signal from "./assets/signal.png";
import key from "./assets/key.png";
import gear2 from "./assets/gear2.png";
import Logo from "./assets/PitStopLogo.webp";
import Uae from "./assets/Uae.webp";
import Marquee from "react-fast-marquee";
// import './index.css';
import './App.css'

const ComingSoonPage = ({ 
  progressSpeed = 0.5,  
  progressInterval = 30,  
  backgroundCycleTime = 2000,  
  resetDelay = 1000  
}) => {
  const [progress, setProgress] = useState(0);
  const [currentBg, setCurrentBg] = useState(0);
  const [activeIcons, setActiveIcons] = useState([false, false, false, false, false, false]);
  const [animationState, setAnimationState] = useState("running");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const currentStepRef = useRef(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const bgIntervalRef = useRef(null);

  // Icon positions (percentage points where icons should highlight)
  const iconPositions = [20, 35, 50, 65, 80, 95];

  // Background classes for different stages
  const backgrounds = [
    'bg-stage-1',
    'bg-stage-2',
    'bg-stage-3',
    'bg-stage-4',
  ];

  // Function to cycle through background colors
  const cycleBackground = () => {
    setCurrentBg((prevBg) => (prevBg + 1) % backgrounds.length);
  };

  // Function to handle the animation steps
  const runAnimation = () => {
    // Clear any existing intervals and timeouts
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (animationState === "running") {
      intervalRef.current = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress < 100) {
            // Use the configurable progress speed
            const newProgress = Math.min(prevProgress + progressSpeed, 100);

            // Update active icons
            const newActiveIcons = iconPositions.map(pos => newProgress >= pos);
            setActiveIcons(newActiveIcons);

            // If we've reached 100%, reset the animation
            if (newProgress === 100) {
              clearInterval(intervalRef.current);
              
              timeoutRef.current = setTimeout(() => {
                setAnimationState("reset");
              }, resetDelay);
            }

            return newProgress;
          }
          return prevProgress;
        });
      }, progressInterval);
    } else if (animationState === "reset") {
      // Reset everything
      setProgress(0);
      setActiveIcons([false, false, false, false, false, false]);

      // Start over immediately
      setAnimationState("running");
    }
  };

  // Effect to manage the animation state
  useEffect(() => {
    runAnimation();

    // Cleanup function
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [animationState, progressSpeed, progressInterval, resetDelay]);

  // Effect to cycle background colors independently
  useEffect(() => {
    bgIntervalRef.current = setInterval(cycleBackground, backgroundCycleTime);

    // Cleanup function
    return () => {
      if (bgIntervalRef.current) clearInterval(bgIntervalRef.current);
    };
  }, [backgroundCycleTime]);

  // Effect to detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate car position
  const carPosition = `${progress}%`;

  return (
    
    <div className= "min-vh-100 d-flex flex-column ml-0 justify-content-between bgcontainer  parentClass" >
    {/* // <div className={`min-vh-100 d-flex flex-column ml-0 justify-content-between ${backgrounds[currentBg]}`}> */}
      {/* Background Image */}
      <div className="background-image"></div>
      
      {/* Logo Container */}
      <div className={`logo-container ${isMobile ? 'logo-mobile' : 'logo-desktop'}`}>
        <img className="logo" src={Logo} alt="PitStop Logo" />
      </div>
      <div className="uae-container">
        <img className="uae" src={Uae} alt="uae Logo" />
      </div>

      {/* Empty space in the middle */}
      <div className="flex-grow-1"></div>

      {/* Progress Bar Section */}
      <div className="container d-none d-md-block mb-5">
        <div className="w-100 position-relative progress-container">
          
          <div className="d-flex justify-content-between icon-container">
            <IconButton active={activeIcons[0]} icon="tools" />
            <IconButton active={activeIcons[1]} icon="tools2" />
            <IconButton active={activeIcons[2]} icon="truck" />
            <IconButton active={activeIcons[3]} icon="search" />
            <IconButton active={activeIcons[4]} icon="document" />
            <IconButton active={activeIcons[5]} icon="wrench" />
          </div>

          
          <div className="position-relative">
            <ProgressBar now={progress} variant="warning" className="custom-progress" />
            <div className="car-icon" style={{ left: carPosition, transition: "left 0.1s linear" }}>
              <div className="car-container">
                <img src={carIcon} alt="Car" className="carIcon" />
              </div>
            </div>
          </div>
        </div>
      </div> 

       <div className="w-100 py-3 coming-soon-footer">
        <div className="marquee">
          {[...Array(60)].map((_, i) => (
            <span key={i} className="coming-soon-text">
              <span className="text-secondary comingSoon">Coming Soon</span>
              <span className="text-white comingSoon">Coming Soon</span>
            </span>
          ))}
        </div>
      </div> 

<div className="w-100 py-3 coming-soon-footer">
  <div className="marquee">
    {/* First set of items */}
    {[...Array(30)].map((_, i) => (
      <span key={`first-${i}`} className="coming-soon-text">
        <span className="text-secondary comingSoon">Coming Soon</span>
        <span className="text-white comingSoon">Coming Soon</span>
      </span>
    ))}
    {/* Duplicate set of items to create seamless loop */}
    {[...Array(30)].map((_, i) => (
      <span key={`second-${i}`} className="coming-soon-text">
        <span className="text-secondary comingSoon">Coming Soon</span>
        <span className="text-white comingSoon">Coming Soon</span>
      </span>
    ))}
  </div>
</div>
    </div>
  );
};


const IconButton = ({ active, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'tools':
        return <img src={gear2} alt="Gear" width="24" height="24" />;
      case 'tools2':
        return <img src={gear1} alt="Gear" width="24" height="24" />;
      case 'truck':
        return <img src={bus} alt="Bus" width="24" height="24" />;
      case 'search':
        return <img src={signal} alt="Signal" width="24" height="24" />;
      case 'document':
        return <img src={phone} alt="Phone" width="24" height="24" />;
      case 'wrench':
        return <img src={key} alt="Key" width="24" height="24" />;
      default:
        return null;
    }
  };

  return (
    <div className={`icon-button ${active ? 'active' : ''}`}>
      {getIcon()}
    </div>
  );
};

export default ComingSoonPage;