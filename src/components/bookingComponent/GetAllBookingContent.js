import React from "react";
import axios from "axios";
import { Table } from "antd";
import { Modal, Button, Form } from "antd";
import { Image } from "antd";
import "./bookingContainer.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ContentHeader from "../ContentHeader";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import ModalCreateNewBooking from "../../modals/ModalCreateNewBooking";
import ModalGetBookingById from "../../modals/ModalGetBookingById";
import BookingDataContainer from "./BookingDataContainer";

function GetAllBookingContent() {
  const [result, setResult] = useState([]);

  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const res = await axios.get("/admin/booking");
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

  //Show slip modal

  const handleConfirmBooking = async (id) => {
    console.log(id);
    const req = { bookingStatus: "CONFIRM" };
    console.log(req);
    const response = await axios.put(`/user/booking/${id}`, req);
    alert(response.data.message);
    history.push(`/booking/get-booking-by-id/${id}`);
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
    <>
      <div className="content-body">
        <ContentHeader name="Booking" button={button} />
        <BookingDataContainer
          result={result}
          handleConfirmBooking={handleConfirmBooking}
        ></BookingDataContainer>
        <ModalGetBookingById
          title="Insert ID To Get Booking"
          visible={isGetByIdModalVisible}
          onOk={handleSubmitToGetBookingById}
          onCancel={handleCancelGetById}
          okText="OK"
          cancelText="Cancel"
          setIsCreateBookingModalVisible={setIsGetByIdModalVisible}
        />
        {/* <ModalCreateNewBooking
          title="Create New Booking"
          visible={isCreateBookingModalVisible}
          onOk={handleSubmitToCreateBooking}
          onCancel={handleCancelCreateBooking}
          okText="OK"
          cancelText="Cancel"
          setIsCreateBookingModalVisible={setIsCreateBookingModalVisible}
        /> */}
      </div>
    </>
  );
}

export default GetAllBookingContent;
