// import React from "react";
// import { Modal, Form, DatePicker, TimePicker } from "antd";
// import { Input, Cascader, Select, Checkbox, AutoComplete } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Radio, Alert } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
// import ErrorAlert from "../components/ErrorAlert";

function ModalCreateNewBooking(props) {
  const [result, setResult] = useState([]);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState({});
  const [check, setCheck] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getAllAccomodation = async () => {
      try {
        const res = await axios.get("http://localhost:8000/accomodations");

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

  // const accIdCheck = {};
  // for (let k of result) {
  //   accIdCheck[k.id] = false;
  // }
  // console.log(accIdCheck);

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
      const req = { ...input, accomodationId };
      console.log(req);
      const response = await axios.post("http://localhost:8000/booking", req);
      // .then((res) => history.push("/booking/all"));

      // console.log(response);
      alert(response.data.message);

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
      props.setIsCreateBookingModalVisible(false);
      history.push("/");
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
            <label for="clientEmail">Client Email:</label>&nbsp;&nbsp;
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
            <label for="checkinDate">Check In:</label> &nbsp;&nbsp;
            <input
              className="form-control"
              type="date"
              name="checkinDate"
              value={input.checkinDate}
              onChange={handleInputChange}
            />{" "}
            &nbsp;&nbsp;
            <label for="checkoutDate">Check Out:</label> &nbsp;&nbsp;
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
            <label for="Price">Price:</label>&nbsp;&nbsp;
            <input
              className="form-control"
              type="text"
              name="price"
              value={input.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label for="paymentAmount">Amount:</label>&nbsp;&nbsp;
            <input
              className="form-control"
              type="text"
              name="paymentAmount"
              value={input.paymentAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label for="paymentImg">Payment Slip:</label>&nbsp;&nbsp;
            <input
              className="form-control"
              type="text"
              name="paymentImg"
              value={input.paymentImg}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label for="paymentMethod">Payment Status:</label>&nbsp;&nbsp;
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
            <label for="paymentMethod">Payment Method:</label>&nbsp;&nbsp;
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
              <option name="paymentStatus" value="CREDIT">
                CREDIT
              </option>
              <option name="paymentStatus" value="TRANSFER">
                TRANSFER
              </option>
            </select>
          </div>

          <div className="form-group">
            <label for="discount">Discount:</label>&nbsp;&nbsp;
            <input
              className="form-control"
              type="text"
              name="discount"
              value={input.discount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label for="accomodationId">AccomodationId:</label>&nbsp;&nbsp;
            {result.map((item) => (
              <>
                <input
                  className="form-control"
                  type="checkbox"
                  id={item.id}
                  name="accomodationId"
                  value={item.id}
                  onChange={handleInputChange}
                />
                <label for={item.id}> {item.id}</label>&nbsp;&nbsp;
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
      </Modal>
    </>
  );
}

export default ModalCreateNewBooking;
