/*
 * @Date: 2023-04-11 17:04:30
 */
import Api from './base';
import Const from '../const';
import activityApi from "@/core/api/apiFiles/activityApi.js";

let baseUrl = Const.NET.URL_POINT;
/*
 * PostJson
 * Post
 * Get
 */
const apiList = {
	// 活动
	...activityApi,
};

export default new Api(baseUrl, apiList);


