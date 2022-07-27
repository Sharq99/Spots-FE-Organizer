import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import authStore from "./stores/authStore";
import spotStore from "./stores/spotStore";

const QrCode = ({ spotId }) => {
  let url = `spots://Profile/${spotId}`;

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
      fgColor={"#4831d4"}
      level={"H"}
      bgColor={"white"}
      style={{ margin: 20 }}
      imageSettings={{
        src: require("../src/components/pics/icon.png"),
        x: undefined,
        y: undefined,
        width: 80,
        height: 80,
      }}
    />
  );

  return (
    <div>
      <div ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <button className="editorg" type="submit">
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;
