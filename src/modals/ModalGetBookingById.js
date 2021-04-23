import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Input, Radio, Alert } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Context } from "../contexts/Context";

function ModalGetBookingById(props) {
  const [result, setResult] = useState([]);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState({});
  const [check, setCheck] = useState(false);
  const history = useHistory();
  const [searchId, setSearchId] = useState("");
  const handleInputChange = (e) => {
    setSearchId(e.target.value);
  };
  const { setId } = useContext(Context);

  const handleSubmit = async (e) => {
    try {
      setError({});
      e.preventDefault();

      //   const response = await axios.get(`http://localhost:8000/booking/${id}`);
      // .then((res) => history.push("/booking/all"));

      // console.log(response);
      setId(searchId);

      props.setIsCreateBookingModalVisible(false);
      history.push(`/booking/get-booking-by-id/${searchId}`);
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

  return (
    <>
      <Modal
        title="Create New Booking"
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        okText={props.okText}
        cancelText={props.cancelText}
      >
        {error.server && <span>{error.server}</span>}
        {error.front && <span>{error.front}</span>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="id">Booking ID:</label>&nbsp;&nbsp;
            <input
              className="form-control"
              type="text"
              name="id"
              placeholder="Insert Booking ID"
              value={searchId}
              onChange={handleInputChange}
            />
            <br />
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
      </Modal>
    </>
  );
}

export default ModalGetBookingById;
