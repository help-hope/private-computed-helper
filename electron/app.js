/* eslint-disable import/no-extraneous-dependencies */
import {app} from "electron";
import create_window from "./methods/create_window";

import "./ipcMain";

app.on("ready",async ()=>{
  if(process.env.PROCESS_ENV==="development"){
    const window_object=await create_window({load_url:"http://localhost:7005"});
    window_object.webContents.openDevTools();
  }
  if(process.env.PROCESS_ENV==="production"){
    const window_object=await create_window({load_file:"dist/index.html"});
    console.log(window_object);
  }
});

app.on("window-all-closed",()=>app.quit());