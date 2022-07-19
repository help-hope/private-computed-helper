/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { ipcRenderer } from "electron";
import React, { useCallback } from "react";
import { Row, Space, Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import template_preview_image from "../../statics/template_image.png";
// import classnames from "classnames";
// import propTypes from "prop-types";

// import css from "./style.scss";

export default function DownloadTemplate() {
  const handleClick = useCallback(async () => {
    try {
      const save_result = await ipcRenderer.invoke("download_template");
      if (save_result === "success") {
        message.success("保存成功!")
      } else {
        message.warning(save_result)
      }
    } catch (error) {
      message.error(error.message);
    }
  }, []);
  return (
    <Row justify="center" onClick={handleClick}>
      <Space direction="vertical" style={{ width: "50%" }}>
        <img width="100%" style={{ display: "block" }} src={template_preview_image} alt="" />
        <Button block icon={(<DownloadOutlined />)} size="large" type="primary">下载原始模板</Button>
      </Space>
    </Row>
  )
}


DownloadTemplate.propTypes = {


};
DownloadTemplate.defaultProps = {


};