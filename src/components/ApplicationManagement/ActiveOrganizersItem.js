import Accordion from 'react-bootstrap/Accordion';

function ActiveOrganizersItem({ organizer }) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{organizer?.username}</Accordion.Header>
        <Accordion.Body>
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center',}}>
                <div className="wrapper" style={{marginTop: "38px"}}>
                    <div className="one">
                        <h3 className="profilelabels">username</h3>
                        <h3 className="email">{organizer?.username}</h3>
                    </div>
                    <div className="two">
                        <h3 className="profilelabels">Name in Arabic</h3>
                        <h3 className="email">{organizer?.displayNameAr}</h3>
                    </div>
                    <div className="three">
                        <h3 className="profilelabels">Name in English</h3>
                        <h3 className="email">{organizer?.displayNameEn}</h3>
                    </div>
                    <div className="four">
                        <h3 className="profilelabels">Email</h3>
                        <h3 className="email">{organizer?.email}</h3>
                    </div>
                    <div className="seven">
                        <h3 className="profilelabels">Phone</h3>
                        <h3 className="phone">{organizer?.phone}</h3>
                    </div>
                    <div className="six">
                        <h3 className="profilelabels">Spots</h3>
                        <h3 className="phone">{organizer?.spots?.length}</h3>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h3 className="profilelabels" style={{margin: "auto"}}>Bio</h3>
                    <div style={{width:"100%"}}>
                        <h3 className="bio">{organizer?.bio}</h3>
                    </div>
                </div>
            </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ActiveOrganizersItem;