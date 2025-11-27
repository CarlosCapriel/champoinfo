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
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [siteData, setSiteData] = useState(null);

  const getListSitesCard = async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from("sites")
        .select(
          `id, name, quick_description, summary, latitude, longitude, site_amenities(amenities(description, icon)), site_images(url_image)`
        );

      if (search.trim()) {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setSiteCards(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getListSitesCardByType = async (type, search = "") => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("sites")
        .select(
          `id, name, quick_description, summary, latitude, longitude, site_amenities(amenities(description, icon)), site_images(url_image)`
        )
        .eq("type_id", type);

      if (search.trim()) {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setSiteCards(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSiteDataById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("sites")
        .select(
          `id, name, quick_description, about, price_range, latitude, longitude, site_amenities(amenities(description, icon)), site_images(url_image)`
        )
        .eq("id", id)
        .single();
      if (error) throw error;
      setSiteData(data || null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (filterId) => {
    setCurrentFilter(filterId);

    if (filterId === 0) {
      await getListSitesCard(searchTerm);
    } else {
      if (filterId) {
        await getListSitesCardByType(filterId, searchTerm);
      }
    }
  };

  const handleSearch = async (search = "") => {
    setSearchTerm(search);

    if (currentFilter === 0) {
      await getListSitesCard(search);
    } else {
      await getListSitesCardByType(currentFilter, search);
    }
  };

  const resetSites = () => {
    setCurrentFilter(0);
    getListSitesCard();
  };

  return (
    <SiteContext.Provider
      value={{
        siteCards,
        loading,
        error,
        currentFilter,
        searchTerm,
        getListSitesCard,
        getListSitesCardByType,
        handleFilterChange,
        handleSearch,
        resetSites,
        setCurrentFilter,
        setSearchTerm,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
