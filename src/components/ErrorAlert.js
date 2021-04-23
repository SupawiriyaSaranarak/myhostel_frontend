import React, { useState } from "react";
import { Alert } from "antd";

function ErrorAlert({ message, visible, setVisible }) {
  // setVisible(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      {visible ? (
        <Alert
          message="Alert Message Text"
          type="error"
          closable
          afterClose={handleClose}
        />
      ) : null}
      <p>{message}</p>
    </div>
  );
}

export default ErrorAlert;
