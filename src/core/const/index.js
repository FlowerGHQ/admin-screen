import { localStorageObj } from "./enum/localStorage";
import commonEnum from '@/core/const/enum/common.js';
/*
 * @Date: 2023-10-25 16:46:52
 */
let URL_POINT = 'https://gateway-api.qianlizx.net';

let hostname = window.location.hostname;

// 本地
if (hostname === "localhost" || hostname.includes("10.0.0.")) {
  // URL_POINT = "http://10.0.0.110";
  // URL_POINT = "http://10.0.0.105";
  URL_POINT = "http://47.93.161.141:8080";
  // URL_POINT = "http://192.168.0.150:80";
  // URL_POINT = "https://gateway-api.qianlizx.net";
  // URL_POINT = 'http://gateway-api-release.qianlizx.net';
}
// 测试服
else if (hostname === 'console-v2-dev.qianlizx.net') {
  URL_POINT = 'http://47.93.161.141:8080';
}
// 预发环境
else if (hostname === 'console-v2-release.qianlizx.net') {
  URL_POINT = 'http://gateway-api-release.qianlizx.net';
}
// 正式服
else {
  URL_POINT = 'https://gateway-api.qianlizx.net';
}

// 常量
const Const = {
  // 本地存储
  DATA: {
    ...localStorageObj
  },
  NET: {
    URL_POINT: URL_POINT,
    FILE_UPLOAD_END_POINT: `${URL_POINT}/file/file-upload`,
  },
  ...commonEnum
}
export default Const;