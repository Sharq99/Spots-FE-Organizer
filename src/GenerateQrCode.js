import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import QRCodeStyling from "qr-code-styling";

const GenerateQrCode = () => {
  const [url, setUrl] = useState("");

  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `${url}-qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      fgColor={"#4831d4"}
      bgColor={"white"}
      level={"H"}
      imageSettings={{
        src: require("./components/pics/icon.png"),
        x: undefined,
        y: undefined,
        height: 71,
        width: 71,
        excavate: true,
      }}
    />
  );

  return (
    <div className="qrcode__container">
      <form onSubmit={downloadQRCode} className="generateqrdiv">
        <div className="qrdivone">
          <label
            style={{ textAlighn: "left", marginBottom: 10 }}
            className="l-color"
          >
            Enter Points
          </label>
          <input
            type="number"
            className="input-style"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="0-500"
          />
        </div>
        <div className="qrdivtwo">
          <div ref={qrRef}>{qrcode}</div>
          <button style={{ marginTop: 10 }} className="editorg" type="submit">
            Download QR code
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateQrCode;
