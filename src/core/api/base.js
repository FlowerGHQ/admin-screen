/*
 * @Date: 2023-04-11 17:04:30
 */
import ajax from './http';
import Const from '../const';
import Data from '../data';
import { AxiosHeaders } from 'axios';

// 数组中的第一个配置请求方法 第二项配置请求路径 第三项配置header 第四项配置其他
class ApiBase {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}
	static stringify(obj) {
		let p = [];
		for (let key in obj) {
			p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
	}

	http(config, moduleName, args = {}) {
		// let mark = ApiBase.getMark();
		const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1ODVjMDYwYzQyNTU0MGMwYTAyZTFhNjZlMjRmYTY5NyIsInN1YiI6IntcImRlY29kZU5hbWVcIjpcIiVFOSU5MyU4NSVFOSU5NCU4MiVFNiU5OSVCQSVFOCVBMSU4Q1wiLFwiZGVwYXJ0U3RhdHVzXCI6MSxcImlzUGxhdGZvcm1BZG1pblwiOjEsXCJsb2dpblR5cGVcIjpcIjFcIixcIm1vYmlsZVwiOlwiMTUyNDIwOTkxODhcIixcInBhc3N3b3JkXCI6XCIkMmEkMTAkYlM2bDgzaHdRLzQ1blR1bDFHS3NTdXhMbzdhTjZGcmNLWE1acTlnRXguSkp5anR1UWxpbTZcIixcInBlcm1pc3Npb25MaXN0XCI6W10sXCJ0ZW5hbnRJZFwiOlwiNjcyNDc2MTI3NDQ1NTk0OTM3OFwiLFwidHlwZVwiOjEsXCJ1c2VyaWRcIjpcIjY3MjQ3NjEyNzQ0NTU5NDkzNzhcIixcInVzZXJuYW1lXCI6XCLpk4XplILmmbrooYxcIn0iLCJpYXQiOjE2OTgxNDEyNjZ9.MaIoqVD6xOicmvdDNIGj0I9laxrO8UwdnidPe3srGbY';
		const defaultHeaders = {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": token
		};
		const headers = config.length === 2 ? defaultHeaders : { ...defaultHeaders, ...config[2] };
		const jsonHeaders = {
			"Content-Type": "application/json",
			"Authorization": token
		};
		const jsonHeadersNew = config.length === 2 ? jsonHeaders : { ...jsonHeaders, ...config[2] };

		const importHeaders = {
			"Content-Type": "multipart/form-data",
			"Authorization": token
		};
		const importHeadersNew = config.length === 2 ? importHeaders : { ...importHeaders, ...config[2] };

		let url_params = [];
		if (!args.checkArray) {
			for (let key in args) {
				if (Array.isArray(args[key])) {
					url_params = args[key];
					delete args[key];
				}
			}
		} else {
			delete args['checkArray']
		}


		let fullUrl = `${this.baseUrl}${config[1]}`;
		if (url_params.length) {
			//有分页
			for (let i = 0; i < url_params.length; i++) {
				fullUrl = fullUrl + '/' + url_params[i];
			}
		}


		if (moduleName === 'Export') {
			const requestOptions = {
				headers: jsonHeadersNew,
				method: "post",
				url: fullUrl,
				params: { token },
				data: args,
				responseType: "blob",
				...(config.length === 4 ? config[3] : {})
			};
			return ajax(requestOptions);
		}

		switch (config[0]) {
			case 'PostJson':
				const requestOptions = {
					headers: jsonHeadersNew,
					method: 'post',
					url: fullUrl,
					data: args,
					...(config.length === 4 ? config[3] : {})
				};
				return ajax(requestOptions);
			case 'Post':
				const requestOptionsPost = {
					headers,
					method: 'post',
					url: fullUrl,
					data: ApiBase.stringify({ /* token, */ ...args }),
					...(config.length === 4 ? config[3] : {})
				};
				return ajax(requestOptionsPost);
			case 'PostForm':
				const importOptionsPost = {
					headers: importHeadersNew,
					method: 'post',
					url: fullUrl,
					data: args,
					...(config.length === 4 ? config[3] : {})
				};
				return ajax(importOptionsPost);
			case 'Get':
				const requestOptionsGet = {
					headers,
					method: 'get',
					url: fullUrl,
					params: { /* token, */ ...args },
					...(config.length === 4 ? config[3] : {})
				};
				return ajax(requestOptionsGet)
			case 'Delete':
				const deleteHeader = {
					headers: jsonHeadersNew,
					method: 'delete',
					url: fullUrl,
					data: args,
					...(config.length === 4 ? config[3] : {})
				};
				return ajax(deleteHeader)
			case 'Put':
				const putHeader = {
					headers: jsonHeadersNew,
					method: 'put',
					url: fullUrl,
					data: args,
					...(config.length === 4 ? config[3] : {})
				};
				return ajax(putHeader)
		}

	}
}
class Api extends ApiBase {
	constructor(baseUrl, apiList) {
		super(baseUrl);
		for (const moduleName in apiList) {
			this[moduleName] = Object.create(null);
			const module = apiList[moduleName];
			for (const functionName in module) {
				const config = module[functionName];
				this[moduleName][functionName] = (config => {
					return (...args) => {
						return super.http(config, moduleName, ...args);
					};
				})(config);
			}
		}
	}
}

export default Api;
