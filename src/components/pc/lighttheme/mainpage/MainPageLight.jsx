import "./MainPageLight.css";
import IPhoneCard from "./IPhoneCard.jsx";
import WatchCard from "./WatchCard.jsx";
import AirPods from "./AirPods.jsx";
import IPadCard from "./iPadCard.jsx";

function MainPageLight() {
  return (
    <>
      <section className="main-page-light">
        <div className="main-page-grid-item-container">
          <IPhoneCard className="main-page-grid-item" />
          <WatchCard className="main-page-grid-item" />
          <AirPods className="main-page-grid-item" />
          <IPadCard className="main-page-grid-item" />
        </div>
      </section>
    </>
  );
}

export default MainPageLight;
