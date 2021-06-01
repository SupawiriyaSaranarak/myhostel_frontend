import React from "react";
import axios from "axios";
import { Table } from "antd";
import { Modal, Button, Form } from "antd";
import { Image } from "antd";
import "./bookingContainer.css";
import ContentHeader from "../ContentHeader";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ModalGetBookingById from "../../modals/ModalGetBookingById";

function CreateBookingContent() {
  const [result, setResult] = useState([]);

  const [error, setError] = useState({});

  const [picture, setPicture] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getAllAccomodation = async () => {
      try {
        const res = await axios.get("/admin/accomodations");

        setResult(res.data.accomodations);
      } catch (err) {
        console.dir(err);
        setError(err.response.data.message);
      }
    };
    getAllAccomodation();
  }, []);

  const [input, setInput] = useState({
    clientEmail: "",
    checkinDate: "",
    checkoutDate: "",
    price: "",
    paymentAmount: "",
    paymentMethod: "",
    paymentStatus: "",
    paymentImg: "",
    discount: "",
    accomodationId: [],
  });
  console.log(input);
  const [accomodationId, setAccomodationId] = useState([]);
  // upload picture
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [productImg, setProductImg] = useState(null);

  const handleFileChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("hello");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    console.log(formData);
    await axios
      .post("/picture-upload", formData)
      .then((res) => {
        setProductImg(res.data.imgUrl);
      })
      .catch((err) => {});
  };
  // upload picture

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    console.log(name);
    console.log(value);
    console.log(checked);

    if (name === "accomodationId" && checked) {
      const newAcc = [...accomodationId];
      newAcc.push(value);
      setAccomodationId(newAcc);
      console.log(newAcc);
    }
    if (name === "accomodationId" && !checked) {
      const newAcc = [...accomodationId];
      let deletedIndex = newAcc.findIndex((x) => x === value);
      console.log(deletedIndex);
      newAcc.splice(deletedIndex, 1);
      setAccomodationId(newAcc);
      console.log(newAcc);
    }

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setError({});
    e.preventDefault();
    try {
      console.log("555");
      console.log(input);
      console.log(accomodationId);
      const req = { ...input, accomodationId, paymentImg: productImg };
      console.log(req);
      const response = await axios.post("/admin/booking", req);
      // .then((res) => history.push("/booking/all"));

      // console.log(response);
      alert(response.data.message);
      history.push("/booking/all");

      setInput({
        clientEmail: "",
        checkinDate: "",
        checkoutDate: "",
        price: "",
        paymentAmount: "",
        paymentMethod: "",
        paymentStatus: "",
        paymentImg: "",
        discount: "",
        accomodationId: [],
      });

      setAccomodationId([]);

      // console.log(response);
      // alert(response.data.message);

      // history.push("/booking/get-booking-by-id/:id");
    } catch (err) {
      if (err.response) {
        console.log(err);
        console.log({ server: err.response.data.message });
        // alert(err.response.data.message);
        // return (
        //   <Alert
        //     message="Error Text"
        //     description={err.response.data.message}
        //     type="error"
        //     closable
        //     // onClose={onClose}
        //   />
        // );

        setError({ server: err.response.data.message });
      } else {
        console.log({ front: err.message });
        // alert(err.message);
        setError({ front: err.message });
      }
    }
  };
  const [isGetByIdModalVisible, setIsGetByIdModalVisible] = useState(false);
  const showModalGetById = () => {
    setIsGetByIdModalVisible(true);
  };
  const handleSubmitToGetBookingById = () => {
    setIsGetByIdModalVisible(false);
  };

  const handleCancelGetById = () => {
    setIsGetByIdModalVisible(false);
  };

  const button = [
    <Button
      key="1"
      style={{
        backgroundColor: "rgba(174, 115, 75, 1)",
        border: "none",
        color: "white",
      }}
      icon={<SearchOutlined />}
      href="/booking/all"
      shape="round"
    >
      Get All
    </Button>,
    <Button
      key="2"
      type="primary"
      onClick={showModalGetById}
      style={{
        backgroundColor: "rgba(174, 115, 75, 1)",
        border: "none",
        color: "white",
      }}
      icon={<SearchOutlined />}
      shape="round"
    >
      Get By ID
    </Button>,
    <Button
      key="3"
      style={{
        backgroundColor: "rgba(174, 115, 75, 1)",
        border: "none",
        color: "white",
      }}
      href="/booking/create"
      icon={<PlusCircleOutlined />}
      shape="round"
    >
      Create
    </Button>,
  ];

  return (
    <div className="content-body">
      <div style={{ height: "auto" }}>
        <ContentHeader name="Booking" button={button} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "25%",
          }}
        ></div>
        <div
          style={{
            width: "75%",
          }}
        >
          {error.server && <span>{error.server}</span>}
          {error.front && <span>{error.front}</span>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="clientEmail">Client Email:</label>&nbsp;&nbsp;
              <input
                className="form-control"
                type="text"
                name="clientEmail"
                placeholder="Email"
                value={input.clientEmail}
                onChange={handleInputChange}
              />
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="checkinDate">Check In:</label> &nbsp;&nbsp;
              <input
                className="form-control"
                type="date"
                name="checkinDate"
                value={input.checkinDate}
                onChange={handleInputChange}
              />{" "}
              &nbsp;&nbsp;
              <label htmlFor="checkoutDate">Check Out:</label> &nbsp;&nbsp;
              <input
                className="form-control"
                type="date"
                name="checkoutDate"
                value={input.checkoutDate}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <label htmlFor="Price">Price:</label>&nbsp;&nbsp;
              <input
                className="form-control"
                type="text"
                name="price"
                value={input.price}
                onChange={handleInputChange}
                placeholder="Price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentAmount">Payment Amount:</label>&nbsp;&nbsp;
              <input
                className="form-control"
                type="text"
                name="paymentAmount"
                value={input.paymentAmount}
                onChange={handleInputChange}
                placeholder="Payment Amount"
              />
            </div>
            <div className="form-group">
              <div>
                <form
                // onSubmit={handleUpload}
                >
                  <label htmlFor="paymentImg">Payment Slip:</label>&nbsp;&nbsp;
                  <input
                    className="paymentImg"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleUpload}>Upload</button>
                  <br />
                  {productImg && (
                    <>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img
                        src={productImg}
                        alt="product"
                        style={{ width: "40%", height: "40%" }}
                      />
                    </>
                  )}
                </form>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Status:</label>&nbsp;&nbsp;
              <select
                id="paymentStatus"
                name="paymentStatus"
                onChange={handleInputChange}
              >
                <option name="paymentStatus" selected>
                  Select Payment Status
                </option>
                <option name="paymentStatus" value="PENDING">
                  PENDING
                </option>
                <option name="paymentStatus" value="PAID">
                  PAID
                </option>
              </select>
              <br />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>&nbsp;&nbsp;
              <select
                id="paymentMethod"
                name="paymentMethod"
                onChange={handleInputChange}
              >
                <option name="paymentMethod" selected>
                  Select Payment Method
                </option>
                <option name="paymentMethod" value="CASH">
                  CASH
                </option>
                <option name="paymentMethod" value="CREDIT">
                  CREDIT
                </option>
                <option name="paymentMethod" value="TRANSFER">
                  TRANSFER
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount:</label>&nbsp;&nbsp;
              <input
                className="form-control"
                type="text"
                name="discount"
                value={input.discount}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="accomodationId">AccomodationId:</label>
              &nbsp;&nbsp;
              {result.map((item) => (
                <>
                  <input
                    key={item.id}
                    className="form-control"
                    type="checkbox"
                    id={item.id}
                    name="accomodationId"
                    value={item.id}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={item.id}> {item.id}</label>&nbsp;&nbsp;
                </>
              ))}
            </div>

            <button
              style={{
                backgroundColor: "rgba(174, 115, 75, 1)",
                border: "none",
                color: "white",
                borderRadius: "20px",
                height: "32px",
                width: "90px",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div
        style={{
          height: "70px",
        }}
      ></div>
      <ModalGetBookingById
        title="Insert ID To Get Booking"
        visible={isGetByIdModalVisible}
        onOk={handleSubmitToGetBookingById}
        onCancel={handleCancelGetById}
        okText="OK"
        cancelText="Cancel"
        setIsCreateBookingModalVisible={setIsGetByIdModalVisible}
      />
    </div>
  );
}

export default CreateBookingContent;
