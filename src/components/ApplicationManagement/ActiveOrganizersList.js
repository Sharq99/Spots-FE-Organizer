import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import authStore from "../../stores/authStore";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";

function ActiveOrganizersList() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      authStore.fetchOrganizers();
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading === true) {
    return "Loading";
  }
  return (
    <div style={{ backgroundColor: "white" }}>
      <h1 className="titleorg">Active Organizers</h1>
      <Table
        data={authStore?.organizers}
        bordered={true}
        loading={loading}
        height={660}
      >
        <Column width={240} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            User Name
          </HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column width={240} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Name in Arabic
          </HeaderCell>
          <Cell dataKey="displayNameAr" />
        </Column>
        <Column width={240} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Name in English
          </HeaderCell>
          <Cell dataKey="displayNameEn" />
        </Column>
        <Column width={240} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Phone
          </HeaderCell>
          <Cell dataKey="phone" />
        </Column>
        <Column width={240} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Email
          </HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column width={240} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Dests #
          </HeaderCell>
          <Cell>
            {(rowData) => {
              return <div>{rowData?.spots?.length}</div>;
            }}
          </Cell>
        </Column>
      </Table>
    </div>
  );
}
export default observer(ActiveOrganizersList);
