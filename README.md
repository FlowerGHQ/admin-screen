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
本项目使用postcss-pxtorem 插件适配
如果适配有问题可以尝试使用vw vh 
src\styles\utils.less 该文件中有备用函数
```
.box {
  .px2vw(width, 300);
  .px2vh(height, 100);
  .px2font(16);
  .px2vw(margin-left, 300);
  .px2vh(margin-top, 100);
  color: #fff;
  font-size: 16px;
}
```
### echarts适配
从utils/echartsUtils中引入fitChartSize
fitChartSize(10)

