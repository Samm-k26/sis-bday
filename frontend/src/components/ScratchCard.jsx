import { useRef, useEffect, useState } from 'react';
import './ScratchCard.css';

const ScratchCard = ({ onReveal }) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Fill with silver color
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text overlay
    ctx.font = '20px "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#666';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch Here! 🪙', canvas.width / 2, canvas.height / 2 + 6);

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
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fill();
  };

  const checkReveal = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    let transparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }
    
    const transparentPercentage = transparentPixels / (pixels.length / 4);
    if (transparentPercentage > 0.4) {
      setIsRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (onReveal) onReveal();
    }
  };

  return (
    <div className="scratch-card-container">
      <div className="scratch-content">
        <h3>Best Sister Ever! 🎉</h3>
        <p>Love you always! 🎂💖</p>
      </div>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className={`scratch-canvas ${isRevealed ? 'revealed' : ''}`}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseMove={handleMove}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onTouchMove={handleMove}
      />
    </div>
  );
};

export default ScratchCard;
