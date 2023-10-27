<template>
  <div id="StatisticsIndex">
    <div class="header-container">
      <img class="bg" src="@/assets/images/statistics/header_bg.png" alt="" />
      <!-- <img
        class="title"
        src="@/assets/images/statistics/title.png"
        alt=""
        :style="{ top: style.titleTop }"
      /> -->
      <div class="title" :style="{ top: style.titleTop }">新零售收入大屏</div>

      <div class="time">
        {{ currTime.day }} <span>{{ currTime.week }}</span> {{ currTime.time }}
      </div>
    </div>

    <div
      class="center-container"
      :style="{
        paddingTop: style.canterPadTop,
        paddingBottom: style.canterPadBom,
      }"
    >
      <div :class="['left-container', folder.left ? 'folded' : '']">
        <div class="folder" @click="handleFolderChange('left')">
          <div class="folder-mark"></div>
        </div>
        <div class="left-content" ref="left-content"></div>
      </div>
      <div :class="['right-container', folder.right ? 'folded' : '']">
        <div class="right-content"></div>
        <div class="folder" @click="handleFolderChange('right')">
          <div class="folder-mark"></div>
        </div>
      </div>
    </div>

    <div class="map-container">
      <MapStat ref="map_stat" />
    </div>
    <div class="footer-container">
      <img class="bg" src="@/assets/images/statistics/footer_bg.png" alt="" />
    </div>
  </div>
</template>
  
  <script setup>
import dayjs from "dayjs";
import { ref, getCurrentInstance, onMounted, computed } from "vue";

import MapStat from "@/components/MapCommon.vue"; // 地图

const {
  proxy,
  appContext: {
    config: {
      globalProperties: { $I, $D, $C, $U, $auth, $Api },
    },
  },
} = getCurrentInstance();

onMounted(() => {
  // window.onresize = handleWindowOnResize;
  // handleWindowOnResize();
  // getData();
  // handleTimeWork();
});

const search = ref({
  stat_type: 1,
  org_id: undefined,
  property_id: undefined,
  station_id: undefined,
});

// 当前时间
let now = dayjs();
// $U.weekNameFilter(now.day() + "")
const currTime = ref({
  day: now.format("YYYY/MM/DD"),
  time: now.format("HH:mm:ss"),
  week: "",
});
const style = ref({});
// 定时器
let timer = null;
let timerCount = 0;

// 时间改变
function getData() {
  let now = dayjs();
  // let mark = $U.statTypeFilter(search.value.stat_type, "mark");
  let begin_time = now.startOf(mark);
  let end_time = now.endOf(mark);

  let obj = {
    ...search.value,
    begin_time: begin_time.unix(),
    end_time: end_time.unix(),
  };

  proxy.$refs["count_stat"].getData(obj);
  proxy.$refs["energy_stat"].getData(obj);
  proxy.$refs["alarm_rate_stat"].getData(obj);

  proxy.$refs["alarm_line_stat"].getData(obj);
  proxy.$refs["alarm_curr_list"].getData(obj);
  proxy.$refs["event_count_stat"].getData(obj);

  /* proxy.$refs['map_stat'].getData(obj) */
}
function handleTimeWork() {
  if (timerCount === 60) {
    timerCount = 0;
    getData();
  }
  clearTimeout(timer);
  now = dayjs();
  currTime.value = {
    day: now.format("YYYY/MM/DD"),
    time: now.format("HH:mm:ss"),
    week: $U.weekNameFilter(now.day() + ""),
  };
  timer = setTimeout(() => {
    handleTimeWork();
  }, 1 * 1000);
}
function handleWindowOnResize() {
  let w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  let _style = {
    canterPadTop: (w * 80) / 1920 + "px",
    canterPadBom: (w * 60) / 1920 + "px",
    titleTop: (w * 16) / 1920 + "px",
  };
  console.log("_style:", _style);
  style.value = _style;

  proxy.$nextTick(() => {
    proxy.$refs["alarm_rate_stat"].handleWindowOnResize();
  });
}

const folder = ref({
  left: false,
  right: false,
});
function handleFolderChange(key) {
  folder.value[key] = !folder.value[key];
}
</script>
  
  <style lang="less" scoped>
