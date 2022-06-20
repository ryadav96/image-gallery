import React, { useEffect } from "react";
import "./index.css";

function ImageGallery() {
  const [images, setImages] = React.useState([]);
  const [numberOfImages, setNumberOfImages] = React.useState(0);

  const fetchImages = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await response.json();
    setImages(data);
    setNumberOfImages(10);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  const renderImagesGallery = () => {
    const currentImages = images.slice(numberOfImages, numberOfImages + 10);
    return currentImages
      .map((image, index) => {
        return (
          <a href={image.url} target="_blank" rel="noopener noreferrer">
            <div className="image-gallery-item" key={index}>
              <img
                src={image.thumbnailUrl}
                className="image"
                alt={image.title}
              />
              <div className="image-title">
                <h3>{image.title}</h3>
              </div>
            </div>
          </a>
        );
      })
      .slice(0, 30);
  };

  const handlePrev = () => {
    if (numberOfImages > 10) {
      setNumberOfImages((prevState) => prevState - 10);
    }
  };

  const handleNext = () => {
    setNumberOfImages((prevState) => prevState + 10);
  };

  const Pagination = () => {
    return (
      <div className="pagination">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    );
  };

  return (
    <>
      <div className="images-container">{renderImagesGallery()}</div>
      <div className="images-container">{Pagination()}</div>
    </>
  );
}

export default ImageGallery;
