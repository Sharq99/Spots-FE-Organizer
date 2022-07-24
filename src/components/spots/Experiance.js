import { observer } from "mobx-react";
import authStore from "../../stores/authStore";
import spotStore from "../../stores/spotStore";
import { useNavigate, useParams } from "react-router-dom";
import SpotItem from "./SpotItem";

function Experiance() {
    const nav = useNavigate();
    const { spotId } = useParams();
    const spot = spotStore.getSpotsById(spotId);


  return (
    <div className="center">
        <h1 className="dash">Offers</h1>
        <h1 className="dash">{spot.name}</h1>
        <button className="editorg" onClick={() => nav(`/create-offer/${spotId}`)}>
            Add Offer
        </button>
    </div>
    );
}

export default observer(Experiance);
