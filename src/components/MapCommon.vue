<template>
  <div class="MapStat" id="MapStat"></div>
</template>
  
  <script setup>
import AMapLoader from "@amap/amap-jsapi-loader"; // 使用加载器加载JSAPI，可以避免异步加载、重复加载等常见错误加载错误
import { shallowRef } from "@vue/reactivity";
import { ref, onMounted } from "vue";

const colors = [
  "rgba(254,255,198,0.95)",
  "rgba(255,238,149,0.95)",
  "rgba(255,217,99,0.95)",
  "rgba(255,175,43,0.95)",
  "rgba(255,135,24,0.95)",
  "rgba(234,10,0,0.95)",
  "rgba(195,0,0,0.95)",
  "rgba(139,0,0,0.95)",
];

onMounted(() => {
  initMap();
});

function initMap() {
  AMapLoader.load({
    key: "04232c58ddacaeb58ac2a689d06479db", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      // "AMap.Scale", //工具条，控制地图的缩放、平移等
      // "AMap.ToolBar", //比例尺，显示当前地图中心的比例尺
      "AMap.Geolocation", //定位，提供了获取用户当前准确位置、所在城市的方法
      // "AMap.HawkEye", //鹰眼，显示缩略图
    ],
    AMapUI: {
      version: "1.1",
      plugins: [],
    },
    Loca: {
      version: "2.0.0",
    },
  })
    .then((AMap) => {
      let satellite = new AMap.TileLayer.Satellite({ opacity: 0.1, zIndex: 4 });
      // let roadNet = new AMap.TileLayer.RoadNet({opacity: 0.1, zIndex: 4});
      let layer = new AMap.createDefaultLayer({
        zooms: [3, 20], //可见级别
        visible: true, //是否可见
        opacity: 0.5, //透明度
        zIndex: 1, //叠加层级
      });
      let map = new AMap.Map("MapStat", {
        //设置地图容器id
        zoom: 4, //初始化地图层级
        viewMode: "3D", //是否为3D地图模式
        center: [105.601, 35.32], //初始化地图中心点位置
        layers: [satellite, layer],
        // showLabel: false,
        // dragEnable: true, //禁止鼠标拖拽
        // scrollWheel: true, //鼠标滚轮放大缩小
        // doubleClickZoom: true, //双击放大缩小
        // keyboardEnable: true, //键盘控制放大缩小移动旋转
        mapStyle: "amap://styles/darkblue",
      });
      let loca = new Loca.Container({ map });
      let pl = new Loca.PointLayer({
        zIndex: 10,
        blend: "lighter",
      });
      let geo = new Loca.GeoJSONSource({
        url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/cuisine.json",
      });
      pl.setSource(geo);

      /* let style = {
                  unit: 'meter',
                  radius: (index, f) => {
                      var n = f.properties['人口'];
                      return n * 100;
                  },
                  color: (index, f) => {
                      var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
                      return colors[n];
                  },
                  borderWidth: 0,
                  blurRadius: -1,
              } */
      let style = {
        radius: 3.5,
        unit: "px",
        color: "#0CFF8A",
        borderWidth: 0,
        blurWidth: 3.5,
      };

      pl.setStyle(style);
      loca.add(pl);

      pl.addAnimate({
        key: "radius",
        value: [0, 1],
        duration: 500,
        easing: "Linear",
        transform: 2000,
        random: true,
        delay: 8000,
        yoyo: true,
        repeat: 100000,
      });
      let dat = new Loca.Dat();
      dat.addLayer(pl);

      /* // 图例
              let lengend = new Loca.Legend({
                  loca: loca,
                  title: {
                      label: '人均GDP',
                      fontColor: 'rgba(255,255,255,0.4)',
                      fontSize: '16px',
                  },
                  style: {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      left: '20px',
                      bottom: '40px',
                      fontSize: '12px',
                  },
                  dataMap: [
                      { label: '> 8万', color: colors[7] },
                      { label: '< 7万', color: colors[6] },
                      { label: '< 6万', color: colors[5] },
                      { label: '< 5万', color: colors[4] },
                      { label: '< 4万', color: colors[3] },
                      { label: '< 3万', color: colors[2] },
                      { label: '< 2万', color: colors[1] },
                      { label: '< 1万', color: colors[0] },
                  ],
              });
  
              var dat = new Loca.Dat();
              dat.addLayer(pl, 'GDP'); */

      /* // 动画
              map.on('complete', function () {
                  pl.addAnimate({
                      key: 'radius',
                      value: [0, 1],
                      duration: 2000,
                      easing: 'ElasticOut',
                      // yoyo: false,
                      // repeat: 1,
                  });
                  pl.show(600);
              });
  
              map.on('mousemove', (e) => {
                  const feat = pl.queryFeature(e.pixel.toArray());
  
                  if (feat) {
                      pl.setStyle({
                          unit: 'meter',
                          radius: (index, f) => {
                              var n = f.properties['人口'] * 100;
                              if (f === feat) {
                                  return n + 30000;
                              }
                              return n;
                          },
                          color: (index, f) => {
                              var n = Math.min(7, ~~(f.properties['人均GDP'] / 10000));
                              return colors[n];
                          },
                          borderWidth: (index, f) => {
                              return f === feat ? 20000 : 0;
                          },
                          blurWidth: -1,
                      });
                  }
              }); */
    })
    .catch((e) => {
      console.log(e);
    });
}
</script>
  
  <style lang='less' scoped>
.MapStat {
  width: 100%;
  height: 100%;
}
</style>