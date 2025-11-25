import { iconMapper } from "../utils/iconMapper";

function BadgeIcon({ icon, text, size = 22 }) {
  const IconComponent = iconMapper[icon];

  if (!IconComponent) {
    console.warn(`Icono "${icon}" no encontrado`);
    return null;
  }

  return (
    <>
      <span className="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
        <IconComponent size={size} className="me-1" alt="" />
        {text}
      </span>
    </>
  );
}
export default BadgeIcon;
