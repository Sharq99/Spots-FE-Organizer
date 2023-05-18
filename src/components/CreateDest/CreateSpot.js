import { useEffect, useRef, useState } from "react";
import CategoryList from "../category/CategoryList";
import spotStore from "../../stores/spotStore";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import authStore from "../../stores/authStore";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Resizer from "react-image-file-resizer";

function CreateSpot() {
  const nav = useNavigate();
  const location = useLocation();
  const state = location.state;
  const pickStartDate = state.pickStartDate;
  const pickEndDate = state.pickEndDate;
  const isMultiple = state.isMultiple;
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [galleryFile0, setGalleryFile0] = useState("");
  const [galleryFile1, setGalleryFile1] = useState("");
  const [galleryFile2, setGalleryFile2] = useState("");
  const [galleryFile3, setGalleryFile3] = useState("");
  const [galleryFile4, setGalleryFile4] = useState("");
  const [galleryImage0, setGalleryImage0] = useState("");
  const [galleryImage1, setGalleryImage1] = useState("");
  const [galleryImage2, setGalleryImage2] = useState("");
  const [galleryImage3, setGalleryImage3] = useState("");
  const [galleryImage4, setGalleryImage4] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  useEffect(() => {
    const getToken = async () => {
      await authStore.getToken();
    };
    getToken();
  }, []);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  function openModal2() {
    setModalIsOpen2(true);
  }

  function closeModal2() {
    setModalIsOpen2(false);
  }

  const [spot, setSpot] = useState({
    name: "",
    nameAr: "",
    image: "",
    galleryImage0: "",
    galleryImage1: "",
    galleryImage2: "",
    galleryImage3: "",
    galleryImage4: "",
    adImage0: "",
    adImage1: "",
    adImage2: "",
    adImage3: "",
    adImage4: "",
    video: "",
    website: "",
    instagram: "",
    location: "",
    description: "",
    descriptionAr: "",
    details: "",
    detailsAr: "",
    startTime: "",
    endTime: "",
    isFree: true,
    isAd: false,
    startDate: pickStartDate,
    endDate: pickEndDate,
    isMultiple: isMultiple,
    seats: 0,
    addSeats: 0,
    price: 0,
    days: [],
    numOfDays: 1,
    spotRevenue: 0,
    announcementEn: "",
    announcementAr: "",
    seatsRemaining: 0,
    isPublished: false,
    termsAndConditionsOffersEn: "",
    termsAndConditionsOfferssAr: "",
    termsAndConditionsRewardsEn: "",
    termsAndConditionsRewardsAr: "",
    views: 0,
  });
  const [checked, setChecked] = useState(spot?.isPublished);
  const [spotName, setSpotName] = useState(true);
  const [spotNameAr, setSpotNameAr] = useState(true);
  const [spotImage, setSpotImage] = useState(true);
  const [spotLocation, setSpotLocation] = useState(true);
  const [spotWebsite, setSpotWebsite] = useState(true);
  const [spotInstagram, setSpotInstagram] = useState(true);
  const [spotDescription, setSpotDescription] = useState(true);
  const [spotDescriptionAr, setSpotDescriptionAr] = useState(true);
  const [spotDetails, setSpotDetails] = useState(true);
  const [spotDetailsAr, setSpotDetailsAr] = useState(true);
  const [startTime, setStartTime] = useState(true);
  const [endTime, setEndTime] = useState(true);
  const [addEndTimeRadio, setAddEndTimeRadio] = useState(false);
  const [spotSeats, setSpotSeats] = useState(true);
  const [spotPrice, setSpotPrice] = useState(true);
  spot.announcementEn = `Welcome to ${spot.name}, enjoy our amazing offers and rewards`;
  spot.announcementAr = `مرحبا بكم في ${spot.nameAr}، استمتع بعروضنا وجوائزنا الرائعة`;
  const [categoryId, setCategoryId] = useState("640a8df4f68bfae10cbb4553");
  const [categoryName, setCategoryName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setSpot({ ...spot, [event.target.name]: event.target.value });
    if (event.target.name === "name") {
      setSpotName(false);
    } else if (event.target.name === "nameAr") {
      setSpotNameAr(false);
    } else if (event.target.name === "location") {
      setSpotLocation(false);
    } else if (event.target.name === "description") {
      setSpotDescription(false);
    } else if (event.target.name === "descriptionAr") {
      setSpotDescriptionAr(false);
    } else if (event.target.name === "details") {
      setSpotDetails(false);
    } else if (event.target.name === "detailsAr") {
      setSpotDetailsAr(false);
    } else if (event.target.name === "startTime") {
      setStartTime(false);
    } else if (event.target.name === "endTime") {
      setEndTime(false);
    } else if (event.target.name === "price") {
      setSpotPrice(false);
    } else if (event.target.name === "seats") {
      setSpotSeats(false);
    }
  };
  // const handleDate = (event) =>{
  //     setSpotDate({ ...sDate, [event.target.name]: event.target.value });
  //     console.log("sDate: "+JSON.stringify(sDate));}

  // const handleYear = (event) =>{
  //     setSpot({ ...spot.spotDate, year: event.target.value });
  //     console.log("spot: "+JSON.stringify(spot));
  // }

  // const handleMonth = (event) =>{
  //     setSpot({ ...spot.spotDate, month: event.target.value });
  //     console.log("spot: "+JSON.stringify(spot));
  // }

  // const handleDay = (event) =>{
  //     setSpot({ ...spot.spotDate, day: event.target.value });
  //     console.log("spot: "+JSON.stringify(spot));
  // }

  const handlePublish = (e) => {
    if (e.target.checked)
      setSpot({ ...spot, [e.target.name]: e.target.checked });
  };

  const handleFree = (event) => setSpot({ ...spot, [event.target.name]: true });

  const handlePaid = (event) =>
    setSpot({ ...spot, [event.target.name]: false });

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        720,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const handleImage = (event) => {
    let file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    setFile(file);
    setSpotImage(false);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleGalleryImage0 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    // setGalleryImage0(image);
    // setGalleryFile0(image);
    setGalleryFile0(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage0(reader.result);
    });
    reader.readAsDataURL(image);
  };
  const handleGalleryImage1 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    setGalleryFile1(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage1(reader.result);
    });
    reader.readAsDataURL(image);
  };
  const handleGalleryImage2 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    setGalleryFile2(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage2(reader.result);
    });
    reader.readAsDataURL(image);
  };
  const handleGalleryImage3 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    setGalleryFile3(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage3(reader.result);
    });
    reader.readAsDataURL(image);
  };
  const handleGalleryImage4 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    setGalleryFile4(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage4(reader.result);
    });
    reader.readAsDataURL(image);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    spot.seatsRemaining = spot.seats;
    event.preventDefault();
    try {
      const res = await spotStore.createSpot(
        spot,
        categoryId,
        file,
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
      if (res === "created") {
        swal({
          title: "Success",
          text: `${spot.name} has been added`,
          icon: "success",
          button: "OK",
        }).then(async function () {
          await authStore.updateNumofDests();
          setIsLoading(false);
          nav(`/my-spots`);
        });
      } else {
        swal({
          title: "Reduce images size",
          icon: "error",
          button: "OK",
        }).then(async function () {
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      alert(e.message);
    }
  };
  // ADD input type email for email
  // ADD input type date for date
  // ADD input time date for startTime
  return (
    <div className="backgroundform">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1 className="dash">Create Dest</h1>
        </div>
        {authStore.organizer.numofDests > 0 ? (
          <div className="whitebackgroundcreate">
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 className="l-color">Upload Primary Image &nbsp; </h5>
                <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                <button className="modalinfo" onClick={openModal}>
                  View in App
                </button>
                <Modal
                  style={{
                    content: {
                      height: "95%",
                      width: "60%",
                      margin: "auto",
                      borderRadius: 50,
                      padding: 40,
                    },
                  }}
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ color: "#1E1E1E" }}>Primary image uses</h2>
                    <IoMdClose
                      className="closeinfomodal"
                      name="stats-chart-outline"
                      onClick={closeModal}
                    ></IoMdClose>
                  </div>
                  <p style={{ color: "#1E1E1E", opacity: 0.8 }}>
                    Users will be able to view your primary image in the
                    following screens
                  </p>
                  <img
                    style={{ width: "100%", height: "88%", marginTop: 10 }}
                    src={require("../../components/pics/PrimaryImageInfo.png")}
                  ></img>
                </Modal>
              </div>
              <h5 className="l-color-tiny-image">
                This is how your image will look like on the Explore Page
              </h5>
              <div className="spotimagecontainer">
                {image ? (
                  <img alt={image} className="spotimage" src={image}></img>
                ) : (
                  <label className="spotimagetext">
                    Recommended 725W x 1200H
                  </label>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <h5 className="l-color">Max file size is 5 MB</h5>
                <h5
                  style={{
                    color: "red",
                    marginTop: 10,
                    alignSelf: "center",
                  }}
                >
                  &nbsp; *
                </h5>
              </div>

              <div className="imagechoose">
                <input
                  className="input-style-choose"
                  type="file"
                  id="choose"
                  placeholder="Image URL"
                  name="image"
                  onChange={handleImage}
                />
                <label className="labelchoose" for="choose">
                  Choose image
                </label>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 className="l-color">Upload Image Gallery &nbsp; </h5>
                <button
                  style={{ marginTop: 10 }}
                  className="modalinfo"
                  onClick={openModal2}
                >
                  View in App
                </button>
                <Modal
                  style={{
                    content: {
                      height: "95%",
                      width: "60%",
                      margin: "auto",
                      borderRadius: 50,
                      padding: 40,
                    },
                  }}
                  isOpen={modalIsOpen2}
                  onRequestClose={closeModal2}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 style={{ color: "#1E1E1E" }}>Gallery images use</h2>
                    <IoMdClose
                      className="closeinfomodal"
                      name="stats-chart-outline"
                      onClick={closeModal2}
                    ></IoMdClose>
                  </div>
                  <p style={{ color: "#1E1E1E", opacity: 0.8 }}>
                    Users will be able to view your gallery images in the Dest
                    Details screen
                  </p>
                  <div
                    style={{
                      height: "90%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        height: "78%",
                        alignSelf: "center",
                        justifySelf: "center",
                      }}
                      src={require("../../components/pics/Gallery.png")}
                    ></img>
                  </div>
                </Modal>
              </div>
              <h5 className="l-color-tiny-image">You can add up to 5 images</h5>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  whiteSpace: "wrap",
                  overflowX: "scroll",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {galleryImage0 ? (
                    <img
                      alt={galleryImage0}
                      className="spotgallery"
                      src={galleryImage0}
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage0}
                      type="file"
                      id="choose0"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem0"
                    />
                    <label
                      className="editorg"
                      for="choose0"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile0 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile0("");
                            setGalleryImage0("");
                            setSpot({ ...spot, galleryImage0: null });
                          }}
                          type="button"
                          id="delete0"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem0"
                        />
                        <label
                          className="editorg"
                          for="delete0"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {galleryImage1 ? (
                    <img
                      alt={galleryImage1}
                      className="spotgallery"
                      src={galleryImage1}
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage1}
                      type="file"
                      id="choose1"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem1"
                    />
                    <label
                      className="editorg"
                      for="choose1"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile1 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile1("");
                            setGalleryImage1("");
                            setSpot({ ...spot, galleryImage1: null });
                          }}
                          type="button"
                          id="delete1"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem1"
                        />
                        <label
                          className="editorg"
                          for="delete1"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {galleryImage2 ? (
                    <img
                      alt={galleryImage2}
                      className="spotgallery"
                      src={galleryImage2}
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage2}
                      type="file"
                      id="choose2"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem2"
                    />
                    <label
                      className="editorg"
                      for="choose2"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile2 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile2("");
                            setGalleryImage2("");
                            setSpot({ ...spot, galleryImage2: null });
                          }}
                          type="button"
                          id="delete2"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem2"
                        />
                        <label
                          className="editorg"
                          for="delete2"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {galleryImage3 ? (
                    <img
                      alt={galleryImage3}
                      className="spotgallery"
                      src={galleryImage3}
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage3}
                      type="file"
                      id="choose3"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem3"
                    />
                    <label
                      className="editorg"
                      for="choose3"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile3 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile3("");
                            setGalleryImage3("");
                            setSpot({ ...spot, galleryImage3: null });
                          }}
                          type="button"
                          id="delete3"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem3"
                        />
                        <label
                          className="editorg"
                          for="delete3"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {galleryImage4 ? (
                    <img
                      alt={galleryImage4}
                      className="spotgallery"
                      src={galleryImage4}
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage4}
                      type="file"
                      id="choose4"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem4"
                    />
                    <label
                      className="editorg"
                      for="choose4"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile4 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile4("");
                            setGalleryImage4("");
                            setSpot({ ...spot, galleryImage4: null });
                          }}
                          type="button"
                          id="delete4"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem4"
                        />
                        <label
                          className="editorg"
                          for="delete4"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <h5 className="l-color">Max file size is 5 MB</h5>
                <h5
                  style={{
                    color: "red",
                    marginTop: 10,
                    alignSelf: "center",
                  }}
                >
                  &nbsp; *
                </h5>
              </div>
            </div>
            <div className="categorydiv">
              <h1 className="categorytitle">Choose a category</h1>
              <h1 className="categorytitlechoosen">{categoryName}</h1>
            </div>
            <CategoryList
              setCategoryId={setCategoryId}
              setCategoryName={setCategoryName}
            />
            <form onSubmit={handleSubmit} className="formdiv">
              <div className="firstdiv">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">
                    Enter Dest Name (in English) &nbsp;
                  </h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  className="input-style"
                  type="text"
                  multiple
                  placeholder="Dest Name in English"
                  name="name"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">
                    Enter Dest Name (in Arabic) &nbsp;
                  </h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  style={{
                    textAlign: "right",
                  }}
                  className="input-style"
                  dir="rtl"
                  type="text"
                  multiple
                  placeholder="اسم الوجهه بالعربي"
                  name="nameAr"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Location URL &nbsp;</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Location URL"
                  name="location"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Website URL &nbsp;</h5>
                </div>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Website URL"
                  name="website"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Instagram URL &nbsp;</h5>
                </div>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">
                    Enter Dest Description in English &nbsp;
                  </h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <textarea
                  cols="40"
                  rows="5"
                  style={{
                    height: "100px",
                    paddingTop: "10px",
                  }}
                  className="input-style"
                  type="text"
                  placeholder="Dest Description in English  (200 characters max)"
                  name="description"
                  maxLength={200}
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">
                    Enter Dest Description in Arabic &nbsp;
                  </h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <textarea
                  cols="40"
                  rows="5"
                  style={{
                    height: "100px",
                    paddingTop: "10px",
                    textAlign: "right",
                  }}
                  dir="rtl"
                  className="input-style"
                  type="text"
                  placeholder="وصف الوجهه بالعربي (٢٠٠ حرف كحد اقصى)"
                  name="descriptionAr"
                  maxLength={200}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">
                    Enter Dest Detail (in English) &nbsp;
                  </h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <textarea
                  cols="40"
                  rows="5"
                  style={{
                    height: "150px",
                    paddingTop: "10px",
                  }}
                  className="input-style"
                  type="text"
                  placeholder="Dest Details in English"
                  name="details"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">
                    Enter Dest Details (in Arabic) &nbsp;
                  </h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <textarea
                  cols="40"
                  rows="5"
                  style={{
                    height: "150px",
                    paddingTop: "10px",
                    textAlign: "right",
                  }}
                  dir="rtl"
                  className="input-style"
                  type="text"
                  placeholder="تفاصيل الوجهه بالعربي"
                  name="detailsAr"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Start Time &nbsp;</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  className="input-style"
                  type="time"
                  placeholder="Time"
                  name="startTime"
                  onChange={handleChange}
                />
                <div>
                  <h5 className="l-color">Add End Time?</h5>
                  <input
                    type="radio"
                    id="timeEnd"
                    name="spotEndTime"
                    className="radio"
                    onChange={() => setAddEndTimeRadio(true)}
                  />
                  <label className="radiotext" for="timeEnd">
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="timeEnd"
                    name="spotEndTime"
                    className="radio"
                    onChange={() => setAddEndTimeRadio(false)}
                  />
                  <label for="timeEnd">No</label>
                  {addEndTimeRadio === true ? (
                    <>
                      <h5 className="l-color">Enter End Time</h5>
                      <input
                        className="input-style"
                        type="time"
                        placeholder="Time"
                        name="endTime"
                        onChange={handleChange}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <h5 className="l-color">Publish Dest</h5>
                <Toggle
                  defaultChecked={checked}
                  icons={false}
                  name="isPublished"
                  onChange={handlePublish}
                />
                {/* <h5 className="l-color">Is the Dest free to Enter?</h5>
                <input
                  type="radio"
                  id="payment"
                  name="isFree"
                  className="radio"
                  onChange={handleFree}
                />
                <label className="radiotext" for="payment">
                  Yes
                </label>
                <input
                  type="radio"
                  id="payment"
                  name="isFree"
                  className="radio"
                  onChange={handlePaid}
                />
                <label for="payment">No</label>
                {spot.isFree === false ? (
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h5 className="l-color">
                        Enter Total Number of Tickets &nbsp;
                      </h5>
                      <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                    </div>
                    <input
                      className="input-style"
                      type="number"
                      placeholder="Number of Tickets"
                      name="seats"
                      onChange={handleChange}
                    />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h5 className="l-color">Enter Price Per Ticket &nbsp;</h5>
                      <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                    </div>
                    <input
                      className="input-style"
                      type="number"
                      placeholder="Price Per Ticket"
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <></>
                )} */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {spot.isFree === true ? (
                    <>
                      {spotName === false &&
                      spotNameAr === false &&
                      spotImage === false &&
                      spotLocation === false &&
                      spotDescription === false &&
                      spotDescriptionAr === false &&
                      spotDetails === false &&
                      startTime === false &&
                      spotDetailsAr === false ? (
                        <>
                          {isLoading ? (
                            <input
                              className="button-signx ing-create"
                              disabled
                              type="submit"
                              value="Creating Dest..."
                            />
                          ) : (
                            <input
                              className="button-sign ing-create"
                              type="submit"
                              value="Create Dest"
                            />
                          )}
                        </>
                      ) : (
                        <input
                          className="button-signx ing-create"
                          type="submit"
                          disabled
                          value="Create Dest"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {spotName === false &&
                      spotNameAr === false &&
                      spotImage === false &&
                      spotLocation === false &&
                      spotDescription === false &&
                      spotDetails === false &&
                      spotSeats === false &&
                      startTime === false &&
                      spotPrice === false ? (
                        <>
                          {isLoading ? (
                            <input
                              className="button-signx ing-create"
                              disabled
                              type="submit"
                              value="Creating Dest..."
                            />
                          ) : (
                            <input
                              className="button-sign ing-create"
                              type="submit"
                              value="Create Dest"
                            />
                          )}
                        </>
                      ) : (
                        <input
                          className="button-signx ing-create"
                          type="submit"
                          disabled
                          value="Create Dest"
                        />
                      )}
                    </>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <h5 className="l-color-tiny-image">(Feilds with</h5>
                    <h5 style={{ color: "red" }}>&nbsp;*&nbsp;</h5>
                    <h5 className="l-color-tiny-image">are reqiured)</h5>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="whitebackgroundcreateoff">
            <img
              style={{ height: "40%", width: "50%" }}
              src={require("../pics/EmptyTickets.png")}
            ></img>
            <h1 className="codelabel">You Don't have any Dest Credits</h1>
            <h1 className="codelabelsecond">
              To get more Dest Credits, contact us in WhatsApp at 99440289
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSpot;
