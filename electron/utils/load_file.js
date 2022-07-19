import Excel from "exceljs";

export default async function load_file(file_content) {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(file_content);
  const worksheet = workbook.getWorksheet('Sheet1');
  return { workbook, worksheet };
}