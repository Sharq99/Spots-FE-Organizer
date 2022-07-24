import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import authStore from "./stores/authStore";
import spotStore from "./stores/spotStore";

const QrCode = () => {
  let spots = spotStore.spots.filter(
    (spot) => spot.organizer === authStore.organizer.id
  );

  let url = `spots://Profile/${spots[spots.length - 1]._id}`;

  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"white"}
      level={"H"}
    />
  );

  return (
    <div className="section container">
      <div className="qrcode__container">
        <div ref={qrRef}>{qrcode}</div>
        <div className="input__group">
          <form onSubmit={downloadQRCode}>
            <button type="submit">Download QR code</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
