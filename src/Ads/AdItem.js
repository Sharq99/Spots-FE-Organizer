import { observer } from "mobx-react";
import spotStore from "../stores/spotStore";
import swal from "sweetalert";
import { useState } from "react";
import { baseURL } from "../stores/instance";

function AdItem({ spot }) {
  const [FalseSpot, setFalseSpot] = useState({
    isAd: false,
  });
  const handleRemove = () => {
    swal({
      title: "Are you sure?",
      text: "This Dest Will Be removed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Done!", "Dest has been removed!", {
          icon: "success",
        });
        spotStore.updateSpot(
          FalseSpot,
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
      <button onClick={() => handleRemove()} className="adremovebutton">
        Remove
      </button>
    </div>
  );
}

export default observer(AdItem);
