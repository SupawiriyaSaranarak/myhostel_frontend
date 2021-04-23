import React from "react";
import axios from "axios";
import { Table } from "antd";
import { Modal, Button, Form } from "antd";
import { Image } from "antd";
import "./bookingContainer.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import ContentHeader from "./ContentHeader";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import ModalCreateNewBooking from "../modals/ModalCreateNewBooking";
import ModalGetBookingById from "../modals/ModalGetBookingById";

function GetAllBookingContent() {
  const [result, setResult] = useState([]);

  const [error, setError] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const res = await axios.get("http://localhost:8000/booking");
        setResult(res.data.booking);
        console.log("res : ", res);
      } catch (err) {
        console.dir(err);
        setError(err.response.data.message);
      }
    };
    getAllRooms();
  }, []);

  console.log(result);

  //GetById

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

  //createBooking

  const [
    isCreateBookingModalVisible,
    setIsCreateBookingModalVisible,
  ] = useState(false);

  const showModalCreateBooking = () => {
    setIsCreateBookingModalVisible(true);
  };

  const handleSubmitToCreateBooking = async (values) => {
    setIsCreateBookingModalVisible(false);
  };
  const onCreate = (values) => {
    console.log(values);
    // try {
    //   const res = await axios.post("http://localhost:8000/booking");
    //   setResult(res.data.booking);
    //   console.log("res : ", res);
    // } catch (err) {
    //   console.dir(err);
    //   setError(err.response.data.message);
    // }
  };

  const handleCancelCreateBooking = () => {
    setIsCreateBookingModalVisible(false);
  };

  const button = [
    <Button
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
      style={{
        backgroundColor: "rgba(174, 115, 75, 1)",
        border: "none",
        color: "white",
      }}
      onClick={showModalCreateBooking}
      icon={<PlusCircleOutlined />}
      shape="round"
    >
      Create
    </Button>,
  ];

  return (
    <>
      <div className="content-body">
        <ContentHeader name="Booking" button={button} />
        <div className="container-box">
          {result.map((item) => {
            const {
              id,
              clientEmail,
              checkinDate,
              checkoutDate,
              price,
              paymentAmount,
              paymentMethod,
              paymentStatus,
              paymentImg,
              discount,
              bookingStatus,
              createdAt,
              userId,
              BookingItems,
            } = item;

            return (
              <div key={id} className="item-box">
                <div style={{ width: "200px" }}>
                  <h4>
                    <b>ID</b>
                  </h4>
                  <h1>{id}</h1>
                </div>
                <div style={{ width: "1000px" }}>
                  <div>
                    <h4>
                      <b>DESCRIPTION</b>
                    </h4>
                    <span>
                      <b>Check In:</b> {checkinDate}
                    </span>
                    &nbsp;
                    <span>
                      <b>Check Out:</b> {checkoutDate}
                    </span>
                    <br />
                    <span>
                      <b>Email:</b> {clientEmail}
                    </span>
                    <br />
                    <span>
                      <b>Status:</b> {bookingStatus}
                    </span>
                    <br />
                    <span>
                      <b>Booking Date:</b> {createdAt}
                    </span>
                    <br />
                    <span>
                      <b>By:</b> User {userId}
                    </span>
                    <br />
                  </div>
                </div>
                <div style={{ width: "500px" }}>
                  <h4>
                    <b>PAYMENT</b>
                  </h4>
                  <span>
                    <b>Price :</b> {price}
                  </span>
                  <br />
                  <span>
                    <b>Amont:</b> {paymentAmount}
                  </span>
                  <br />
                  <span>
                    <b>Discount: </b> {discount}
                  </span>
                  <br />
                  <span>
                    <b>Method:</b> {paymentMethod}
                  </span>
                  <br />
                  <span>
                    <b>Status:</b> {paymentStatus}
                  </span>
                  <br />
                  <span>
                    <b>Image:</b> {paymentImg}
                  </span>
                  <br />
                </div>
                <div style={{ width: "1000px" }}>
                  <div>
                    <h4>
                      <b>ITEM</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        key={id}
                        style={{
                          backgroundColor: "rgba(174, 115, 75, 1)",
                          border: "none",
                        }}
                        type="primary"
                        shape="circle"
                        size="small"
                        icon={<EditOutlined />}
                      />
                    </h4>

                    {BookingItems.map((item) => (
                      <>
                        <span>
                          <b>Date:</b>
                          {item.dateUse}
                        </span>
                        &nbsp;&nbsp;
                        <span>
                          <b>Bed:</b>
                          {item.Accomodation.id}
                        </span>
                        &nbsp;&nbsp;
                        <span>
                          <b>Room:</b>
                          {item.Accomodation.roomId}
                        </span>
                        &nbsp;&nbsp;
                        <span>
                          <b>Price:</b>
                          {item.Accomodation.price}
                        </span>
                        <br />
                      </>
                    ))}
                  </div>
                  <div></div>
                </div>
                <div
                  style={{
                    width: "200px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    height: "100px",
                  }}
                >
                  <Button
                    key={id}
                    style={{
                      backgroundColor: "rgba(174, 115, 75, 1)",
                      border: "none",
                    }}
                    type="primary"
                    shape="circle"
                    size="small"
                    icon={<EditOutlined />}
                  />
                  &nbsp;
                  <Button
                    key={id}
                    style={{
                      backgroundColor: "rgba(174, 115, 75, 1)",
                      border: "none",
                    }}
                    type="primary"
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Modal
          title="Get Booking By ID"
          visible={isGetByIdModalVisible}
          onOk={handleSubmitToGetBookingById}
          onCancel={handleCancelGetById}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <ModalCreateNewBooking
          title="Create New Booking"
          visible={isCreateBookingModalVisible}
          onOk={handleSubmitToCreateBooking}
          onCancel={handleCancelCreateBooking}
          okText="OK"
          cancelText="Cancel"
          setIsCreateBookingModalVisible={setIsCreateBookingModalVisible}
        />
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
    </>
  );
}

export default GetAllBookingContent;
