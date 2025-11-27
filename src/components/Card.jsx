import BadgeIcon from "./BadgeIcon";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { children } = props;

  return (
    <div className="col-11 col-md-10 col-lg-8 col-xl-6 mx-auto my-2">
      <div className="card text-decoration-none text-dark shadow-sm">
        <div className="d-flex flex-row align-items-stretch min-height-250">
          {children}
        </div>
      </div>
    </div>
  );
}

export function CardBody(props) {
  const {
    siteName,
    siteQuickDescription,
    siteDescription,
    urlImages,
    amenities,
    id,
    id_tag,
    latitude,
    longitude,
  } = props;

  const navigate = useNavigate();

  const handleOpenGoogleMaps = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (latitude && longitude) {
      const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
    } else {
      console.warn("Coordenadas no disponibles para este sitio");
      alert("Ubicación no disponible para este sitio");
    }
  };

  const handleCardClick = () => {
    // Temporalmente abre YouTube, luego cambiarás por tu ruta
    navigate(`/site/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  const cardStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      <div className="col-4 col-lg-4 position-relative d-flex align-items-stretch">
        <div className="w-100 h-100">
          <Carousel urlImages={urlImages} id={`carousel-${id_tag}`} />
        </div>
      </div>
      <div
        href="https://youtube.com"
        className="card-body col-8 col-lg-8 p-3 d-flex flex-column"
        style={cardStyle}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${siteName}`}
      >
        <h5
          className="card-title fw-bold mb-1 
                      fs-6 fs-md-5 fs-lg-4"
        >
          {siteName}
        </h5>
        <h6
          className="card-subtitle mb-2 text-body-secondary 
                      fs-7 fs-md-6 fs-lg-5"
        >
          {siteQuickDescription}
        </h6>

        <div className="d-flex gap-1 gap-md-2 flex-wrap mb-2">
          {amenities.map((amenity, index) => (
            <BadgeIcon
              key={index}
              icon={amenity.amenities.icon}
              text={amenity.amenities.description}
            />
          ))}
        </div>

        <p className="card-text d-none d-md-block fs-6 fs-lg-5 flex-grow-1 mb-2">
          {siteDescription}
        </p>

        <div className="price-section mt-auto">
          <div className="text-success fw-bold fs-6 fs-md-5">
            {/* Reservado para precio */}
          </div>
        </div>

        <div className="maps-link mt-2">
          <button
            className="btn btn-outline-primary btn-sm w-100"
            onClick={handleOpenGoogleMaps}
            aria-label={`Abrir ubicación de ${siteName} en Google Maps`}
          >
            Ver en Google Maps
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
