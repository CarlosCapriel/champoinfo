import { createContext, useContext } from "react";
import { useState } from "react";
import { supabase } from "../services/supabase";

export const SiteContext = createContext();

export const UseSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("UseSiteContext must be used within a SiteContextProvider");
  }
  return context;
};

export const SiteContextProvider = ({ children }) => {
  const [siteCards, setSiteCards] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(0);

  const getListSitesCard = async () => {
    const { error, data } = await supabase
      .from("sites")
      .select(
        `id, name,quick_description, summary, latitude, longitude, site_amenities(amenities(description, icon)), site_images(url_image)`
      );
    if (error) throw error;

    setSiteCards(data);
  };

  const getListSitesCardByType = async (type) => {
    const { error, data } = await supabase
      .from("sites")
      .select(
        `id, name,quick_description, summary, latitude, longitude, site_amenities(amenities(description, icon)), site_images(url_image)`
      )
      .eq("type_id", type);
    if (error) throw error;
    setSiteCards(data);
  };

  const handleFilterChange = async (filterId) => {
    setCurrentFilter(filterId);

    if (filterId === 0) {
      await getListSitesCard();
    } else {
      if (filterId) {
        await getListSitesCardByType(filterId);
      }
    }
  };

  return (
    <SiteContext.Provider
      value={{
        siteCards,
        getListSitesCard,
        getListSitesCardByType,
        currentFilter,
        handleFilterChange,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
