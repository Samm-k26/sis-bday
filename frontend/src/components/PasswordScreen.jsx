import { useState, useEffect, useRef } from 'react';
import './PasswordScreen.css';
import { Lock, Delete } from 'lucide-react';

const PasswordScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);

  // Auto-submit when 4 digits are entered
  useEffect(() => {
    if (password.length === 4) {
      if (password === '1407') {
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setPassword('');
        }, 800);
      }
    }
  }, [password, onUnlock]);

  // Scratch card canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Fill with gift gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff7eb3');
    gradient.addColorStop(1, '#ff758c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw Gift Emoji
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎁', canvas.width / 2, canvas.height / 2 - 30);
    
    // Draw Text
    ctx.font = 'bold 24px "Segoe UI", sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Scratch to open!', canvas.width / 2, canvas.height / 2 + 50);

  }, []);

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleStart = (e) => {
    setIsDrawing(true);
    scratch(e);
  };

  const handleEnd = () => {
    setIsDrawing(false);
    checkReveal();
  };

  const handleMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    scratch(e);
  };

  const scratch = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPointerPos(e);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, 2 * Math.PI);
    ctx.fill();
  };

  const checkReveal = () => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    let transparentPixels = 0;
    // Step by 16 for better performance (check every 4th pixel)
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }
    
    const transparentPercentage = transparentPixels / (pixels.length / 16);
    if (transparentPercentage > 0.35) { // 35% scratched reveals it
      setIsScratched(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleNumber = (num) => {
    if (password.length < 4 && !error) {
      setPassword(prev => prev + num);
    }
  };

  const handleDelete = () => {
    if (!error) {
      setPassword(prev => prev.slice(0, -1));
    }
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      dots.push(
        <div key={i} className={`dot ${i < password.length ? 'filled' : ''}`} />
      );
    }
    return dots;
  };

  return (
    <div className="password-screen">
      <div className="password-card glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Scratch Overlay */}
        <canvas
          ref={canvasRef}
          width={350}
          height={520}
          className={`password-scratch-canvas ${isScratched ? 'revealed' : ''}`}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseMove={handleMove}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
        />

        <div className="password-content" style={{ opacity: isScratched ? 1 : 0.2, transition: 'opacity 0.5s' }}>
          <div className="icon-container">
            <Lock size={40} className="lock-icon" />
          </div>
          <h2>Enter PIN</h2>
          <p>Secret access required.</p>
          
          <div className={`dots-container ${error ? 'error' : ''}`}>
            {renderDots()}
          </div>
          
          <div className="error-container">
            <p className="error-text" style={{ opacity: error ? 1 : 0 }}>Incorrect PIN.</p>
          </div>

          <div className="numpad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button key={num} onClick={() => handleNumber(num.toString())} className="num-btn">
                {num}
              </button>
            ))}
            <button className="num-btn empty" disabled></button>
            <button onClick={() => handleNumber('0')} className="num-btn">0</button>
            <button onClick={handleDelete} className="num-btn delete-btn">
              <Delete size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordScreen;
