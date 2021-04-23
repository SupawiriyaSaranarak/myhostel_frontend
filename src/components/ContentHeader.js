import React from "react";

function ContentHeader(props) {
  return (
    <div className="content-header">
      <span>
        <b>{props.name}</b>
        &nbsp;
        {props.button &&
          props.button.map((item) => (
            <>
              {item}
              <span>&nbsp;</span>
            </>
          ))}
      </span>
    </div>
  );
}

export default ContentHeader;
