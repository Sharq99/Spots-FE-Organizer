import { observer } from "mobx-react";
import star from "../pics/star.png";

function Stars({ stars }) {
  let starsTotal;
  if (stars === "5") {
    return (starsTotal = (
      <>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
      </>
    ));
  } else if (stars === "4") {
    return (starsTotal = (
      <>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
      </>
    ));
  } else if (stars === "3") {
    return (starsTotal = (
      <>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
      </>
    ));
  } else if (stars === "2") {
    return (starsTotal = (
      <>
        <img src={star} className="star"></img>
        <img src={star} className="star"></img>
      </>
    ));
  } else if (stars === "1") {
    return (starsTotal = <img src={star} className="star"></img>);
  }
}

export default observer(Stars);
