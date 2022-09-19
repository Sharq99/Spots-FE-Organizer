import { observer } from "mobx-react";
import { IoIosRemoveCircle } from "react-icons/io";
import swal from "sweetalert";
import { baseURL } from "../../stores/instance";
import offerStore from "../../stores/offerStore";
function OfferItem({ offer }) {
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "This Offer Will Be Permanently Deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted!", "Your Offer has been deleted!", {
          icon: "success",
        });
        offerStore.deleteOffer(offer._id);
      }
    });
  };
  return (
    <div style={{ margin: 30, marginRight: -10 }}>
      <IoIosRemoveCircle
        className="deleteOffer"
        name="stats-chart-outline"
        onClick={handleDelete}
      ></IoIosRemoveCircle>
      <div>
        <img
          style={{
            alignSelf: "flex-start",
            width: 310,
            height: 200,
            borderRadius: 10,
            objectFit: "cover",
          }}
          src={`${baseURL}${offer?.image}`}
        />
      </div>
      <div style={{ alignSelf: "flex-start", width: "90%" }}>
        <label
          style={{
            textTransform: "capitalize",
            marginTop: 10,
            fontSize: 25,
            color: "black",
            fontFamily: "Ubuntu",
            paddingLeft: 10,
          }}
        >
          {offer?.title}
          {/* {offer?.titleAr} */}
        </label>
      </div>
      <div style={{ alignSelf: "flex-start", width: "90%" }}>
        <label
          style={{
            textAlign: "left",
            marginTop: 10,
            fontSize: 15,
            color: "black",
            fontFamily: "Ubuntu",
            paddingLeft: 10,
          }}
        >
          {offer?.description}
          {/* {offer?.descriptionAr} */}
        </label>
      </div>
    </div>
  );
}

export default observer(OfferItem);
