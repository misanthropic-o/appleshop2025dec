import { useTheme } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HeaderPC from "./components/HeaderPC";
import FooterPC from "./components/FooterPC";
import Breadcrumbs from "./components/Breadcrumbs";
import ProtectedRoute from "./components/ProtectedRoute";
import BackToTop from "./components/BackToTop";

import MainPageLight from "./components/pc/lighttheme/mainpage/MainPageLight";
import WatchPage from "./components/pc/lighttheme/watchpage/WatchPage";
import IPhonePage from "./components/pc/lighttheme/iphonepage/IPhonePage";
import IPadPage from "./components/pc/lighttheme/ipadpage/IPadPage";
import CartPage from "./components/pc/lighttheme/cartpage/CartPage";
import AirPodsPage from "./components/pc/lighttheme/airpodspage/AirPodsPage.jsx";
import SignUpPage from "./components/pc/lighttheme/signuppage/SignUpPage.jsx";
import LogInPage from "./components/pc/lighttheme/loginpage/LogInPage.jsx";

import MainPageDark from "./components/pc/darktheme/mainpage/MainPageDark";
import WatchPageDark from "./components/pc/darktheme/watchpage/WatchPage";
import IPhonePageDark from "./components/pc/darktheme/iphonepage/IPhonePage";
import IPadPageDark from "./components/pc/darktheme/ipadpage/IPadPage";
import CartPageDark from "./components/pc/darktheme/cartpage/CartPage";
import AirPodsPageDark from "./components/pc/darktheme/airpodspage/AirPodsPage.jsx";
import SignUpPageDark from "./components/pc/darktheme/signuppage/SignUpPage.jsx";
import LogInPageDark from "./components/pc/darktheme/loginpage/LogInPage.jsx";

function AppContent() {
  const { isDark } = useTheme();

  return (
    <Router>
      <div className="app">
        <HeaderPC />
        <Breadcrumbs />
        <main className="main-content">
          <Routes>
            <Route path="/" element={isDark ? <MainPageDark /> : <MainPageLight />} />
            <Route path="/home" element={isDark ? <MainPageDark /> : <MainPageLight />} />
            <Route path="/iphone" element={isDark ? <IPhonePageDark /> : <IPhonePage />} />
            <Route path="/ipad" element={isDark ? <IPadPageDark /> : <IPadPage />} />
            <Route path="/airpods" element={isDark ? <AirPodsPageDark /> : <AirPodsPage />} />
            <Route path="/watch" element={isDark ? <WatchPageDark /> : <WatchPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  {isDark ? <CartPageDark /> : <CartPage />}
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={isDark ? <SignUpPageDark /> : <SignUpPage />} />
            <Route path="/login" element={isDark ? <LogInPageDark /> : <LogInPage />} />
          </Routes>
        </main>
        <FooterPC />
        <BackToTop />
      </div>
    </Router>
  );
}

export default AppContent;
