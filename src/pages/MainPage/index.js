import React, { useState } from "react";
import { Provider, KeepAlive } from "react-keep-alive";
import { PageContainer } from "@ant-design/pro-layout";

import DownloadTemplate from "./components/download_template";
import InsertExpect from "./components/insert_expect";

const header = {
  ghost: true,
  title: "太明家具成本核算服务"
};

const tabList = [{
  key: "download_template",
  tab: "下载excel模板文件",
}, {
  key: "insert_expect",
  tab: "填写预期数值",
}]

export default function FunctionComponent() {

  const [tab_key, set_tab_key] = useState("download_template");

  return (
    <PageContainer
      fixedHeader
      header={header}
      tabList={tabList}
      tabActiveKey={tab_key}
      onTabChange={set_tab_key}
    >
      <Provider>
        {{
          "download_template": (
            <KeepAlive name="download_template">
              <DownloadTemplate />
            </KeepAlive>
          ),
          "insert_expect": (
            <KeepAlive name="insert_expect">
              <InsertExpect />
            </KeepAlive>
          )
        }[tab_key]}
      </Provider>
    </PageContainer>
  )
}

