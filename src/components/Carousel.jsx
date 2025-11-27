import { useState, useEffect } from "react";

function Carousel({ urlImages, id = "carousel" }) {
  const apiBaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const folderSiteImages = import.meta.env.VITE_FOLDER_SITE_IMAGES;
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === urlImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? urlImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (urlImages.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [urlImages.length]);

  return (
    <div id={id} className="carousel slide h-100">
      <div className="carousel-inner h-100 rounded-start">
        {urlImages.map((urlImage, index) => (
          <div
            className={`carousel-item h-100 ${
              index === activeIndex ? "active" : ""
            }`}
            key={index}
          >
            {/* Contenedor con relación de aspecto fija */}
            <div className="ratio ratio-1x1 h-100">
              {" "}
              {/* Cambia ratio-1x1 por ratio-16x9 si prefieres 16:9 */}
              <img
                src={`${apiBaseUrl}${folderSiteImages}/${urlImage.url_image}`}
                className="d-block w-100 h-100"
                alt={`Slide ${index + 1}`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {urlImages.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            onClick={prevSlide}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={nextSlide}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}

export default Carousel;
