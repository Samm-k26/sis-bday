import './Timeline.css';
import { Star, Coffee, Plane, Heart } from 'lucide-react';

const Timeline = () => {
  const events = [
    { year: 'The Beginning', title: 'How We Met', desc: 'The start of a beautiful bond, filled with endless conversations and laughter.', icon: <Star size={24} /> },
    { year: 'Getting Closer', title: 'Late Night Talks', desc: 'Sharing secrets, giving advice, and becoming each other\'s biggest support.', icon: <Coffee size={24} /> },
    { year: 'Adventures', title: 'Exploring Life', desc: 'All the crazy moments, fun outings, and unforgettable memories we created.', icon: <Plane size={24} /> },
    { year: 'Today', title: 'Best Sister & Friend', desc: 'No matter what happens, you will always be my favorite person to annoy.', icon: <Heart size={24} /> },
  ];

  return (
    <section id="timeline" className="section timeline-section">
      <div className="container">
        <h2 className="section-title">Memory Lane</h2>
        <p className="timeline-subtitle">A quick look back at our awesome journey.</p>
        
        <div className="timeline-container">
          {events.map((event, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content glass-panel">
                <div className="timeline-icon">
                  {event.icon}
                </div>
                <h3 className="timeline-year">{event.year}</h3>
                <h4 className="timeline-event-title">{event.title}</h4>
                <p className="timeline-desc">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
