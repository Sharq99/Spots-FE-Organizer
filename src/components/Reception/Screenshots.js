export default function Screenshots() {
  return (
    <div
      style={{
        paddingBottom: 50,
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <img
        style={{
          marginTop: 50,
          height: "72%",
          width: "85%",
          alignSelf: "center",
        }}
        src={require("../pics/Destscreenshotholder.png")}
      ></img>
      <h1 className="maintitle">Discover a world of possibilities with Dest</h1>
      <h3
        style={{
          color: "white",
          opacity: 0.8,
          alignSelf: "center",
          marginTop: 10,
          fontWeight: "300",
          textAlign: "center",
        }}
      >
        The app that connects you to a world of attendees!
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 40,
        }}
      >
        <img
          style={{
            height: "50%",
            width: "50%",
            cursor: "pointer",
          }}
          onClick={() =>
            window.open("https://apps.apple.com/us/app/dest/id1662424448")
          }
          src={require("../pics/appstorebutton.png")}
        ></img>
      </div>
    </div>
  );
}
