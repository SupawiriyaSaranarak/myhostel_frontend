import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Layout } from "antd";
import Header from "../components/Header";
// import GetAllAccomodationContent from "../components/GetAllAccomodationContent";
// import GetAllRoomContent from "../components/GetAllRoomContent";
// import GetAllFacilityContent from "../components/GetAllFacilityContent";
import GetAllBookingContent from "../components/bookingComponent/GetAllBookingContent";

const { Footer, Sider, Content } = Layout;
function RegisterSuccessPage() {
  return (
    <>
      <Layout>
        <Header style={{ position: "fixed", top: "0px", left: "20px" }} />
        <div style={{ display: "flex", flexDirection: "row", height: "100vw" }}>
          <div style={{ width: "30%" }}></div>
          <div style={{ width: "40%" }}>
            <div style={{ height: "40px" }}></div>
            <div style={{ color: "green", fontSize: "26px" }}>
              Register Sucess
            </div>
            <div style={{ fontSize: "20px" }}>
              Wait admin to approve your registration
            </div>
          </div>
          <div style={{ width: "30%" }}></div>
        </div>
        <Footer
          style={{
            position: "fixed",
            bottom: "0px",
            height: "10px",
            width: "100vw",
            backgroundColor: "rgba(105, 77, 63, 1)",
          }}
        >
          Footer
        </Footer>
      </Layout>
    </>
  );
}

export default RegisterSuccessPage;
