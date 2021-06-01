import { useContext, useState, useRef } from "react";
import axios from "../../config/axios";
import { useHistory } from "react-router-dom";

import localStorageService from "../../services/localStorageService";
import { AuthContext } from "../../contexts/AuthContextProvider";

import jwtDecode from "jwt-decode";

function Register() {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const isPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(input);
  };
  console.log("input", input);
  //Image Upload
  // const [uploadImage, setUploadImage] = useState(null);

  // const handlerUploadImage = (e) => {
  //   // console.log(e);
  //   if (e.target.files[0]) {
  //     setUploadImage(e.target.files[0]);
  //   } else {
  //     setUploadImage(null);
  //   }
  // };

  // Hide Upload Input
  // const hiddenFileInput = useRef(null);
  // const handleClickUploadRoomAddImg = (e) => {
  //   hiddenFileInput.current.click();
  // };
  // upload picture
  const validateInput = () => {
    const newError = {};
    if (!input.firstName || !input.firstName.trim())
      newError.firstName = "First name is required.";
    if (!input.lastName || !input.lastName.trim())
      newError.lastName = "Last name is required.";
    if (!input.email || !input.email.trim())
      newError.email = "Email is required.";
    if (!input.password || !input.password.trim())
      newError.password = "Password is required.";
    if (!input.confirmPassword || !input.confirmPassword.trim())
      newError.confirmPassword = "Confirm password is required.";
    if (!input.phone || !input.phone.trim())
      newError.phone = "Phone number is required.";
    if (!isEmail.test(input.email)) newError.email = "This is not an email.";
    if (!isPassword.test(input.password))
      newError.password =
        "Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number .";
    if (input.password !== input.confirmPassword)
      newError.confirmPassword =
        "Password and confirm password are not matched.";
    if (!isPhone.test(input.phone))
      newError.phone = "This is not a phone number.";
    setError(newError);
    console.log(error);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("submit");
      validateInput();

      // const formData = new FormData(); // ทำให้เป็น multipart from data เพื่อให้ axios ตรวจจับได้ง่ายๆ
      // formData.append("image", uploadImage);
      // const res = await axios.post("/upload", formData);
      const response = await axios.post("/register", {
        ...input,
        // userImg: res.data.img,
      });

      localStorageService.setToken(response.data.token);
      const payload = jwtDecode(response.data.token);
      setUser(payload);
      history.push("/register-success");
    } catch (err) {
      if (err.response) {
        console.log({ err });
        // console.log({ server: err.response.data.message });
        setError({ server: err.response.data.message });
        console.log(error.server);
      } else {
        console.log({ front: err.message });
        setError({ front: err.message });
      }
    }
  };
  return (
    <div>
      <div className="dashboad-header">
        <div className="roomBar-container-header-dashLine">
          <div className="roomBar-container-header-dashLine-inside"></div>
          <div></div>
        </div>
        <div className="roomBar-container-header-dashLine-text-padding"></div>
        <p className="roomBar-container-header-dashLine-text">
          {/* REGISTER */}
        </p>
        <div className="roomBar-container-header-dashLine-text-padding"></div>
        <div className="roomBar-container-header-dashLine">
          <div className="roomBar-container-header-dashLine-inside"></div>
          <div></div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "20px",
          backgroundColor: "#edd1b0",
          borderRadius: "10px",
          minWidth: "500px",
        }}
      >
        <div>
          <b>REGISTER</b>
        </div>
        <br />
        <div class="h-7"></div>

        <form onSubmit={handleSubmit}>
          <div
            className="form-div"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <label htmlFor="firstName">First Name</label>

            <div>
              <input
                className="form-div"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={input.firstName}
                onChange={handleInputChange}
              />
            </div>
            {error.firstName ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.firstName}
              </div>
            ) : null}
          </div>
          <br />
          <div
            className="form-div"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <label htmlFor="lastName">Last Name</label>

            <div>
              <input
                className="form-div"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={input.lastName}
                onChange={handleInputChange}
              />
            </div>
            {error.lastName ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.lastName}
              </div>
            ) : null}
          </div>
          <br />
          <div className=" form-div">
            <label htmlFor="email">Email</label>
            <div>
              <input
                className="form-div"
                type="text"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>
            {error.email ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.email}
              </div>
            ) : null}
          </div>
          <br />
          <div className="form-div">
            <label htmlFor="password">Password</label>
            <div>
              <input
                className="form-div"
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={handleInputChange}
              />
            </div>
            {error.password ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.password}
              </div>
            ) : null}
          </div>
          <br />
          <div className="form-div">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <div>
              <input
                className="form-div"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={input.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            {error.confirmPassword ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.confirmPassword}
              </div>
            ) : null}
          </div>
          <br />
          {/* <div className="form-group form-div">
            <div>
              <div>Upload User Image</div>
              <br />
              {uploadImage === null ? (
                <img
                  className="modal-roomAdd-box-content-image-box-Pre-img"
                  onClick={handleClickUploadRoomAddImg}
                />
              ) : (
                <img
                  src={URL.createObjectURL(uploadImage)}
                  className="modal-roomAdd-box-content-image-box-Pre-img"
                  onClick={handleClickUploadRoomAddImg}
                />
              )}
              <label
                htmlFor="roomAddImg"
                className="modal-roomAdd-box-content-image-box-insideText"
              >
                User Image
              </label>
            </div>
            <input
              id="roomAddImg"
              type="file"
              className="modal-roomAdd-box-content-image-input-uploadImg"
              ref={hiddenFileInput}
              onChange={handlerUploadImage}
            />
          </div> */}

          {/* <br />
          <div className="form-div">
            <label htmlFor="checkinDate">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={input.birthDate}
              onChange={handleInputChange}
            />
          </div>
          {error.birthDate ? (
            <div style={{ fontSize: "12px", color: "red" }}>
              {error.birthDate}
            </div>
          ) : null}
          <br /> */}
          <div
            className="form-div"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <label htmlFor="phone">Phone</label>

            <div>
              <input
                className="form-div"
                type="text"
                name="phone"
                placeholder="Phone"
                value={input.phone}
                onChange={handleInputChange}
              />
            </div>
            {error.phone ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.phone}
              </div>
            ) : null}
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="button"
              // disabled={uploadImage ? false : true}
            >
              Register
            </button>
          </div>
        </form>
        {error.server ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <br />
            <div style={{ fontSize: "12px", color: "red" }}>{error.server}</div>
          </div>
        ) : null}
        {error.front ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <br />
            <div style={{ fontSize: "12px", color: "red" }}>{error.front}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Register;
