/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState, useCallback } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";

export default function UploadDragger(props) {

  const { fileList, onChange } = props;

  const [file_list, set_file_list] = useState(fileList);

  const handleChange = useCallback(async ({ file }) => {
    await set_file_list([file]);
    await onChange([file]);
  }, [onChange]);

  return (
    <Upload.Dragger {...props} fileList={file_list} onChange={handleChange}>
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
  fileList: [],
  onChange() { }
};