/*
 * @Date: 2023-05-31 17:07:26
 */
import { getCurrentInstance } from 'vue'
import Data from "@/core/data.js";
import * as ECharts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *
 */
const HANDLER = "_vue_resize_handler";

export default {
  name: 'chart-resize',
  mounted(el, binding, vnode) {
    el[HANDLER] = binding.value
      ? binding.value
      : () => {
        let chart = ECharts.getInstanceByDom(el);
        if (!chart) {
          return;
        }
        chart.resize();
      };
    // console.log(el[HANDLER], 'el[HANDLER]');
    // 监听绑定的div大小变化，更新 echarts 大小
    elementResizeDetectorMaker().listenTo(el, el[HANDLER]);
  },
  unmounted(el, binding, vnode) {
    elementResizeDetectorMaker().removeListener(el, el[HANDLER]);
    delete el[HANDLER];
  }
}

