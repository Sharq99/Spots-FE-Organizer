import { useState, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useEffect } from "react";

const qrCodeStamp = new QRCodeStyling({
  width: 200,
  height: 200,
  qrOptions: {},
  dotsOptions: {
    color: "#e52b51",
    type: "extra-rounded",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  backgroundOptions: {
    color: "rgba(0, 0, 0, 0)",
  },
  extension: "svg",
});

const GenerateQrCodeStamp = ({ spotId }) => {
  const [url, setUrl] = useState(`dest://SpotDetails/${spotId}`);
  const [color, setColor] = useState("#e52b51");
  const [image, setImage] = useState();
  const ref = useRef(0);

  useEffect(() => {
    qrCodeStamp.append(ref.current);
  }, []);

  useEffect(() => {
    qrCodeStamp.update({
      data: url,
    });
  }, [url]);

  useEffect(() => {
    qrCodeStamp.update({
      dotsOptions: {
        color: color,
      },
    });
  }, [color]);

  useEffect(() => {
    qrCodeStamp.update({
      image: image,
    });
  }, [image]);

  return <div ref={ref} />;
};

export default GenerateQrCodeStamp;
