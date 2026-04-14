import { useLocation, Link } from "react-router-dom";
import "./Breadcrumbs.css";
import { useTheme } from "../contexts/ThemeContext";

function Breadcrumbs() {
  const location = useLocation();
  const { isDark } = useTheme();
  const pathname = location.pathname;

  const breadcrumbMap = {
    "/": "Главная",
    "/home": "Главная",
    "/iphone": "iPhone",
    "/ipad": "ipad",
    "/airpods": "AirPods",
    "/watch": "Watch",
    "/cart": "Корзина",
    "/login": "Вход",
    "/signup": "Регистрация",
  };

  const breadcrumbItems = [{ path: "/", label: "Главная" }];

  if (pathname !== "/" && pathname !== "/home") {
    const label = breadcrumbMap[pathname] || pathname;
    breadcrumbItems.push({ path: pathname, label });
  }

  return (
    <nav className={isDark ? "breadcrumbs-dark" : "breadcrumbs"}>
      {breadcrumbItems.map((item, index) => (
        <div key={item.path} className="breadcrumb-item">
          {index < breadcrumbItems.length - 1 ? (
            <>
              <Link to={item.path}>{item.label}</Link>
              <span className="breadcrumb-separator"> / </span>
            </>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
