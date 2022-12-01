import { observer } from "mobx-react";
import { useEffect } from "react";
import applicationStore from "../../stores/applicationStore";
// import ApplicationItem from "./ApplicationItem"
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import authStore from "../../stores/authStore";
import swal from "sweetalert";

function ApplicationList() {
  // const applicationsData = applicationStore.applications.map((application) => <ApplicationItem key={application._id} application={application} />);

  useEffect(() => {
    applicationStore.fetchApplications();
  }, [])
  
  return (
    <div style={{backgroundColor: "white", width: "100%", height: "100%"}}>
      <h1 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Recieved Applications</h1>
      <Table data={applicationStore.applications} height={660}>
        <Column width={350} align="center" fixed resizable>
          <HeaderCell>User Name</HeaderCell>
          <Cell dataKey="username" />
        </Column>
        <Column width={350} align="center" fixed resizable>
          <HeaderCell>Phone</HeaderCell>
          <Cell dataKey="phone" />
        </Column>
        <Column width={390} align="center" fixed resizable>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column width={350} align="center" fixed resizable>
        <HeaderCell>Action</HeaderCell>
        <Cell>
          {(rowData) => {
            const handleAccept = async () => {
              await authStore.register(rowData).then(await applicationStore.deleteApplication(rowData._id).then(swal({
                title: "Application Accepted",
                text: `Oganizer has been added`,
                icon: "success",
                confirmButtonText: "OK",
              })))
            }
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
                    confirmButtonText: "OK",
                  });
                  applicationStore.deleteApplication(rowData._id)
                }
              })
              console.log('Rejected')
            }
            return (
              <div>
                <button onClick={handleAccept} style={{marginRight: "10%"}} className="accept">Accept</button>
                <button onClick={handleReject} className="reject">Reject</button>
              </div>
            );
          }}
        </Cell>
      </Column>
      </Table>
    </div>
  );
}
export default observer(ApplicationList);



