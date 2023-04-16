import React, { useState } from "react";
import spotStore from "../../stores/spotStore";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function OffersTerms() {
  const { spotId } = useParams();
  const oldSpot = spotStore.getSpotsById(spotId);
  const nav = useNavigate();
  const [file, setFile] = useState(oldSpot?.image);
  const [galleryFile0, setGalleryFile0] = useState(oldSpot?.galleryImage0);
  const [galleryFile1, setGalleryFile1] = useState(oldSpot?.galleryImage1);
  const [galleryFile2, setGalleryFile2] = useState(oldSpot?.galleryImage2);
  const [galleryFile3, setGalleryFile3] = useState(oldSpot?.galleryImage3);
  const [galleryFile4, setGalleryFile4] = useState(oldSpot?.galleryImage4);
  const [categoryId, setCategoryId] = useState(oldSpot.category);
  const [spot, setSpot] = useState({
    name: oldSpot?.name,
    nameAr: oldSpot?.nameAr,
    image: oldSpot?.image,
    galleryImage0: oldSpot?.galleryImage0,
    galleryImage1: oldSpot?.galleryImage1,
    galleryImage2: oldSpot?.galleryImage2,
    galleryImage3: oldSpot?.galleryImage3,
    galleryImage4: oldSpot?.galleryImage4,
    adImage0: oldSpot?.adImage0,
    adImage1: oldSpot?.adImage1,
    adImage2: oldSpot?.adImage2,
    adImage3: oldSpot?.adImage3,
    adImage4: oldSpot?.adImage4,
    location: oldSpot?.location,
    views: oldSpot?.views,
    description: oldSpot?.description,
    descriptionAr: oldSpot?.descriptionAr,
    details: oldSpot?.details,
    detailsAr: oldSpot?.detailsAr,
    startTime: oldSpot?.startTime,
    endTime: oldSpot?.endTime ? oldSpot?.endTime : "",
    isFree: oldSpot?.isFree,
    startDate: oldSpot?.startDate,
    endDate: oldSpot?.endDate,
    seats: oldSpot?.seats,
    seatsRemaining: oldSpot?.seatsRemaining,
    price: oldSpot?.price,
    isAd: oldSpot?.isAd,
    category: oldSpot?.category,
    addSeats: 0,
    announcementEn: oldSpot?.announcementEn,
    announcementAr: oldSpot?.announcementAr,
    isPublished: oldSpot?.isPublished,
    termsAndConditionsOffersEn: oldSpot.termsAndConditionsOffersEn,
    termsAndConditionsOfferssAr: oldSpot.termsAndConditionsOfferssAr,
  });
  const handleChange = (event) => {
    setSpot({ ...spot, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await spotStore.updateSpot(
        spot,
        spotId,
        file,
        categoryId,
        galleryFile0,
        galleryFile1,
        galleryFile2,
        galleryFile3,
        galleryFile4,
        spot.adImage0,
        spot.adImage1,
        spot.adImage2,
        spot.adImage3,
        spot.adImage4
      );
      swal({
        title: "Success",
        text: `Offers Terms and Conditions Updated`,
        icon: "success",
        button: "OK",
      }).then(function () {
        nav(`/ExperianceList/${spotId}`);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="backgroundform">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1 className="dash">Offers Terms and Conditions</h1>
        </div>
        <div className="createoffercontainer">
          <form onSubmit={handleSubmit} className="formdiv">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: 50,
                  }}
                >
                  <h5 className="l-color">
                    Offers Terms and Conditions English
                  </h5>

                  <textarea
                    cols="40"
                    rows="5"
                    style={{
                      height: "300px",
                      paddingTop: "10px",
                    }}
                    className="input-style"
                    type="text"
                    placeholder=""
                    defaultValue={oldSpot?.termsAndConditionsOffersEn}
                    name="termsAndConditionsOffersEn"
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h5 className="l-color">
                    Offers Terms and Conditions Arabic
                  </h5>

                  <textarea
                    cols="40"
                    rows="5"
                    style={{
                      height: "300px",
                      paddingTop: "10px",
                    }}
                    dir="rtl"
                    className="input-style"
                    type="text"
                    placeholder=""
                    defaultValue={oldSpot?.termsAndConditionsOfferssAr}
                    name="termsAndConditionsOfferssAr"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={{ width: "30%", alignSelf: "center" }}>
                <input
                  className="button-sign ing-create"
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default OffersTerms;
