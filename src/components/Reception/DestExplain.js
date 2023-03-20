export default function DestExplain() {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#f1f1f1",
          height: "fit-content",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignSelf: "center",
          width: "70%",
          borderRadius: 50,
          padding: 50,
          marginBottom: 100,
          boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: 200 }}>
          <img style={{ width: 200 }} src={require("../pics/ads.png")}></img>
          <h1 className="maintitledescribe">Advertise</h1>
          <h3
            style={{
              color: "#1b1b1b",
              opacity: 0.8,
              alignSelf: "center",
              marginTop: 10,
              fontWeight: "400",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Promote your event like never before.
          </h3>
        </div>
        <div style={{ width: 200 }}>
          <img style={{ width: 185 }} src={require("../pics/custom.png")}></img>
          <h1 className="maintitledescribe">Customize</h1>
          <h3
            style={{
              color: "#1b1b1b",
              opacity: 0.8,
              alignSelf: "center",
              marginTop: 10,
              fontWeight: "400",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Tailor your event to perfection.
          </h3>
        </div>
        <div style={{ width: 200 }}>
          <img style={{ width: 175 }} src={require("../pics/max.png")}></img>
          <h1 className="maintitledescribe">Maximize</h1>
          <h3
            style={{
              color: "#1b1b1b",
              opacity: 0.8,
              alignSelf: "center",
              marginTop: 10,
              fontWeight: "400",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Optimize your event's impact with Dest
          </h3>
        </div>
      </div>
    </div>
  );
}
