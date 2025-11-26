import { FaHotel, FaThLarge, FaCalendarAlt, FaUtensils } from "react-icons/fa";
import { UseSiteContext } from "../context/SiteContext";

export default function FilterMenu() {
  const { currentFilter, handleFilterChange } = UseSiteContext();

  const items = [
    { id: 0, label: "Todos", icon: <FaThLarge /> },
    { id: 1, label: "Hoteles", icon: <FaHotel /> },
    { id: 2, label: "Restaurantes", icon: <FaUtensils /> },
    { id: 3, label: "Eventos", icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="row">
      <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
        <div
          className="
            d-flex 
            justify-content-between 
            align-items-center 
            gap-1 
            p-1 
            rounded-3
            w-100
          "
          style={{
            background: "#e4e5e9",
          }}
        >
          {items.map((item) => {
            const isActive = currentFilter === item.id;

            return (
              <div
                key={item.id}
                className="
                  d-flex 
                  align-items-center 
                  justify-content-center 
                  flex-grow-1
                  py-1
                  py-lg-2 
                  rounded-3
                "
                style={{
                  background: isActive ? "white" : "transparent",
                  cursor: "pointer",
                  transition: ".2s",
                  fontWeight: 500,
                  color: isActive ? "#0f1b3d" : "#1c274c",
                }}
                onClick={() => handleFilterChange(item.id)}
              >
                <span className="me-2 d-none d-sm-inline">{item.icon}</span>

                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
