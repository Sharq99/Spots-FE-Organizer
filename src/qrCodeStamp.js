import { useState, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useEffect } from "react";

const qrCode = new QRCodeStyling({
  width: 2000,
  height: 2000,
  dotsOptions: {
    color: "#e52b51",
    type: "extra-rounded",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  imageOptions: {
    margin: 30,
    imageSize: 0.6,
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
    color: "#e52b51",
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

const QrStamp = ({ spotId }) => {
  const [url, setUrl] = useState(`dest://SpotDetails/${spotId}`);
  const [color, setColor] = useState("#e52b51");
  const [image, setImage] = useState(
    require("../src/components/pics/icon.png")
  );
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
      data: url,
    });
  }, [url]);
  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
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
        <div className="qrdivtwo">
          <div ref={ref2} />
          <button
            onClick={onDownloadClick}
            style={{ marginTop: 10 }}
            className="editorg"
            type="submit"
          >
            Download QR stamp
          </button>
        </div>
      </form>
    </div>
  );
};

export default QrStamp;
