import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import { Layout } from "antd";
import Header from "../../components/Header";
import GetAllBookingContent from "../../components/bookingComponent/GetAllBookingContent";

const { Footer, Sider, Content } = Layout;
function AllBookingPage() {
  return (
    <>
      <Layout>
        <Header style={{ position: "fixed", top: "0px", left: "20px" }} />
        <GetAllBookingContent style={{ margin: "200px" }} />
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default AllBookingPage;
