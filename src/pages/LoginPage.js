import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Layout } from "antd";
import Register from "../components/Auth/Register";
import LogIn from "../components/Auth/LogIn";
import Header from "../components/Header";

const { Footer, Sider, Content } = Layout;
function LoginPage() {
  return (
    <>
      {/* <div>Hi</div> */}
      <Layout>
        <Header style={{ position: "fixed", top: "0px", left: "20px" }} />
        <div
          style={{
            height: "30px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Register
            style={{
              width: "20%",
              margin: "200px",
              marginBottom: "30px",
              marginRight: "20px",
            }}
          />
          <div
            style={{
              width: "40px",
            }}
          ></div>
          <LogIn
            style={{ width: "20%", margin: "200px", marginLeft: "20px" }}
          />
        </div>
        <div
          style={{
            height: "100px",
          }}
        ></div>
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

export default LoginPage;
