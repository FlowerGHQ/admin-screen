<!--
 * @Date: 2023-10-25 15:19:42
-->
<template>
  <div class="echart-common">
    <echart-common :myOption="option"></echart-common>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import EchartCommon from "@/components/EchartCommon.vue";
const {
  appContext: {
    config: {
      globalProperties: { $fitChartSize },
    },
  },
} = getCurrentInstance();

const route = useRoute();
const router = useRouter();
const option = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c}%",
  },
  grid: {
    left: $fitChartSize(10),
    right: $fitChartSize(20),
    top: $fitChartSize(20),
    bottom: $fitChartSize(10),
    containLabel: true,
  },
  calculable: true,
  series: [
    {
      color: ["#0db1cdcc"],
      name: "计划投入",
      type: "funnel",
      width: "45%",
      height: "70%",
      x: "5%",

      minSize: "10%",
      funnelAlign: "right",

      center: ["50%", "50%"], // for pie

      data: [
        {
          value: 30,
          name: "下单30%",
        },
        {
          value: 55,
          name: "咨询55%",
        },
        {
          value: 65,
          name: "点击65%",
        },
        {
          value: 60,
          name: "访问62%",
        },
        {
          value: 80,
          name: "展现80%",
        },
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: true,
      label: {
        formatter: function () {},
        position: "inside",
      },
      itemStyle: {
        borderWidth: 0,
        shadowBlur: $fitChartSize(20),
        shadowOffsetX: 0,
        shadowOffsetY: $fitChartSize(5),
        shadowColor: "rgba(0, 0, 0, 0.3)",
      },
    },

    {
      color: ["#0C66FF"],
      name: "实际投入",
      type: "funnel",
      width: "45%",
      height: "70%",
      x: "50%",

      minSize: "10%",
      funnelAlign: "left",

      center: ["50%", "50%"], // for pie

      data: [
        {
          value: 35,
          name: "下单35%",
        },
        {
          value: 40,
          name: "咨询40%",
        },
        {
          value: 70,
          name: "访问70%",
        },
        {
          value: 90,
          name: "点击90%",
        },
        {
          value: 95,
          name: "展现95%",
        },
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: true,
      label: {
        position: "inside",
      },
      itemStyle: {
        borderWidth: 0,
        shadowBlur: $fitChartSize(20),
        shadowOffsetX: 0,
        shadowOffsetY: $fitChartSize(5),
        shadowColor: "rgba(0, 0, 0, 0.3)",
      },
    },
  ],
};

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
</script>
<style scoped lang='less'>
.echart-common {
  width: 50vw;
  height: 30vh;
}
</style>
