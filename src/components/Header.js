import React from "react";
import { Row, Col } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Header.css";
import MenuForSuperadmin from "./MenuForSuperadmin";
import Search from "./Search";
import Icon from "../picture/hostel.png";
import { Link, useHistory } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav className="nav-bar">
        <Row className="header-container">
          <Col className="header-icon" span={4}>
            <img style={{ width: "80px" }} src={Icon} alt="hostel-icon" />
          </Col>
          <Col className="gg" span={16}>
            <Row className="header-container">
              <Search />
            </Row>
            <Row className="header-container">
              <MenuForSuperadmin />
            </Row>
          </Col>
          <Col className="header-icon" span={4}>
            <Link className="link" to="/booking">
              <LoginOutlined style={{ fontSize: "40px" }} />
              <br></br>
              Register/LogIn
            </Link>
          </Col>
        </Row>
      </nav>
    </div>
  );
}

export default Header;
