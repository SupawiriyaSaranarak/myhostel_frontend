import React from "react";
import { Modal, Button, Form } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function BookingDataContainer(prop) {
  const history = useHistory();

  return (
    <>
      <div className="container-box">
        {prop.result.map((item) => {
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
                <Button
                  style={{
                    backgroundColor: "rgba(174, 115, 75, 1)",
                    border: "none",
                  }}
                  type="primary"
                  shape="circle"
                  size="small"
                  onClick={() =>
                    history.push(`/booking/get-booking-by-id/${id}`)
                  }
                >
                  {id}
                </Button>
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
                    {"  "}
                    {bookingStatus === "CONFIRM" ? (
                      <CheckCircleOutlined style={{ color: "green" }} />
                    ) : null}
                    {bookingStatus === "PENDING" && paymentStatus === "PAID" ? (
                      <Button
                        style={{
                          backgroundColor: "rgba(174, 115, 75, 1)",
                          border: "none",
                        }}
                        type="primary"
                        shape="round"
                        size="small"
                        onClick={() => prop.handleConfirmBooking(id)}
                      >
                        Confirm
                      </Button>
                    ) : null}
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
                  <b>Discount: </b> {Math.round(discount * 100)} %
                </span>
                <br />
                <span>
                  <b>Method:</b> {paymentMethod}
                </span>
                <br />
                <span>
                  <b>Status:</b> {paymentStatus}
                  {"  "}
                  {paymentStatus === "PAID" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : null}
                </span>
                <br />
                <span>
                  <b>Image:</b>
                  <a href={paymentImg}>Slip</a>
                  {/* <img src={paymentImg} alt="Payment Slip" /> */}
                  {/* <button onClick={() => setIsSlipModalVisible(true)}>
                      Payment Slip
                    </button>
                    <Modal
                      title="Slip"
                      visible={isSlipModalVisible}
                      onOk={handleCloseSlipModal}
                      okText="OK"
                      setIsSlipModalVisible={setIsSlipModalVisible}
                    >
                      <img src={paymentImg} alt="Payment Slip" />
                    </Modal> */}
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
                  onClick={() =>
                    history.push(`/booking/update-booking-by-id/${id}`)
                  }
                />
                &nbsp;
                {/* <Button
                  key={id}
                  style={{
                    backgroundColor: "rgba(174, 115, 75, 1)",
                    border: "none",
                  }}
                  type="primary"
                  shape="circle"
                  size="small"
                  icon={<DeleteOutlined />}
                /> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BookingDataContainer;
