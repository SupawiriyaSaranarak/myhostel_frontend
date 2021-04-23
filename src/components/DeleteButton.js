import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteButton() {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<DeleteOutlined />}
      size="small"
    />
  );
}

export default DeleteButton;
