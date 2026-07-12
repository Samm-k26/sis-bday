import { useState, useRef } from 'react';
import { Heart, Stars, Gift } from 'lucide-react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import ScratchCard from './ScratchCard';
import './Hero.css';

const Hero = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);

  const handleSurprise = () => {
    setShowScratchCard(true);
  };

  const handleReveal = () => {
    setShowConfetti(true);
  };

  return (
    <section className="hero section">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} />}
      <div className="container hero-container">
        <div className="hero-content glass-panel animate-fade-in-up">
          <div className="hero-badge delay-100">
            <Stars className="icon" size={16} />
            <span>To The Best Sister</span>
          </div>
          <h1 className="hero-title delay-200">
            Happy <span className="gradient-text">Birthday</span>, Komal!
          </h1>
          <p className="hero-subtitle delay-300">
            Wishing you a day filled with love, laughter, and everything your heart desires. You deserve the world and more!
          </p>
          <div className="hero-actions delay-400">
            {!showScratchCard ? (
              <button onClick={handleSurprise} className="btn" style={{ background: 'linear-gradient(45deg, #FFD700, #FF8C00)', color: '#fff' }}>
                <Gift size={20} />
                Open Surprise
              </button>
            ) : (
              <ScratchCard onReveal={handleReveal} />
            )}
            <a href="#gallery" className="btn btn-secondary">
              View Memories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
