import { useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      });
      if (res.ok) {
        setName('');
        setMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Failed to post message', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="messages" className="section messages-section">
      <div className="container">
        <h2 className="section-title">Leave a Wish</h2>
        
        <div className="messages-layout">
          {/* Form */}
          <div className="message-form-container glass-panel">
            <h3>Write a Message</h3>
            <form onSubmit={handleSubmit} className="message-form">
              <div className="input-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Swajal" 
                  required 
                />
              </div>
              <div className="input-group">
                <label>Your Message</label>
                <textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Happy Birthday Komal! ..." 
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? <Loader2 className="spin icon" size={20} /> : <Send size={20} />}
                Send Wish
              </button>
            </form>
          </div>

          {/* Messages List */}
          <div className="messages-list-container">
            {fetching ? (
              <div className="loading-state">
                <Loader2 className="spin" size={32} />
                <p>Loading wishes...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="empty-state glass-panel">
                <p>No wishes yet. Be the first to leave one!</p>
              </div>
            ) : (
              <div className="messages-grid">
                {messages.map((msg) => (
                  <div key={msg.id} className="message-card glass-panel">
                    <p className="message-text">"{msg.message}"</p>
                    <p className="message-author">- {msg.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
