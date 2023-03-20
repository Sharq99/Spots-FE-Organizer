import { observer } from "mobx-react";
import spotStore from "../stores/spotStore";
import swal from "sweetalert";
import { useState } from "react";
import { baseURL } from "../stores/instance";

function AdSpotsItems({ spot }) {
  const today = new Date();
  today.setHours(3, 0, 0, 0);
  const [TrueSpot, setTrueSpot] = useState({
    isAd: true,
  });
  const advertisedSpots = spotStore.spots.filter(
    (spot) => new Date(spot.startDate) >= today && spot.isAd === true
  );
  const handleAd = () => {
    swal({
      title: "Are you sure?",
      text: "This Spot Will Be Advertised!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Done!", "Spot has been Advertised!", {
          icon: "success",
        });
        spotStore.updateSpot(
          TrueSpot,
          spot._id,
          spot?.image,
          spot.category,
          spot.galleryImage0,
          spot.galleryImage1,
          spot.galleryImage2,
          spot.galleryImage3,
          spot.galleryImage4,
          spot.adImage0,
          spot.adImage1,
          spot.adImage2,
          spot.adImage3,
          spot.adImage4
        );
      }
    });
  };
  return (
    <div className="aditem">
      <img className="adimage" src={baseURL + spot.image}></img>
      <h1 className="adtitle">{spot.name}</h1>
      {advertisedSpots.length >= 5 ? (
        <></>
      ) : (
        <button onClick={() => handleAd()} className="adbutton">
          Advertise
        </button>
      )}
    </div>
  );
}

export default observer(AdSpotsItems);
