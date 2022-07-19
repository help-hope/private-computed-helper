/* eslint-disable react/prop-types */
import React from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
// import classnames from "classnames";
// import propTypes from "prop-types";

// import css from "./style.scss";

export default function UploadDragger(props) {
  return (
    <Upload.Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">请上传带有发票数据的电子表格</p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Upload.Dragger>
  )
}


UploadDragger.propTypes = {


};
UploadDragger.defaultProps = {


};