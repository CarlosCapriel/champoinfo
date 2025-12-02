import { useEffect } from "react";
import Card, { CardBody } from "../components/Card";
import { UseSiteContext } from "../context/SiteContext";

function CardList() {
  const { siteCards, getListSitesCard } = UseSiteContext();
  console.log("siteCards in CardList:", siteCards);
  useEffect(() => {
    if (siteCards.length === 0) {
      getListSitesCard();
    }
  }, [siteCards]);
  return (
    <>
      {siteCards.map((site, index) => (
        <Card key={index}>
          <CardBody
            siteName={site.name}
            siteQuickDescription={site.quick_description}
            siteDescription={site.summary}
            urlImages={site.site_images}
            amenities={site.site_amenities}
            id={site.id}
            id_tag={index}
            latitude={site.latitude}
            longitude={site.longitude}
          />
        </Card>
      ))}
    </>
  );
}

export default CardList;
