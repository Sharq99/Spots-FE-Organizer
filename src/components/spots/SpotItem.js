import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import authStore from "../../stores/authStore";
import { baseURL } from "../../stores/instance";
import spotStore from "../../stores/spotStore";
import swal from "sweetalert";
import { IoIosRemoveCircle } from "react-icons/io";

function SpotItem({ spot }) {
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "This Dest Will Be Permanently Deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted!", "Your Dest has been deleted!", {
          icon: "success",
        });
        spotStore.deleteSpot(spot?._id);
      }
    });
  };
  return (
    <div className="icondivitem">
      <IoIosRemoveCircle
        className="deleteSpot"
        name="stats-chart-outline"
        onClick={handleDelete}
      ></IoIosRemoveCircle>
      <Link to={`/spot/${spot?._id}`}>
        <div className="recipecontainer">
          <div className="recipeimagediv">
            <img className="recipeimage" src={`${baseURL}${spot?.image}`}></img>
          </div>
          <div className="recipename">
            <h5>{spot?.name}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default observer(SpotItem);
