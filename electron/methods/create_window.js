/* eslint-disable import/no-extraneous-dependencies */
import { screen, BrowserWindow } from "electron";

export default async function create_window({ load_url, load_file }) {
  const { width, height } = await screen.getPrimaryDisplay().workAreaSize;
  const window_object = new BrowserWindow({
    width: parseInt(width * 0.8),
    height: parseInt(height * 0.8),
    x: parseInt(width * 0.1),
    y: parseInt(height * 0.1),
    show: false,
    frame: true,
    webviewTag: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      backgroundThrottlingBoolean: false
    }
  });
  if (load_url) window_object.loadURL(load_url);
  if (load_file) window_object.loadFile(load_file);
  // window_object.webContents.openDevTools();
  await new Promise((resolve) => window_object.once("ready-to-show", resolve));
  window_object.on("new-window", () => console.log("new-window"));
  window_object.show();
  return window_object;
}