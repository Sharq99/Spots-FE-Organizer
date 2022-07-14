import { observer } from "mobx-react";
import SpotDaysItem from "./SpotDaysItem";

function SpotDaysList({spotDays, price}) {
  const days = spotDays?.map((day) => (
    <SpotDaysItem key={day?.day} day={day} price={price} />
  ));

  return (
    <div>{days}</div>
  );
}

export default observer(SpotDaysList);
