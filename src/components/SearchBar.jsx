import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { UseSiteContext } from "../context/SiteContext";

export default function SearchBar() {
  const { handleSearch, searchTerm, setSearchTerm } = UseSiteContext();
  const [localSearch, setLocalSearch] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(localSearch);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(localSearch);
    }
  };

  const handleIconClick = () => {
    handleSearch(localSearch);
  };

  const handleClear = () => {
    setLocalSearch("");
    handleSearch("");
  };

  return (
    <div className="row mt-3 mb-3">
      <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="position-relative">
            <FaSearch
              className="position-absolute"
              style={{
                top: "50%",
                left: "15px",
                transform: "translateY(-50%)",
                color: "#888",
                cursor: "pointer",
                zIndex: 10,
              }}
              onClick={handleIconClick}
            />
            <input
              type="text"
              className="form-control ps-5 rounded-3"
              placeholder="Buscar hoteles, restaurantes, eventos..."
              style={{
                height: "50px",
                border: "1px solid #ddd",
              }}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {localSearch && (
              <button
                type="button"
                className="btn btn-link position-absolute"
                style={{
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  color: "#888",
                  textDecoration: "none",
                  fontSize: "18px",
                }}
                onClick={handleClear}
              >
                ×
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
