<template lang="html">
  <section class="section3" v-if='section3'>
    <ul class="section3-list">
      <li v-for="k in section3.list">
        <div class="section3-list-left">
          <h4>{{k.title}}</h4>
          <div class="time">
            <span class="time-num">{{k.dom.num1||'00'}}</span>
            <span class="time-col">:</span>
            <span class="time-num">{{k.dom.num2||'00'}}</span>
            <span class="time-col">:</span>
            <span class="time-num">{{k.dom.num3||'00'}}</span>
          </div>
          <p class="start">Starts at {{k.start}}</p>
        </div>
        <router-link :to="{name:'分类页'}" class="section3-list-right">
          <img v-lazy="k.imgPath">
          <span>${{k.price}}</span>
        </router-link>
      </li>
    </ul>
    <router-link :to="{name:'分类页'}" class="section3-banner">
      <img v-lazy="section3.banner" alt="">
    </router-link>
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';

  export default {
    data() {
      return {
        section3: '',
        dom: [{
          num1: '',
          num2: '',
          num3: ''
        }, {
          num1: '',
          num2: '',
          num3: ''
        }, {
          num1: '',
          num2: '',
          num3: ''
        }, {
          num1: '',
          num2: '',
          num3: ''
        }]
      }
    },
    mounted() {
      this.$api({
        url: '/index',
      }).then((response) => {

        // 将拿到的时间数据处理成倒计时
        let setTime = ((ending, dom) => {
          let endTime = ending;
          let timeMsg = endTime.toString();
          let end = new Date(timeMsg).getTime();
          setInterval(() => {
            let now = new Date().getTime();
            let sy = parseInt((end - now) / 1000);
            let minute = parseInt(sy % 3600 / 60);
            let second = parseInt(sy % 60);

            minute < 10 ? minute = "0" + minute : minute;
            second < 10 ? second = "0" + second : second;
            let ms = (100 - Number(parseInt(now / 10).toString().substr(-2))).toString();

            if (end - now <= 0) {
              minute = '00';
              second = '00';
              ms = '00';
              dom.num2 = ms;
              return
            }
            dom.num1 = minute;
            dom.num2 = second;
            dom.num3 = ms;

          }, 40);
        });
        this.section3 = response.data.section3;
        for (let i of this.dom.keys()) {
          setTime(response.data.section3.list[i].end, this.dom[i]);
          this.section3.list[i].dom = this.dom[i]

        }
        // this.section3.dom = this.dom;

      }).catch((error) => {
        console.log(error);
      });


    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .section3 {
    width: 100%;
    .pt();
    .section3-list {
      width: 100%;
      .bt();
      >li {
        display: -ms-flex;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 4vw 5vw 10vw 12vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        .section3-list-left {
          padding-top: 10vw;
          width: 50%;
          h4 {
            .fz(font-size, 34);
            line-height: 4.8vw;
            margin-bottom: 3.2vw;
            letter-spacing: 0.42vw;
          }
          .time {
            .time-num {
              display: inline-block;
              text-align: center;
              padding: 1.6vw;
              color: #fff;
              border-radius: 0.5vw;
              background-color: #444;
              .fz(font-size, 26);
              letter-spacing: 0.3vw;
            }
            .time-col {
              color: #333;
              width: 2vw;
              display: inline-block;
              text-align: center;
              font-weight: 700;
              .fz(font-size, 30);
            }
          }

          .start {
            .fz(font-size, 30);
            padding-top: 4vw;
            letter-spacing: 0.3vw;
          }
        }

        .section3-list-right {
          width: 50%;
          display: block;
          padding-top: 10vw;
          position: relative;
          img {
            display: block;
            width: 100%;
            background-color: gold;
          }
          span {
            padding: .3vw 1.2vw;
            border-radius: 1vw;
            text-align: center;
            position: absolute;
            bottom: .4vw;
            right: .2vw;
            background-color: @cl;
            color: #fff;
            .fz(font-size,24);
          }
        }
      }
    }

    .section3-banner {
      display: block;
      width: 100%;
      .bd();
      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
