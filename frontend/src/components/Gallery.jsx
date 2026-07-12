import './Gallery.css';

const Gallery = () => {
  const photos = [
    { id: 1, url: '/images/media__1783843814978.jpg', caption: 'Happy Moments' },
    { id: 2, url: '/images/media__1783843818498.jpg', caption: 'Smiles & Laughter' },
    { id: 3, url: '/images/media__1783843821090.jpg', caption: 'Celebrations' },
    { id: 4, url: '/images/media__1783843824042.jpg', caption: 'Birthday Vibes' },
    { id: 5, url: '/images/media__1783843833745.jpg', caption: 'Party Time' },
    { id: 6, url: '/images/media__1783843954320.jpg', caption: 'Great Times' },
    { id: 7, url: '/images/media__1783843957578.jpg', caption: 'Making Memories' },
    { id: 8, url: '/images/media__1783843963476.jpg', caption: 'Together' },
    { id: 9, url: '/images/media__1783843967420.jpg', caption: 'Good Vibes' },
    { id: 10, url: '/images/media__1783843971210.jpg', caption: 'Forever' }
  ];

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <h2 className="section-title">Beautiful Memories</h2>
        <p className="gallery-subtitle">A collection of our favorite moments together.</p>
        
        <div className="gallery-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="gallery-item glass-panel">
              <div className="img-wrapper">
                <img src={photo.url} alt={photo.caption} loading="lazy" />
              </div>
              <div className="caption">
                <p>{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
