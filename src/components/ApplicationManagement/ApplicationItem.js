import Accordion from 'react-bootstrap/Accordion';
import swal from 'sweetalert';
import applicationStore from '../../stores/applicationStore';
import authStore from '../../stores/authStore';


function ApllicationItem({ application }) {
  
  return (
    // <Accordion class="accordion-flush bg-dark">
    //   <Accordion.Item eventKey="0">
    //   <Accordion.Header>
    //       <div class="justify-content-between d-flex align-items-center">
    //         <h4>
    //           {application?.username}
    //         </h4>
    //         <div style={{display: "flex", justifyContent: "space-around", margin: "auto", marginLeft: "460%"}}>
    //             <button onClick={handleAccept} style={{marginRight: "10%"}} className="accept">Accept</button>
    //             <button onClick={handleReject} className="reject">Reject</button>
    //         </div>
    //       </div>
    //     </Accordion.Header>
    //     <Accordion.Body>
    //         <div style={{display: "flex", flexDirection: "column", alignItems: 'center',}}>
    //             <div className="wrapper" style={{marginTop: "38px"}}>
    //                 <div className="one">
    //                     <h3 className="profilelabels">username</h3>
    //                     <h3 className="email">{application?.username}</h3>
    //                 </div>
    //                 <div className="two">
    //                     <h3 className="profilelabels">Email</h3>
    //                     <h3 className="email">{application?.email}</h3>
    //                 </div>
    //                 <div className="three">
    //                     <h3 className="profilelabels">Phone</h3>
    //                     <h3 className="phone">{application?.phone}</h3>
    //                 </div>
    //             </div>
    //             <div style={{display: "flex", flexDirection: "column"}}>
    //                 <h3 className="profilelabels" style={{margin: "auto"}}>Bio</h3>
    //                 <div style={{width:"100%"}}>
    //                     <h3 className="bio">{application?.bio}</h3>
    //                 </div>
    //             </div>
    //             <div style={{display: "flex", justifyContent: "space-around", margin: "auto", marginTop: "4%"}}>
    //                 <button onClick={handleAccept} style={{marginRight: "100%"}} className="accept">Accept</button>
    //                 <button onClick={handleReject} className="reject">Reject</button>
    //             </div>
    //         </div>
    //     </Accordion.Body>
    //   </Accordion.Item>
    // </Accordion>
    <div>
      <div style={{display: "flex", flexDirection: "row", alignItems: 'center',}}>
        <h5 style={{color: "white"}}>{application.username}</h5>
        <h5 style={{color: "white"}}>{application.email}</h5>  
        <h5 style={{color: "white"}}>{application.phone}</h5>
      </div>
    </div>
  );
}

export default ApllicationItem;