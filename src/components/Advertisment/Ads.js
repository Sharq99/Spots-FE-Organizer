import AdsList from "../../Ads/AdsList";
import AdSpots from "../../AdSpots/AdSpots";
function Ads() {
  return (
    <div className="whitebackgroundad">
      <AdSpots />
      <AdsList />
    </div>
  );
}

export default Ads;
