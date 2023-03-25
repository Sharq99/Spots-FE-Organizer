import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import pushNotificationStore from "../../stores/pushNotificationStore";
import moment from "moment";


function PushNotificationHistory() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      pushNotificationStore.fetchPushNotifications()
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading === true) {
    return "Loading";
  }
  return (
    <div style={{ backgroundColor: "white" }}>
      <h1 className="titleorg">Push Notification History</h1>
      <Table
        data={pushNotificationStore?.pushNotifications}
        bordered={true}
        loading={loading}
        height={660}
      >
        <Column width={480} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Title
          </HeaderCell>
          <Cell dataKey="title" />
        </Column>
        <Column width={480} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Body
          </HeaderCell>
          <Cell dataKey="body" />
        </Column>
        <Column width={480} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            date
          </HeaderCell>
          <Cell>
            {(rowData) => {
              return(
                <h4 style={{
                  fontWeight: "400",
                  fontSize: 17,
                }}>{moment(rowData.date).format("LLL")}</h4>
              )
            }}
            </Cell>
        </Column>
      </Table>
    </div>
  );
}
export default observer(PushNotificationHistory);
