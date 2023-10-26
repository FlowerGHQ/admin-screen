<!--
 * @Date: 2023-10-25 15:19:42
-->
# admin-screen

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
### 适配方案
详见views/demo
按照设计稿的尺寸 将px按比例计算转为vw和vh
样式适配使用方式示例：
```
.box{
    .px2vw(width, 300);
    .px2vh(height, 100);
    .px2font(16);
    .px2vw(margin-left, 300);
    .px2vh(margin-top, 100);
    background-color: black;
}
```
### echarts适配
从utils/echartsUtils中引入fitChartSize
fitChartSize(10)

