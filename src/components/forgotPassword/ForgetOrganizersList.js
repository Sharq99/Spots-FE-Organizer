import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import forgetOrganizerStore from "../../stores/forgetOrganizerStore";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import swal from "sweetalert";
import authStore from "../../stores/authStore";

function ForgetOrganizersList() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      forgetOrganizerStore.fetchForgetOrganizers();
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading === true) {
    return "Loading";
  }

  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <h1 className="titleorg">Password Reset Requests</h1>
      <Table data={forgetOrganizerStore.forgetOrganizers} height={660} wordWrap="break-word">
      <Column width={500} align="center" fixed resizable>
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
        <Column width={500} align="center" fixed resizable>
          <HeaderCell
            style={{
              fontWeight: "bolder",
              fontSize: 17,
            }}
          >
            Phone Number
          </HeaderCell>
          <Cell dataKey="phone" />
        </Column>
        
        <Column width={450} align="center" fixed resizable>
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
                const res = await authStore.forgotOrganizer(rowData.email)
                console.log('res', res)
                if(res === "Password Generated") {
                    await forgetOrganizerStore.deleteForgetOrganizer(rowData._id).then(
                      swal({
                        title: "Password Generated",
                        text: `Organizer's password has been reset`,
                        icon: "success",
                        button: "OK",
                      })
                    )
                } else if(res === "No Organizer Found") {
                  await forgetOrganizerStore.deleteForgetOrganizer(rowData._id).then(
                    swal({
                      title: "No Organizer Registered to this Email",
                      text: `This request will be deleted!`,
                      icon: "warning",
                      button: "OK",
                    })
                  )
                } else {
                  swal({
                    title: "Something Went Wrong",
                    text: `Please try again later`,
                    icon: "warning",
                    button: "OK",
                  })
                }
              };
              const handleReject = async () => {
                swal({
                  title: "Are you sure?",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    swal("Request Rejected!", {
                      icon: "success",
                      button: "OK",
                    });
                    forgetOrganizerStore.deleteForgetOrganizer(rowData._id);
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
export default observer(ForgetOrganizersList);