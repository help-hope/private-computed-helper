/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";
import path from "path";
import moment from "moment";
import { round } from "lodash";
import { promisify } from "util";
import { ipcMain, dialog } from "electron";

import load_file from "@electron/utils/load_file";

const static_file = path.resolve(__dirname, "../statics/太明成本(发票数据).xlsx");

ipcMain.handle("download_template", async () => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "保存计算结果",
    defaultPath: "太明计算模板.xlsx",
  });

  if (!canceled) {
    const file_buffer = await promisify(fs.readFile)(static_file);
    await promisify(fs.writeFile)(filePath, file_buffer, "utf-8");
    return "success";
  } else {
    return "canceled";
  }
});

ipcMain.handle("inverse_operation", async (event, args) => {
  const { file_path, 工资收入, 材料费用, 制造费用, 营业收入 } = args;
  const buffer = await promisify(fs.readFile)(file_path);
  const { workbook, worksheet } = await load_file(buffer);
  const docs_col = worksheet.getColumn("B");
  /** 工资列 **/
  const gongzi_data_array = [];
  /** 材料列 **/
  const cailiao_data_array = [];
  /** 制造费用列 **/
  const zhizaofeiyong_data_array = [];
  /** 费用合计列 **/
  const feiyong_data_array = [];

  /** 单价合计列 **/
  const danjia_data_array = [];

  docs_col.eachCell({ includeEmpty: false }, ({ value }, rowNumber) => {
    if (/(套)|(平方)/ig.test(value)) {
      gongzi_data_array.push(`C${rowNumber}`);
      cailiao_data_array.push(`D${rowNumber}`);
      zhizaofeiyong_data_array.push(`E${rowNumber}`);
      feiyong_data_array.push([`F${rowNumber}`, `SUM(C${rowNumber}:E${rowNumber})`]);
      danjia_data_array.push([`G${rowNumber}`, `F${rowNumber}/LEFT(B${rowNumber},LEN(B${rowNumber})-(LENB(B${rowNumber})-LEN(B${rowNumber})))`]);
    }
  });

  const 工资比率 = 工资收入 / 营业收入;
  gongzi_data_array.forEach((current_cell_id) => {
    const current_value = worksheet.getCell(current_cell_id).value;
    worksheet.getCell(current_cell_id).value = round(current_value * 工资比率, 2);
  });

  const 材料费用比率 = 材料费用 / 营业收入;
  cailiao_data_array.forEach((current_cell_id) => {
    const current_value = worksheet.getCell(current_cell_id).value;
    worksheet.getCell(current_cell_id).value = round(current_value * 材料费用比率, 2);
  });

  const 制造费用比率 = 制造费用 / 营业收入;
  zhizaofeiyong_data_array.forEach((current_cell_id) => {
    const current_value = worksheet.getCell(current_cell_id).value;
    worksheet.getCell(current_cell_id).value = round(current_value * 制造费用比率, 2);
  });

  feiyong_data_array.forEach(([current_cell_id, current_cell_content]) => {
    worksheet.getCell(current_cell_id).value = { formula: current_cell_content };
  });

  danjia_data_array.forEach(([current_cell_id, current_cell_content]) => {
    worksheet.getCell(current_cell_id).value = { formula: current_cell_content };
  });


  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "保存计算结果",
    defaultPath: `${moment().format("YYYY年MM月DD日HH时mm分ss秒")}-计算结果.xlsx`,
  });

  if (!canceled) {
    const buffer_result = await workbook.xlsx.writeBuffer();
    await promisify(fs.writeFile)(filePath, buffer_result, "utf-8");
    return "success";
  } else {
    return "canceled";
  }
});
