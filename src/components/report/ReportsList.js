import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import reportStore from "../../stores/reportStore";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import swal from "sweetalert";
import { Modal, Button } from "react-bootstrap";

function ReportsList() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [mssgM, setmssgM] = useState("");
  useEffect(() => {
    try {
      setLoading(true);
      reportStore.fetchReports();
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading === true) {
    return "Loading";
  }

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <h1 className="titleorg">Reports</h1>
      <Table data={reportStore.reports} height={660} wordWrap="break-word">
      <Column width={400} align="center" fixed resizable>
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
        <Column width={350} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Name
          </HeaderCell>
          <Cell dataKey="user.name" />
        </Column>
        <Column width={400} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Email
          </HeaderCell>
          <Cell dataKey="user.email" />
        </Column>
        <Column width={300} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Action
          </HeaderCell>
          <Cell className="acceptrejectdiv">
            {(rowData) => {
              const handleResolve = async () => {
                swal("Problem Resolved!", {
                    icon: "success",
                    button: "OK",
                });
                reportStore.deleteReport(rowData._id);
              };

              const handleOpen = () => {
                setShow(true);
                setmssgM(rowData.mssg)
              }
              return (
                <>
                  <button onClick={handleOpen} className="accept" style={{marginRight: "20px"}}>
                    View Problem
                  </button>
                  <button onClick={handleResolve} className="reject">
                    Resolve
                  </button>
                </>
              );
            }}
          </Cell>
        </Column>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ borderBottomWidth: 0 }} closeButton>
          <Modal.Title style={{ fontFamily: "Ubuntu" }}>
            Problem
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>{mssgM}</p>
        </Modal.Body>
        <Modal.Footer>
        <Button
            style={{
            backgroundColor: "#e52b51",
            fontFamily: "Ubuntu",
            }}
            variant="primary"
            onClick={handleClose}
        >
            close
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default observer(ReportsList);