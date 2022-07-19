import url from "url";
import path from "path-browserify";
import { v4 as uuidv4 } from "uuid";

export default function get_filelist_detail(oss_url) {
  if (oss_url) {
    const { pathname } = url.parse(oss_url);
    const basename = path.basename(pathname);
    return [{ uid: uuidv4(), name: basename, status: "done", url: oss_url }];
  }
  return [];
}