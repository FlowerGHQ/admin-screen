/*
 * @Date: 2023-04-11 17:04:30
 */
import axios from "axios";
// import { message } from "ant-design-vue";
import Data from "../data";

const showMessage = (msg) => {
	// message.error(msg);
};

const errorHandle = (status, message = "未知错误") => {
	// showMessage(message);
};

let tokan = "";
let objToken = ''
// console.log("window.location:", window.location);
let href = window.location.href || "";
if (href.includes("?userInfo=")) {
	let params = href.split("?userInfo=");
	// console.log('params:', params)
	if (params.length === 2) {
		objToken = params[1];
		if (objToken) {
			const obj = decodeURIComponent(objToken);
			const objParse = JSON.parse(obj)
			tokan = objParse.token
			Data.setUser(objParse)
			Data.setToken(tokan);
			// Data.setAuthority([])
			window.location.href = params[0]
		}
	}
}

var instance = axios.create({ timeout: 1000 * 15 });

instance.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded;charset=UTF-8";
instance.defaults.headers.Authorization = tokan;
instance.defaults.headers.sourceType = 1;
instance.defaults.headers.Accept = "application/json";
instance.defaults.headers.RouteAddr = "v2";
instance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.error(error)
);

instance.interceptors.response.use(
	(res) => {
		// debugger
		let api = "";
		let request = {
			url: res?.config?.url,
			param: res?.config?.data,
			response: res?.data,
		};
		try {
			api = request.url.split("/").slice(3).join('/');
			request.param = JSON.parse(request.param);
		} catch (error) {
		}

		if (res.status === 200) {
			console.log(`%c SUCCESS: ${api} `, "color:#006CFF;background:#006cff2a;", request);
			if (res.headers["content-type"] === "application/vnd.ms-excel;charset=UTF-8") {
				return res.data;
			} else if (res.data.code === 20000) {
				if (res.data?.data !== 0) {
					return res.data?.data || {};
				} else {
					return res.data?.data
				}

			} else {
				errorHandle(res.data.code, res.data.message);
				console.log(`%c FALIURE: ${api} `, "color:#FF6A3F;background:#f658511f;", request);
				return Promise.reject(res);
			}
		} else {
			Promise.reject(res);
		}
	},
	(error) => {
		console.log("error:", error);
		const { response } = error;
		if (response) {
			errorHandle(response.status, response.data.message);
			return Promise.reject(response);
		} else {
			errorHandle("other", error.toString());
			if (window.navigator.onLine) {
				return Promise.reject(error);
			}
		}
	}
);

export default instance;
