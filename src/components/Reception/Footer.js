import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      style={{
        height: 40,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 20,
          width: "50%",
          alignSelf: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            marginTop: 10,
            marginBottom: 10,
          }}
          onClick={() => window.open("https://www.instagram.com/destkuwait/")}
        >
          <img
            src={require("../pics/logo-instagram.png")}
            style={{ height: 35, width: 35, margin: 0, padding: 0 }}
          ></img>
          <h1
            style={{
              color: "#f1f1f1",
              fontSize: 20,
              fontWeight: "300",
              margin: 0,
              paddingLeft: 10,
            }}
          >
            Destkuwait
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            marginTop: 10,
            marginBottom: 10,
          }}
          onClick={() => window.open("https://wa.me/96597947057")}
        >
          <img
            src={require("../pics/logo-whatsapp.png")}
            style={{ height: 35, width: 35, margin: 0, padding: 0 }}
          ></img>
          <h1
            style={{
              color: "#f1f1f1",
              fontSize: 20,
              fontWeight: "300",
              margin: 0,
              paddingLeft: 10,
            }}
          >
            97947057
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <img
            src={require("../pics/mail-outline.png")}
            style={{ height: 35, width: 35, margin: 0, padding: 0 }}
          ></img>
          <h1
            style={{
              color: "#f1f1f1",
              fontSize: 20,
              fontWeight: "300",
              margin: 0,
              paddingLeft: 10,
            }}
          >
            Dest.kuwait@gmail.com
          </h1>
        </div>
      </div>
      <label
        style={{
          color: "#f1f1f1",
        }}
      >
        © Dest Copyright 2023
      </label>
    </div>
  );
}
