import React from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

function CreateButton() {
  return (
    <Button
      type="primary"
      shape="round"
      icon={<PlusCircleOutlined />}
      size="large"
    >
      Create New
    </Button>
  );
}

export default CreateButton;
