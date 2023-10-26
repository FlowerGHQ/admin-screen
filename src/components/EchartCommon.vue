<!--
 * @Date: 2023-04-19 09:53:44
-->
<template>
  <div :id="uid" :ref="uid" :style="myStyle" v-chart-resize></div>
</template>
<script setup>
import {
  onMounted,
  onBeforeMount,
  ref,
  watch,
  onBeforeUnmount,
  onUnmounted,
  getCurrentInstance,
} from "vue";
import * as echarts from "echarts";
import { nanoid } from "nanoid";
const { proxy } = getCurrentInstance();

const props = defineProps({
  myStyle: {
    type: Object,
    default: () => ({ width: "100%", height: "100%" }),
  },
  myOption: {
    required: true,
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(["render"]);

// 因为是封装的组件，会多次调用，id不能重复，要在初始化之前写，不然会报错dom为定义
const uid = `echarts-uid-${nanoid()}`;

let myChart;
onMounted(() => {
  myChart = echarts.init(document.getElementById(uid));
  // 在template中可以直接取props中的值，但是在script中不行，因为script是在挂载之前执行的
  // console.log('CurrentEcharts onMounted', props.myOption)
  myChart.setOption(props.myOption);

  watch(
    () => props.myOption,
    () => {
      let option = myChart.getOption();
      myChart.setOption({ ...option, ...props.myOption });
    },
    { deep: true }
  );
  // 监听页面的大小
  window.addEventListener("resize", () => {
    setTimeout(() => {
      myChart?.resize({ animation: { duration: 300 } });
    }, 300);
  });
});

onBeforeUnmount(() => {
  myChart.dispose();
});
</script>