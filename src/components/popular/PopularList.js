import { observer } from "mobx-react";
import popularStore from "../../stores/popularStore";
import PopularItem from "./PopularItem";

function PopularList() {
  const popularList = popularStore.populars.map((popular) => (
    <PopularItem key={popular?._id} popular={popular} />
  ));
  return popularList.length > 0 ? (
    <div className="categoriescarousel" style={{ justifyContent: "center" }}>
      {popularList}
    </div>
  ) : (
    <div className="whitebackgroundcreateoffmy">
      <h3 className="codedest">No Populars Yet!</h3>
    </div>
  );
}

export default observer(PopularList);
