/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from "electron";
import React, { useCallback } from "react";
import { Row, Col, Form, Space, Input, Button, message } from "antd";

import UploadDragger from "../../elements/upload_dragger";

export default function InsertExpect() {

  const [form] = Form.useForm();

  const handleClick = useCallback(async () => {
    try {
      const { file, 工资收入, 材料费用, 制造费用, 营业收入 } = await form.validateFields();
      const file_path = file[0].originFileObj.path;
      const save_result = await ipcRenderer.invoke("inverse_operation", { file_path, 工资收入, 材料费用, 制造费用, 营业收入 });
      if (save_result === "success") {
        message.success("保存成功!")
      } else {
        message.warning(save_result)
      }
    } catch (error) {
      message.error(error.message);
    }
  }, [form]);

  return (
    <Form form={form}>
      <Row justify="center">
        <Space size={20} direction="vertical" style={{ width: "50%" }}>
          <Form.Item rules={[{ required: true, message: "请上传带有发票数据的电子表格" }]} name="file" valuePropName="fileList" getValueFromEvent={({ fileList }) => fileList}>
            <UploadDragger name="file" />
          </Form.Item>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="工资收入" rules={[{ required: true, message: "请输入工资收入" }]} name="工资收入">
                <Input placeholder="请输入工资收入" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="材料费用" rules={[{ required: true, message: "请输入材料费用" }]} name="材料费用">
                <Input placeholder="请输入材料费用" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="制造费用" rules={[{ required: true, message: "请输入制造费用" }]} name="制造费用">
                <Input placeholder="请输入制造费用" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="营业收入" rules={[{ required: true, message: "请输入营业收入" }]} name="营业收入">
                <Input placeholder="请输入营业收入" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Button block size="large" type="primary" onClick={handleClick}>解析并下载</Button>
          </Row>
        </Space>
      </Row>
    </Form>
  )
}

