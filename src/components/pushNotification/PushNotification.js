import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import pushNotificationStore from "../../stores/pushNotificationStore";

function PushNotification() {
  const nav = useNavigate()
  const [pushNotification, setPushNotification] = useState({
    title: "",
    body: "",
    locale: ""
  });
  const [titleEn, setTitleEn] = useState(true);
  const [bodyEn, setBodyEn] = useState(true);
  const [titleAr, setTitleAr] = useState(true);
  const [bodyAr, setBodyAr] = useState(true);
  const [titleEnDis, setTitleEnDis] = useState(false);
  const [bodyEnDis, setBodyEnDis] = useState(false);
  const [titleArDis, setTitleArDis] = useState(false);
  const [bodyArDis, setBodyArDis] = useState(false);

  const handleChange = (jungle, event) => {
    setPushNotification({ ...pushNotification, [event.target.name]: event.target.value });
    if (jungle === "titleEn" && event.target.value !== "") {
        setTitleEn(false);
        setTitleArDis(true);
        setBodyArDis(true);
    } else if (jungle === "titleEn" && event.target.value === "") {
        setTitleEn(true);
        setTitleArDis(false);
        setBodyArDis(false);
    } else if (jungle === "bodyEn" && event.target.value !== "") {
        setBodyEn(false);
        setTitleArDis(true);
        setBodyArDis(true);
    } else if (jungle === "bodyEn" && event.target.value === "") {
        setBodyEn(true);
        setTitleArDis(false);
        setBodyArDis(false);
    } else if (jungle === "titleAr" && event.target.value !== "") {
        setTitleAr(false);
        setTitleEnDis(true);
        setBodyEnDis(true);
    } else if (jungle === "titleAr" && event.target.value === "") {
        setTitleAr(true);
        setTitleEnDis(false);
        setBodyEnDis(false);
    } else if (jungle === "bodyAr" && event.target.value !== "") {
        setBodyAr(false);
        setTitleEnDis(true);
        setBodyEnDis(true);
    } else if (jungle === "bodyAr" && event.target.value === "") {
        setBodyAr(true);
        setTitleEnDis(false);
        setBodyEnDis(false);
    }
  };

  const handleSubmitEnglish = async (event) => {
    event.preventDefault();
    const newPushNotification = { ...pushNotification, locale: "en" }
    try{
        await pushNotificationStore.createPushNotification(newPushNotification).then(
            swal({
                title: "Notification Sent",
                icon: "success",
                confirmButtonText: "OK",
              })
        )
    } catch (error) {
        console.error(error);
    }
    event.target.reset();
    setTitleEn(true);
    setBodyEn(true);
    setTitleAr(true);
    setBodyAr(true);
    setTitleEnDis(false);
    setBodyEnDis(false);
    setTitleArDis(false);
    setBodyArDis(false);
  };

  const handleSubmitArabic = async (event) => {
    event.preventDefault();
    const newPushNotification = { ...pushNotification, locale: "ar" }
    try{
        await pushNotificationStore.createPushNotification(newPushNotification).then(
            swal({
                title: "Notification Sent",
                icon: "success",
                confirmButtonText: "OK",
              })
        )
    } catch (error) {
        console.error(error);
    }
    event.target.reset();
    setTitleEn(true);
    setBodyEn(true);
    setTitleAr(true);
    setBodyAr(true);
    setTitleEnDis(false);
    setBodyEnDis(false);
    setTitleArDis(false);
    setBodyArDis(false);
  };

  return (
    <div className="backgroundform">
      <div className="whitebackground">
        <div className="center">
          <h1 className="dash">Create Push Notification</h1>
          <button
              className="editorg"
              onClick={() => nav(`/PushNotifications`)}
            >
              Push Notification history
            </button>
        </div>

        <div className="whitebackgroundcreate">
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                <form onSubmit={handleSubmitEnglish} >
                    <div>
                        <div style={{ display: "flex", flexDirection: "row" }}> {/* Title English */}
                            <h5 className="l-color">Enter Title (in English)</h5>
                            <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                        </div>
                        <input
                            className="input-style"
                            type="text"
                            multiple
                            placeholder="Title in English"
                            name="title"
                            disabled={titleEnDis}
                            onChange={(event) => handleChange("titleEn", event)}
                            />
                        <div style={{ display: "flex", flexDirection: "row" }}> {/* Body English */}
                            <h5 className="l-color">Enter Body (in English)</h5>
                            <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                        </div>
                        <input
                            className="input-style"
                            type="text"
                            multiple
                            placeholder="Body in English"
                            name="body"
                            disabled={bodyEnDis}
                            onChange={(event) => handleChange("bodyEn", event)}
                        />
                        {titleEn === false && bodyEn === false  ? (
                            <input
                                className="button-sign ing-create"
                                type="submit"
                                value="Send English Push Notification"
                            />
                            ) : (
                            <input
                                className="button-signx ing-create"
                                type="submit"
                                disabled
                                value="Send English Push Notification"
                            />
                        )}
                    </div>
                </form>
                <form onSubmit={handleSubmitArabic}>
                    <div>
                        <div style={{ display: "flex", flexDirection: "row" }}> {/* Title Arabic */}
                            <h5 className="l-color">Enter Title (in Arabic)</h5>
                            <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                        </div>
                        <input
                            className="input-style"
                            type="text"
                            multiple
                            placeholder="Title in Arabic"
                            name="title"
                            disabled={titleArDis}
                            onChange={(event) => handleChange("titleAr", event)}
                        />
                        <div style={{ display: "flex", flexDirection: "row" }}> {/* Body Arabic */}
                            <h5 className="l-color">Enter Body (in Arabic)</h5>
                            <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                        </div>
                        <input
                            className="input-style"
                            type="text"
                            multiple
                            placeholder="Body in Arabic"
                            name="body"
                            disabled={bodyArDis}
                            onChange={(event) => handleChange("bodyAr", event)}
                        />
                        {titleAr === false && bodyAr === false  ? (
                            <input
                                className="button-sign ing-create"
                                type="submit"
                                value="Send Arabic Push Notification"
                            />
                            ) : (
                            <input
                                className="button-signx ing-create"
                                type="submit"
                                disabled
                                value="Send Arabic Push Notification"
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PushNotification;
