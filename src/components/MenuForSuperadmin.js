import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

function MenuForSuperadmin() {
  const bar = [
    {
      name: "User",
      actions: [
        { actionName: "Me", to: "/users/me" },
        { actionName: "Get all", to: "/users/all" },
        { actionName: "Get by Keyword", to: "/users/keyword" },
        { actionName: "Creat new", to: "/users/create" },
        { actionName: "Edit", to: "/users/edit" },
        { actionName: "Change Role", to: "/users/chage role" },
        { actionName: "Delete ", to: "/accomodations/delete" },
      ],
    },
    {
      name: "Accomodation",
      actions: [
        { actionName: "Get all", to: "/accomodations/all" },
        { actionName: "Get by ID", to: "/accomodations/id" },
        { actionName: "Creat new", to: "/accomodations/create" },
        { actionName: "Edit", to: "/accomodations/edit" },
        { actionName: "Delete ", to: "/accomodations/delete" },
      ],
    },
    {
      name: "Booking",
      actions: [
        { actionName: "Get all", to: "/booking/all" },
        { actionName: "Get by ID", to: "/booking/id" },
        { actionName: "Creat new", to: "/booking/create" },
        { actionName: "Create batch", to: "/booking/create-batch" },
        { actionName: "Edit", to: "/booking/edit" },
        { actionName: "Confirm Booking", to: "/booking/confirm" },
        { actionName: "Delete ", to: "/booking/delete" },
      ],
    },
    {
      name: "Booking Item",
      actions: [
        { actionName: "Get all", to: "/bookingitem/all" },
        { actionName: "Get by ID", to: "/bookingitem/id" },
        { actionName: "Edit", to: "/bookingitem/edit" },
        { actionName: "Delete ", to: "/bookingitem/delete" },
      ],
    },
    {
      name: "Precheck in",
      actions: [
        { actionName: "Get all", to: "/precheckin/all" },
        { actionName: "Get by ID", to: "/precheckin/id" },
        { actionName: "Create", to: "/precheckin/create" },
        { actionName: "Edit", to: "/precheckin/edit" },
        { actionName: "Request-Pending", to: "/precheckin/request-pending" },
        { actionName: "Delete ", to: "/precheckin/delete" },
      ],
    },
    {
      name: "Check in",
      actions: [
        { actionName: "Get all", to: "/checkin/all" },
        { actionName: "Get by Keyword", to: "/checkin/keyword" },
        { actionName: "Confirm", to: "/checkin/confirm" },
        { actionName: "Return to Pending", to: "/checkin/return-pending" },
        { actionName: "Delete ", to: "/bookingitem/delete" },
      ],
    },
    {
      name: "Room",
      actions: [
        { actionName: "Get all", to: "/room/all" },
        { actionName: "Get by ID", to: "/room/id" },
        { actionName: "Get by Room", to: "/room/roomid" },
        { actionName: "Creat new", to: "/room/create" },
        { actionName: "Edit", to: "/room/edit" },
        { actionName: "Delete ", to: "/room/delete" },
      ],
    },
    {
      name: "Facilities",
      actions: [
        { actionName: "Get all", to: "/facilities/all" },
        { actionName: "Get by ID", to: "/facilities/id" },
        { actionName: "Get by Room", to: "/facilities/roomid" },
        { actionName: "Creat new", to: "/facilities/create" },
        { actionName: "Edit", to: "/facilities/edit" },
        { actionName: "Delete ", to: "/facilities/delete" },
        { actionName: "Add to room", to: "/facilities/add-to-roomid" },
      ],
    },
  ];
  const menu = (items, i) => (
    <Menu
      key={i}
      style={{
        fontColor: "rgba(152, 84, 63, 1)",
        backgroundColor: "rgba(219, 214, 184, 1)",
      }}
    >
      {items.map((item, i) => (
        <Menu.Item
          key={i}
          style={{
            fontColor: "rgba(152, 84, 63, 1)",
          }}
        >
          <a href={item.to}>{item.actionName}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return bar.map((item, i) => (
    <Dropdown
      key={i}
      className="cc"
      overlay={menu(item.actions)}
      overlayStyle={{
        color: "rgba(152, 84, 63, 1)",
        backgroundColor: "rgba(219, 214, 184, 1)",
      }}
    >
      <a className="ant-dropdown-link gg" onClick={(e) => e.preventDefault()}>
        {item.name}
      </a>
    </Dropdown>
  ));
}

export default MenuForSuperadmin;
