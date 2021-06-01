import React from "react";
import axios from "axios";
import { Table } from "antd";
import { Modal, Button, Form } from "antd";
import { Image } from "antd";
import "./bookingContainer.css";
import ContentHeader from "../ContentHeader";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";
import ModalGetBookingById from "../../modals/ModalGetBookingById";

function CreateBookingContent() {
  // const [result, setResult] = useState([]);

  const [error, setError] = useState({});

  const [picture, setPicture] = useState([]);

  const history = useHistory();

  const { id } = useParams();
  const [input, setInput] = useState({
    // clientEmail: result.clientEmail,
    // price: result.price,
    // paymentAmount: result.paymentAmount,
    // paymentMethod: result.paymentMethod,
    // paymentStatus: result.paymentStatus,
    // paymentImg: result.paymentImg,
    // bookingStatus: result.bookingStatus,
  });
  console.log(input);

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const res = await axios.get(`/admin/booking/${id}`);
        // setResult(res.data.booking[0]);
        setInput(res.data.booking[0]);
        console.log("res : ", res.data.booking[0]);
      } catch (err) {
        console.dir(err);
        // setError(err.response.data.message);
      }
    };
    getAllRooms();
  }, []);
  // console.log("result:", result);
  console.log("input:", input);
  // upload picture
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [productImg, setProductImg] = useState(input.paymentImg);

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

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setError({});
    e.preventDefault();
    try {
      console.log("555");
      console.log(input);

      const req = { ...input, paymentImg: productImg };
      console.log(req);
      const response = await axios.put(`/admin/booking/${id}`, req);
      // .then((res) => history.push("/booking/all"));

      // console.log(response);
      alert(response.data.message);
      history.push("/booking/all");

      setInput({
        clientEmail: "",

        price: "",
        paymentAmount: "",
        paymentMethod: "",
        paymentStatus: "",
        paymentImg: "",
        bookingStatus: "",
      });

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
    <Button
      key="3"
      style={{
        backgroundColor: "rgba(174, 115, 75, 1)",
        border: "none",
        color: "white",
      }}
      href="/booking/createbach"
      icon={<PlusCircleOutlined />}
      shape="round"
    >
      Create Bach
    </Button>,
  ];

  return (
    <div className="content-body">
      <div style={{ height: "auto" }}>
        <ContentHeader name="Update Booking" button={button} />
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
                defaultValue={input.clientEmail}
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
                defaultValue={input.price}
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
                defaultValue={input.paymentAmount}
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
                        style={{ width: "200px", height: "200px" }}
                      />
                    </>
                  )}
                  {!productImg && input.paymentImg && (
                    <>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img
                        src={input.paymentImg}
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
                defaultValue={input.paymentStatus}
                onChange={handleInputChange}
              >
                <option
                  name="paymentStatus"
                  value="PENDING"
                  selected={
                    "PENDING" === input.paymentStatus ? "selected" : null
                  }
                >
                  Pending
                </option>
                <option
                  name="paymentStatus"
                  value="PAID"
                  selected={"PAID" === input.paymentStatus ? "selected" : null}
                >
                  Paid
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
                <option
                  name="paymentMethod"
                  value="CASH"
                  selected={"CASH" === input.paymentMethod ? "selected" : null}
                >
                  Cash
                </option>
                <option
                  name="paymentMethod"
                  value="CREDIT"
                  selected={
                    "CREDIT" === input.paymentMethod ? "selected" : null
                  }
                >
                  Credit
                </option>
                <option
                  name="paymentMethod"
                  value="TRANSFER"
                  selected={
                    "TRANSFER" === input.paymentMethod ? "selected" : null
                  }
                >
                  Transfer
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bookingStatus">Booking Status:</label>&nbsp;&nbsp;
              <select
                id="bookingStatus"
                name="bookingStatus"
                onChange={handleInputChange}
              >
                <option name="bookingStatus" selected>
                  Select Booking Status
                </option>
                <option
                  name="bookingStatus"
                  value="PENDING"
                  selected={
                    "PENDING" === input.bookingStatus ? "selected" : null
                  }
                >
                  Pending
                </option>
                <option
                  name="bookingStatus"
                  value="CONFIRM"
                  selected={
                    "CONFIRM" === input.bookingStatus ? "selected" : null
                  }
                >
                  Confirm
                </option>
                <option
                  name="bookingStatus"
                  value="CANCEL"
                  selected={
                    "CANCEL" === input.bookingStatus ? "selected" : null
                  }
                >
                  Cancel
                </option>
              </select>
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
