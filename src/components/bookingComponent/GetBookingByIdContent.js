import React from "react";
import axios from "axios";
import { Table } from "antd";
import { Modal, Button, Form } from "antd";
import { Image } from "antd";
import "./bookingContainer.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import ContentHeader from "../ContentHeader";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import ModalCreateNewBooking from "../../modals/ModalCreateNewBooking";
import ModalGetBookingById from "../../modals/ModalGetBookingById";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../../contexts/Context";
import BookingDataContainer from "./BookingDataContainer";

function GetBookingByIdContent() {
  const history = useHistory();
  const [result, setResult] = useState([]);

  const [error, setError] = useState("");
  const [form] = Form.useForm();
  // const { id } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const res = await axios.get(`/admin/booking/${id}`);
        setResult(res.data.booking);
        console.log("res : ", res);
      } catch (err) {
        console.dir(err);
        // setError(err.response.data.message);
      }
    };
    getAllRooms();
  }, [id]);

  console.log(result);

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

  // const [isSlipModalVisible, setIsSlipModalVisible] = useState(false);

  // const handleCloseSlipModal = () => {
  //   setIsSlipModalVisible(false);
  // };

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

export default GetBookingByIdContent;
