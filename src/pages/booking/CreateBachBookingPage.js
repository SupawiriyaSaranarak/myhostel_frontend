import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import { Layout } from "antd";
import Header from "../../components/Header";
import CreateBachBookingContent from "../../components/bookingComponent/CreateBachBookingContent";

const { Footer, Sider, Content } = Layout;
function CreateBachBookingPage() {
  return (
    <>
      <Layout>
        <Header style={{ position: "fixed", top: "0px", left: "20px" }} />
        <CreateBachBookingContent style={{ margin: "200px" }} />
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

export default CreateBachBookingPage;
