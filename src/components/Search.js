import React from "react";
import { Input, Space } from "antd";

function Search() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  return (
    <div>
      <Space direction="vertical" style={{ margin: "10px 0px 20px 0px" }}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 500 }}
        />
      </Space>
    </div>
  );
}

export default Search;
