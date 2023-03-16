import { useState } from "react";
import authStore from "../../stores/authStore";
import { IoIosSwap, IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function PickDate() {
  const nav = useNavigate();

  const [pickDate, setPickDate] = useState("");
  const [pickMultipleDate, setPickMultipleDate] = useState(["", ""]);
  const [choosen, setChoosen] = useState(false);
  const [toggleSingle, setToggleSingle] = useState(false);
  const [toggleMultiple, setToggleMultiple] = useState(false);
  const [iEmpty, setIEmpty] = useState(true);
  const startDay = (date) => {
    pickMultipleDate[0] = date;
    setPickMultipleDate(pickMultipleDate);
  };
  const endDay = (date) => {
    pickMultipleDate[1] = date;
    setPickMultipleDate(pickMultipleDate);
  };
  return (
    <div className="backgroundform">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1
            style={{
              marginBottom: 0,
            }}
            className="dash"
          >
            Create Dest
          </h1>
          <h1
            className="dash"
            style={{
              fontSize: 20,
              fontWeight: "normal",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            Dest Credits: {authStore.organizer.numofDests}
          </h1>
        </div>
        <div className="whitebackgroundcreate" style={{ padding: 50 }}>
          <h1
            style={{ alignSelf: "center", fontSize: 30, marginTop: 10 }}
            className="dash"
          >
            Let's start creating your Dest!
          </h1>
          <h1
            style={{ alignSelf: "center", fontSize: 20, fontWeight: "normal" }}
            className="dash"
          >
            First, pick one or multiple days that your Dest will occur in
          </h1>

          {choosen ? (
            (toggleMultiple && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 5,
                    }}
                  >
                    <h5 className="l-color">Select start date &nbsp;</h5>
                    <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                  </div>
                  <input
                    className="input-style"
                    type="date"
                    placeholder="Date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(event) => {
                      startDay(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 5,
                    }}
                  >
                    <h5 className="l-color">Select end date &nbsp;</h5>
                    <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                  </div>
                  <input
                    className="input-style"
                    type="date"
                    placeholder="Date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(event) => {
                      endDay(event.target.value);
                      setIEmpty(false);
                    }}
                  />
                </div>
              </div>
            )) ||
            (toggleSingle && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 5,
                    }}
                  >
                    <h5 className="l-color">Select Dest date &nbsp;</h5>
                    <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                  </div>
                  <input
                    className="input-style"
                    type="date"
                    placeholder="Date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(event) => {
                      setPickDate(event.target.value);
                      setIEmpty(false);
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                width: "55%",
                alignSelf: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: 200,
              }}
            >
              <div
                style={{
                  backgroundColor: "#e52b51",
                  borderRadius: 40,
                  width: "42%",
                  margin: 10,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setChoosen(true);
                  setToggleSingle(true);
                  setToggleMultiple(false);
                }}
              >
                <IoIosArrowRoundForward
                  style={{
                    fontSize: 90,
                    color: "#f1f1f1",
                  }}
                ></IoIosArrowRoundForward>
                <h1
                  style={{
                    fontSize: 35,
                    color: "#f1f1f1",
                  }}
                >
                  Single
                </h1>
              </div>
              <div
                style={{
                  backgroundColor: "#e52b51",
                  borderRadius: 40,
                  width: "42%",
                  margin: 10,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setChoosen(true);
                  setToggleMultiple(true);
                  setToggleSingle(false);
                }}
              >
                <IoIosSwap
                  style={{
                    fontSize: 90,
                    color: "#f1f1f1",
                  }}
                ></IoIosSwap>
                <h1
                  style={{
                    fontSize: 35,
                    color: "#f1f1f1",
                  }}
                >
                  Multiple
                </h1>
              </div>
            </div>
          )}
          {toggleSingle &&
            (!iEmpty ? (
              <input
                className="button-sign ing-create"
                type="submit"
                value="Next"
                style={{ width: "40%", alignSelf: "center" }}
                onClick={() =>
                  nav(`/create-spot`, {
                    state: {
                      pickStartDate: pickDate,
                      pickEndDate: "",
                      isMultiple: false,
                    },
                  })
                }
              />
            ) : (
              <input
                className="button-sign ing-create"
                type="submit"
                value="Next"
                style={{
                  width: "40%",
                  alignSelf: "center",
                  backgroundColor: "#8f8f8f",
                  cursor: "default",
                }}
              />
            ))}
          {toggleMultiple &&
            (!iEmpty ? (
              <input
                className="button-sign ing-create"
                type="submit"
                value="Next"
                style={{ width: "40%", alignSelf: "center" }}
                onClick={() =>
                  nav(`/create-spot`, {
                    state: {
                      pickStartDate: pickMultipleDate[0],
                      pickEndDate: pickMultipleDate[1],
                      isMultiple: true,
                    },
                  })
                }
              />
            ) : (
              <input
                className="button-sign ing-create"
                type="submit"
                value="Next"
                style={{
                  width: "40%",
                  alignSelf: "center",
                  backgroundColor: "#8f8f8f",
                  cursor: "default",
                }}
              />
            ))}
          {choosen && (
            <h6
              style={{
                width: "10%",
                textAlign: "center",
                alignSelf: "center",
                marginTop: 20,
              }}
              className="editorg"
              onClick={() => {
                setChoosen(false);
                setToggleMultiple(false);
                setToggleSingle(false);
                setIEmpty(true);
              }}
            >
              Go back
            </h6>
          )}
        </div>
      </div>
    </div>
  );
}
