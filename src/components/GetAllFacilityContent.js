import React from "react";
import axios from "axios";
import { Table } from "antd";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

function GetAllFacilityContent() {
  const [result, setResult] = useState([]);
  let x = [];
  const [error, setError] = useState("");
  useEffect(() => {
    const getAllFacility = async () => {
      try {
        const res = await axios.get("http://localhost:8000/facilities");

        setResult(res.data.facilities);
      } catch (err) {
        console.dir(err);
        // setError(err.response.data.message);
      }
    };
    getAllFacility();
  }, []);

  console.log("xxx");
  console.log(result);

  const handleEdit = (record) => {
    // console.log(result);
    console.log(record);
  };

  const columns = [];
  for (let k in result[0]) {
    const x = {
      title: k.toUpperCase(),
      width: 20,
      align: "center",
      dataIndex: k,
      key: k,
      fixed: "left",
    };
    columns.push(x);
  }
  const actions = {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (record) => (
      <>
        <Button
          type="primary"
          shape="circle"
          size="small"
          onClick={() => handleEdit(record)}
          icon={<EditOutlined />}
        />
        &nbsp;
        <Button
          type="primary"
          shape="circle"
          size="small"
          onClick={
            () => console.log("hello")
            // handleEdit(record)
          }
          icon={<DeleteOutlined />}
        />
      </>
    ),
  };

  columns.push(actions);

  const data = [...result];
  console.log(result);

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        // pagination={{ pageSize: 5 }}
        // scroll={{ x: "auto", y: 300 }}
      />
    </>
  );
}

export default GetAllFacilityContent;
