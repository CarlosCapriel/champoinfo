import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseSiteContext } from "../context/SiteContext";
import Carousel from "../components/Carousel";
import BadgeIcon from "../components/BadgeIcon";
import DOMPurify from "dompurify";

function InformationSite() {
  const { id } = useParams();
  const { getSiteDataById, siteData, loading, error } = UseSiteContext();

  useEffect(() => {
    if (id) {
      getSiteDataById(id);
    }
  }, [id]);

  // Estados de carga y error
  if (loading) {
    return (
      <div className="col-12 col-lg-9 d-flex justify-content-center align-items-center mx-auto">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-12 col-lg-9 mx-auto">
        <div className="alert alert-danger" role="alert">
          Error al cargar los datos: {error}
        </div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div className="col-12 col-lg-9 mx-auto">
        <div className="alert alert-warning" role="alert">
          No se encontró información para este sitio.
        </div>
      </div>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${siteData.latitude},${siteData.longitude}`;

  const sanitizedAbout = DOMPurify.sanitize(siteData.about);

  return (
    <div className="col-12 col-lg-9 d-flex flex-column mx-auto">
      <div className="mb-3" style={{ height: "50vh", maxHeight: "500px" }}>
        <Carousel urlImages={siteData.site_images} id="info-site-carousel" />
      </div>

      <h5 className="mt-3">{siteData.name}</h5>
      <p className="text-muted">{siteData.quick_description}</p>

      <div>
        <h6>Acerca de</h6>
        <p
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: sanitizedAbout }}
        ></p>
      </div>

      <div className="row mt-3">
        <div className="order-1 order-md-2 col-12 col-md-4 mb-3">
          <div className="p-3 border rounded shadow-sm d-flex flex-column gap-2">
            <div>
              <strong>Rango de precios:</strong>
              <p className="m-0">{siteData.price_range}</p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-100"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>

        <div className="order-2 order-md-1 col-12 col-md-8">
          <h6 className="mb-2">Lo que ofrece:</h6>
          <div className="d-flex gap-2 flex-wrap mb-2">
            {siteData.site_amenities.map((amenity, index) => (
              <BadgeIcon
                key={index}
                icon={amenity.amenities.icon}
                text={amenity.amenities.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationSite;
