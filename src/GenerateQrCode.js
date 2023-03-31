import { useState, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useEffect } from "react";

const qrCode = new QRCodeStyling({
  width: 2000,
  height: 2000,
  dotsOptions: {
    color: "#4267b2",
    type: "extra-rounded",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  imageOptions: {
    margin: 5,
    imageSize: 0.4,
    crossOrigin: "anonymous",
  },
  backgroundOptions: {
    color: "rgba(0, 0, 0, 0)",
  },
  extension: "png",
});

const qrCodePreview = new QRCodeStyling({
  width: 300,
  height: 300,
  dotsOptions: {
    color: "#4267b2",
    type: "extra-rounded",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  imageOptions: {
    margin: 5,
    imageSize: 0.4,
    crossOrigin: "anonymous",
  },
  backgroundOptions: {
    color: "rgba(0, 0, 0, 0)",
  },
  extension: "png",
});

const GenerateQrCode = () => {
  const [url, setUrl] = useState({
    points: 0,
    isPoints: true,
  });
  const [color, setColor] = useState(500);
  const [image, setImage] = useState();
  const ref = useRef(0);
  const ref2 = useRef(0);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);
  useEffect(() => {
    qrCodePreview.append(ref2.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);
  useEffect(() => {
    qrCodePreview.update({
      data: JSON.stringify(url),
    });
  }, [url]);
  const onUrlChange = (event) => {
    event.preventDefault();
    console.log("first", event.target.value);
    setUrl({ ...url, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    qrCode.update({
      dotsOptions: {
        color: color,
      },
    });
  }, [color]);
  useEffect(() => {
    qrCodePreview.update({
      dotsOptions: {
        color: color,
      },
    });
  }, [color]);
  const onColorChange = (event) => {
    event.preventDefault();
    setColor(event.target.value);
  };

  useEffect(() => {
    qrCode.update({
      image: image,
    });
  }, [image]);
  useEffect(() => {
    qrCodePreview.update({
      image: image,
    });
  }, [image]);
  const onImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: "png",
    });
  };
  return (
    <div className="qrcode__container">
      <form className="generateqrdiv">
        <div className="qrdivone">
          <div>
            <label
              style={{ textAlighn: "left", marginBottom: 10 }}
              className="l-color"
            >
              Choose Logo
            </label>
            <input
              type="file"
              className="input-style"
              onChange={onImageChange}
              style={{
                width: 200,
                alignContent: "center",
                justifyContent: "center",
                justifySelf: "center",
                paddingTop: 10,
              }}
            />
          </div>
          <div>
            <label
              style={{ textAlighn: "left", marginBottom: 10 }}
              className="l-color"
            >
              Enter Points
            </label>
            <input
              type="number"
              className="input-style"
              name="points"
              value={url.points}
              onChange={onUrlChange}
              placeholder="0-500"
              style={{ width: 200, marginLeft: 20 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <label
              style={{ textAlighn: "left", marginBottom: 10 }}
              className="l-color"
            >
              Choose Color
            </label>
            <input
              style={{
                height: 50,
                width: 200,
                borderColor: "#e52b51",
                borderRadius: 10,
                padding: 5,
              }}
              type="color"
              value={color}
              onChange={onColorChange}
            />
          </div>
        </div>
        <div className="qrdivtwo">
          <div ref={ref2} />
          <button
            onClick={onDownloadClick}
            style={{ marginTop: 10 }}
            className="editorg"
            type="submit"
          >
            Download QR code
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateQrCode;
