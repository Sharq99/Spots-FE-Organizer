import { observer } from "mobx-react";
import spotStore from "../../stores/spotStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ticketStore from "../../stores/ticketStore";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { toJS } from "mobx";
import userStore from "../../stores/userStore";
import moment from "moment";

function OrderHistory() {
  const nav = useNavigate();
  const { spotId } = useParams();
  const spot = spotStore.getSpotsById(spotId);
  const orders = toJS(ticketStore?.tickets)?.filter(
    (ticket) => ticket?.spot?._id === spotId
  );
  return (
    <div className="center">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1 className="dash">{spot?.name}'s order history</h1>
        </div>
        <div className="offercontainer">
          <Table data={orders} height={660}>
            <Column width={250} align="center" fixed resizable>
              <HeaderCell
                style={{
                  fontWeight: "bolder",
                  fontSize: 17,
                }}
              >
                User
              </HeaderCell>
              <Cell>
                {(rowData) => {
                  const user = userStore.getUserById(rowData.user);
                  return <h6>{user.email}</h6>;
                }}
              </Cell>
            </Column>
            <Column width={180} align="center" fixed resizable>
              <HeaderCell
                style={{
                  fontWeight: "bolder",
                  fontSize: 17,
                }}
              >
                Ticket's Purchased
              </HeaderCell>
              <Cell>
                {(rowData) => {
                  return <h6>{rowData.amount}</h6>;
                }}
              </Cell>
            </Column>
            <Column width={120} align="center" fixed resizable>
              <HeaderCell
                style={{
                  fontWeight: "bolder",
                  fontSize: 17,
                }}
              >
                Amount Paid
              </HeaderCell>
              <Cell>
                {(rowData) => {
                  return <h6>{rowData.amount * spot.price}</h6>;
                }}
              </Cell>
            </Column>
            <Column width={250} align="center" fixed resizable>
              <HeaderCell
                style={{
                  fontWeight: "bolder",
                  fontSize: 17,
                }}
              >
                Time &amp; Date
              </HeaderCell>
              <Cell>
                {(rowData) => {
                  const date = moment(rowData.date).format("lll");
                  return <h6>{date}</h6>;
                }}
              </Cell>
            </Column>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default observer(OrderHistory);