#StatisticsIndex {
  background-color: #000000;
  width: 100%;
  height: 100vh;
  position: relative;
  .header-container,
  .footer-container {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    width: 100%;
    .bg {
      width: 100%;
    }
  }
  .header-container {
    top: 0;
    z-index: 4;
    .title {
      .alc();
      position: absolute;
      top: 0;
      left: 55%;
      color: #fff;
      z-index: 3;
      width: 26%;
      font-size: 40px;
      font-family: "youshebiaotihei";
    }
    .time {
      .fac();
      position: absolute;
      font-size: 20px;
      font-weight: bold;
      color: #40dfe2;
      line-height: 23px;
      right: 32px;
      top: 7px;
      font-family: DIN Alternate-Bold, DIN Alternate;
      span {
        .px2font(17);
        margin: 0 6px;
      }
    }
  }
  .footer-container {
    bottom: 0;
  }

  .center-container {
    position: relative;
    z-index: 3;
    width: 100%;
    height: 100%;
    .fsb();
    overflow: hidden;
    visibility: hidden;
    .left-container,
    .right-container {
      visibility: visible;
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      .folder {
        cursor: pointer;
        position: absolute;
        z-index: 2;
        height: 100%;
        width: 16px;
        top: 0;
        bottom: 0;
        &:after,
        &:before {
          position: absolute;
          content: "";
          display: block;
          width: 0;
          height: 100%;
          border-left: 2px solid;
          border-image: linear-gradient(
              0,
              rgba(28, 142, 203, 0),
              rgba(28, 142, 203, 1),
              rgba(28, 142, 203, 0)
            )
            2 2;
        }
        &:after {
          left: -2px;
        }
        &:before {
          right: -2px;
        }
        .folder-mark {
          width: 3px;
          height: 21px;
          background: #a6d3d8;
          .atc();
          transition: transform 0.3s ease;
          &:after {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
            border-color: transparent;
            .atc();
          }
        }
      }
      .left-content,
      .right-content {
        position: relative;
        z-index: 1;
        max-width: 26vw;
        width: 474px;
        height: 100%;
        background: rgba(27, 126, 242, 0.08);
        box-shadow: 0px 2px 8px 0px rgba(41, 139, 254, 0.05);
        border-radius: 6px;
        border: 1px solid rgba(27, 126, 242, 0.6);
        backdrop-filter: blur(20px);
        overflow: hidden;
        transition: width 0.3s linear, opacity 0.3s linear;
        opacity: 1;
      }

      &.folded {
        .folder .folder-mark {
          transform: translateY(-50%) rotate(180deg);
        }
        .left-content,
        .right-content {
          width: 0;
          border: 0;
          opacity: 0;
        }
      }
    }
    .left-container {
      padding-left: 43px;
      display: flex;
      flex-direction: column;
      .folder {
        left: 15px;
        background: radial-gradient(
          ellipse farthest-side at 0% 50%,
          #00439c 0%,
          rgba(0, 67, 156, 0) 100%
        );
        .folder-mark {
          left: calc(100% + 2px);
          &:after {
            border-width: 5px 0 5px 4px;
            border-left-color: #a6d3d8;
            left: 6px;
          }
        }
      }
      .left-content {
        height: calc(100% - 50px);
      }
    }
    .right-container {
      padding-right: 43px;
      justify-content: flex-end;
      .folder {
        right: 15px;
        background: radial-gradient(
          ellipse farthest-side at 100% 50%,
          #00439c 0%,
          rgba(0, 67, 156, 0) 100%
        );
        .folder-mark {
          right: calc(100% + 2px);
          &:after {
            border-width: 5px 4px 5px 0;
            border-right-color: #a6d3d8;
            right: 6px;
          }
        }
      }
      .right-content {
      }
    }
  }
  .map-container {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
  }
}
</style>
  <style lang="less">
#StatisticsIndex {
  .stat-container {
    height: calc(100% / 3) !important;
    border-radius: 0;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    --stat-title-height: 47px;
    .stat-title {
      height: var(--stat-title-height);
      background-image: url("@images/statistics/title_bg.png");
      background-size: 100% 100%;
      .fac();
      &::before {
        content: "";
        background-image: url("@images/statistics/title_icon.png");
        background-size: 18px auto;
        background-position: center;
        width: 38px;
        height: 100%;
      }
      font-size: 20px;
      font-weight: 500;
      color: #ffffff;
      text-shadow: 0px 0px 9px #158eff;
      .sub {
        font-size: 12px;
        color: #215a8e;
        margin-left: 10px;
        text-shadow: none;
      }
    }
  }
  .left-content {
    .stat-container {
      height: 35% !important;
      &:first-child {
        height: 30% !important;
      }
    }
  }
}
</style>