import Carousel from "../components/Carousel";
import BadgeIcon from "../components/BadgeIcon";

function InformationSite() {
  const siteData = {
    id: 2,
    name: "Pelicano´s",
    quick_description: "Con un exquisito sabor",
    summary: "Restaurante mexicano con lo mejor del mar...",
    about:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet loremipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ",
    latitude: 19.34163092396336,
    longitude: -90.73300883357103,
    price_range: "$$ - $$$",
    site_amenities: [
      { amenities: { icon: "FaMusic", description: "Música en vivo" } },
      { amenities: { icon: "GiShrimp", description: "Mariscos" } },
      { amenities: { icon: "FaWineBottle", description: "Bar" } },
    ],
    site_images: [
      { url_image: "restaurants/2-pelicanos/dish-pelicanos.jpg" },
      { url_image: "restaurants/2-pelicanos/dish-pelicanos.png" },
      { url_image: "restaurants/2-pelicanos/pelicanos.jpg" },
      { url_image: "restaurants/2-pelicanos/pelicanossite.jpg" },
    ],
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${siteData.latitude},${siteData.longitude}`;

  return (
    <div className="col-12 col-lg-9 d-flex flex-column mx-auto">
      <div className="mb-3" style={{ height: "50vh", maxHeight: "500px" }}>
        <Carousel urlImages={siteData.site_images} id="info-site-carousel" />
      </div>

      <h5 className="mt-3">{siteData.name}</h5>
      <p className="text-muted">{siteData.quick_description}</p>

      <div>
        <h6>Acerca de</h6>
        <p style={{ textAlign: "justify" }}>{siteData.about}</p>
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
