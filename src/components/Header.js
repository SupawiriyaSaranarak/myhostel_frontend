import React, { useContext } from "react";
import { Row, Col } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Header.css";
import MenuForSuperadmin from "./MenuForSuperadmin";
import Search from "./Search";
import Icon from "../picture/hostel.png";
import { Link, useHistory } from "react-router-dom";
import localStorageService from "../services/localStorageService";
import { AuthContext } from "../contexts/AuthContextProvider";

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorageService.clearToken();
    setUser(false);
    history.push("/login");
  };
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
            {(user.userStatus === "ADMIN" ||
              user.userStatus === "SUPERADMIN") && (
              <a onClick={(e) => handleLogout(e)}>
                <LogoutOutlined style={{ fontSize: "40px" }} />
                <br></br>
                LogOut
              </a>
            )}
            {!user && (
              <a onClick={() => history.push("/login")}>
                <LoginOutlined style={{ fontSize: "40px" }} />
                <br></br>
                Register/LogIn
              </a>
            )}
          </Col>
        </Row>
      </nav>
    </div>
  );
}

export default Header;
