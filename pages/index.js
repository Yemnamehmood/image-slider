'use client'
// pages/index.js
import { useEffect, useState } from 'react';

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayInterval = 3000; // 3 seconds

  // Fetch images from Unsplash API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.unsplash.com/photos/random?count=5&client_id=a7i23vuKpEs0Lg2gGu4bNHypI-E2XsVMKLgnCUyo308');
        const data = await response.json();
        setImages(data.map((img) => img.urls.regular));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPlaying, images.length]);

  // Handler to go to the next/previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="slider-container">
      <h1 className="title">Dynamic Image Slider</h1>
      {images.length > 0 ? (
        <div className="slider">
          <img src={images[currentIndex]} alt="Slider Image" className="slider-image" />
          <button className="prev-button" onClick={goToPrevious}>❮</button>
          <button className="next-button" onClick={goToNext}>❯</button>
        </div>
      ) : (
        <p>Loading images...</p>
      )}
      <div className="controls">
        <button onClick={togglePlayPause} className="play-pause-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <footer className="footer">
        &copy; Image Slider by Yemna Mehmood
      </footer>
    </div>
  );
};

export default ImageSlider;
