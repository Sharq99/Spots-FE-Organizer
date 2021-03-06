import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import authStore from "../../stores/authStore";
import { baseURL } from "../../stores/instance";
import spotStore from "../../stores/spotStore";
import swal from "sweetalert";

function SpotItem({ spot }) {
    const handleDelete = () => {
      swal({
        title: "Are you sure?",
        text: "This Spot Will Be Permanently Deleted!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Deleted!", "Your Spot has been deleted!", {
            icon: "success",
          });
          spotStore.deleteSpot(spot?._id);
        } else {
          swal("Deletion Cancelled!", "Your Spot Was not Deleted");
        }
      });
      // authStore.removeSpot(spot?._id);
      console.log("inside item: "+authStore.organizer.spots.length)
    }
  return (
    <div>
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
        <button className="button-sign ing-create" onClick={handleDelete}>Delete Spot</button>
    </div>
  );
}

export default observer(SpotItem);
