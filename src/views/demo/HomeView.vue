<!--
 * @Date: 2023-10-25 15:19:42
-->
<template>
  <div class="demo">
    基本样式创建
    <TheWelcome></TheWelcome>
    <div class="box">11111</div>
    <button @click="requestClick">点击请求数据</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheWelcome from "@/views/demo/components/TheWelcome.vue";
import Core from "@/core";
const route = useRoute();
const router = useRouter();

const requestClick = () => {
  Core.Api.Activity.list({
    current: 1,
    pageSize: 10,
  }).then((res) => {
    console.log(res, "ressss");
  });
};
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
</script>
<style scoped lang='less'>
// .demo {
//   width: 100vw;
//   height: 100vh;
// }
.box {
  .px2vw(width, 300);
  .px2vh(height, 100);
  .px2font(16);
  .px2vw(margin-left, 300);
  .px2vh(margin-top, 100);
  background-color: black;
  color: #fff;
  // font-size: 16px;
}
</style>
