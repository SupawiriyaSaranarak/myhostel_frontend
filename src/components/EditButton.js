import React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

function EditButton({ record, handleEdit }) {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<EditOutlined />}
      size="small"
      onClick={() => {
        handleEdit(record);
      }}
    />
  );
}

export default EditButton;
