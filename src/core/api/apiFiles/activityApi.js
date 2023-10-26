/*
 * @Date: 2023-05-19 10:58:13
 */
export default {
  // 活动
  Activity: {
    save: ['PostJson', '/newretail/v1/market/activity/save'], //编辑
    list: ['PostJson', '/newretail/v1/market/activity/page'], //列表
    listByMember: ['PostJson', '/newretail/v1/market/activity/member/activities/list'], // 通过 服务商id 或 门店id 获取活动列表
    listAll: ['Get', '/newretail/v1/market/activity/drop/down/box'], // 筛选用的全部活动列表
    detail: ['Get', '/newretail/v1/market/activity/detail'], //详情
    delete: ['Get', '/newretail/v1/market/activity/delete'], //删除
  },
  // 活动成员
  ActivityMember: {
    list: ['PostJson', '/newretail/v1/market/activity/member/page'], // 列表
    add: ['PostJson', '/newretail/v1/market/activity-member/save'], // 添加成员
    remove: ['Get', '/newretail/v1/market/activity-member/delete'], // 移出成员
  },
}