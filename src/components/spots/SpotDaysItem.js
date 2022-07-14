
function SpotDaysItem({ day, price }) {
  return (
    <div>
        <h1 className="instructionstitle">Payment Details on Day {day.day}</h1>
        <p className="singlerecipeinstruction">{price}kd per person</p>
        <h1 className="instructionstitle">Seats</h1>
        <p className="singlerecipeinstruction">{day?.seats}</p>
        <h1 className="instructionstitle">Day Revenue</h1>
        <p className="singlerecipeinstruction">{price * day?.seats}</p>
    </div>
  );
}

export default SpotDaysItem;
