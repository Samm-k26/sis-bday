import './Reasons.css';
import { Shield, Laugh, Sparkles, Coffee } from 'lucide-react';

const Reasons = () => {
  const reasons = [
    { title: 'Always My Shield', desc: 'You always protect me and stand by my side no matter what happens.', icon: <Shield size={32} /> },
    { title: 'Best Sense of Humor', desc: 'Nobody can make me laugh as hard as you do with your crazy jokes.', icon: <Laugh size={32} /> },
    { title: 'Late Night Talks', desc: 'The 2 AM gossips and deep conversations over coffee or maggi.', icon: <Coffee size={32} /> },
    { title: 'Pure Magic', desc: 'You bring a special kind of energy and sparkle to our family.', icon: <Sparkles size={32} /> }
  ];

  return (
    <section id="reasons" className="section reasons-section">
      <div className="container">
        <h2 className="section-title">Why You're The Best</h2>
        <div className="reasons-grid">
          {reasons.map((reason, idx) => (
            <div key={idx} className="reason-card glass-panel">
              <div className="reason-icon">
                {reason.icon}
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reasons;
