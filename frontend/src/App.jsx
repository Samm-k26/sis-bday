import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import PasswordScreen from './components/PasswordScreen';
import Timeline from './components/Timeline';
import Reasons from './components/Reasons';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <PasswordScreen onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Reasons />
        <Gallery />
      </main>
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)', background: 'rgba(0,0,0,0.05)' }}>
        <p>Made with ❤️ by Samyak and Swajal</p>
      </footer>
    </>
  );
}

export default App;
