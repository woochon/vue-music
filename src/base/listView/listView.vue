<template>
  <Scroll class="listview" :data="data" ref="listview"
          @scroll="scroll" :probeType="probeType"
          :listenScroll="listenScroll">
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item,index2) in group.items" :key="index2" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" :key="index"
            :class="{current : currentIndex === index}"
            class="item" :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </Scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
const ANCHOR_HEIGHT = 18
export default{
  created () {
    // 为什么不加在data里面，是应为页面不需要监听它的变化
    this.touch = {}
    this.listenScroll = true
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      probeType: 3,
      listHeight: []
    }
  },
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  components: {
    Scroll
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  mounted () {
    console.log(this.data)
  },
  methods: {
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      console.log(anchorIndex)
      this._scrollTo(anchorIndex)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      // 0 表示是否需要缓动动画 这里是不需要的
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }

  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 25)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || (-newY > height1 && -newY < height2)) {
          this.currentIndex = i
          return
        }
      }
      this.currentIndex = 0
    }
  }
}
</script>
<style scoped lang="scss" type="text/scss">
  @import '../../common/scss/variable';
  .listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: $color-background;
    .list-group{
      padding-bottom: 30px;
      .list-group-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background:$color-hightlight-background
      }
      .list-group-item{
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name{
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
    .list-shortcut{
      position: absolute;
      z-index:30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background-color: $color-background-d;
      font-family: Helvetica;
      .item{
        padding: 3px;
        line-height: 1;
        color: $color-text-l;
        font-size: $font-size-small;
        &.current{
          color: $color-theme;
        }
      }
    }
    .list-fixed{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-hightlight-background;
      }
    }
    .loading-container{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
