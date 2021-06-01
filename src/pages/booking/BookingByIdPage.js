import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import { Layout } from "antd";
import Header from "../../components/Header";
import GetBookingByIdContent from "../../components/bookingComponent/GetBookingByIdContent";

const { Footer, Sider, Content } = Layout;
function BookingByIdPage() {
  return (
    <>
      <Layout>
        <Header style={{ position: "fixed", top: "0px", left: "20px" }} />
        <GetBookingByIdContent style={{ margin: "200px" }} />
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default BookingByIdPage;
