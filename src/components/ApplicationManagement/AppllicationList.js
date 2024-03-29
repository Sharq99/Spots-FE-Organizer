import { observer } from "mobx-react";
import { useEffect } from "react";
import applicationStore from "../../stores/applicationStore";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import authStore from "../../stores/authStore";
import swal from "sweetalert";

function ApplicationList() {
  useEffect(() => {
    applicationStore.fetchApplications();
  }, []);

  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <h1 className="titleorg">Recieved Applications</h1>
      <Table data={applicationStore.applications} height={660} wordWrap="break-word">
      <Column width={430} align="center" fixed resizable>
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
        <Column width={330} align="center" fixed resizable>
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
        <Column width={330} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Instagram
          </HeaderCell>
            <Cell>
                {(rowData) => {
                return(
                    <a href={`https://instagram.com/${rowData.instagram}`} target="_blank" rel="noopener norefrer" style={{ color: "#ff3333", textDecoration: "underLine" }}>
                      Visit Instagram
                    </a>
                )}}
            </Cell>
        </Column>
        <Column width={350} align="center" fixed resizable>
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
              const handleAccept = async () => {
                await authStore.register(rowData).then(
                  await applicationStore.deleteApplication(rowData._id).then(
                    swal({
                      title: "Application Accepted",
                      text: `Oganizer has been added`,
                      icon: "success",
                      button: "OK",
                    })
                  )
                );
              };
              const handleReject = async () => {
                //TODO SEND APPLICANT AN EMAIL IN CASE OF REJECTION OR IN CASE OF AN ERROR
                swal({
                  title: "Are you sure?",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal("Application Rejected!", {
                      icon: "success",
                      button: "OK",
                    });
                    applicationStore.deleteApplication(rowData._id);
                  }
                });
              };
              return (
                <>
                  <button
                    onClick={handleAccept}
                    style={{ marginRight: "10%" }}
                    className="accept"
                  >
                    Accept
                  </button>
                  <button onClick={handleReject} className="reject">
                    Reject
                  </button>
                </>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </div>
  );
}
export default observer(ApplicationList);