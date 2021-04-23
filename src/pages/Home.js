import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Layout } from "antd";
import Header from "../components/Header";
// import GetAllAccomodationContent from "../components/GetAllAccomodationContent";
// import GetAllRoomContent from "../components/GetAllRoomContent";
// import GetAllFacilityContent from "../components/GetAllFacilityContent";
import GetAllBookingContent from "../components/GetAllBookingContent";

const { Footer, Sider, Content } = Layout;
function Home() {
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

export default Home;
