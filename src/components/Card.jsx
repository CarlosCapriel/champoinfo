import BadgeIcon from "./BadgeIcon";
import Carousel from "./Carousel";

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
  } = props;

  const cardStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      <div className="col-4 col-lg-4 position-relative">
        <Carousel urlImages={urlImages} id={`carousel-${id}`} />
      </div>
      <a
        href="https://youtube.com"
        className="card-body col-8 col-lg-8 p-3 d-flex flex-column"
        style={cardStyle}
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

        {/* Amenities */}
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
          <button className="btn btn-outline-primary btn-sm w-100">
            Ver en Google Maps
          </button>
        </div>
      </a>
    </>
  );
}

export default Card;
