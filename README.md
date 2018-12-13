# vue-music

## 11-11  页面组件的基本搭建

## 11-12  本地存储(localStorage和cookie封装),引入全局样式normalize.css,jsonp封装获取数据以及轮播图封装

## 11-13  后端代理
>后端代理的方式获取歌单数据： 主要原因是请求头里包含了Host:'y.qq.com'和referer字段的限制

>https://blog.csdn.net/weixin_41892205/article/details/81054322 解决devserver.js不存在的情况

## 11-14 图片懒加载和弹框组件
>vue-lazy-load
``` bash
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: './static/error.jpg',
  loading: './static/loading.gif'
})
```

>请求参数没有携带过去：1.params  2.Object.assign()拼写错误

>滚动的时候，歌单详情页会在轮播图上，原因是scroll下面没有将轮播图和歌单详情用一个div包裹起来

>img v-lazy 和scroll冲突  需要一个class="needsclick"

>loading插件的书写

## 11-15歌手页面左右联动

## 11-19 歌手页左右滚动(联动)

  点击事件，触摸事件，获取dom属性(data-*)

## 12-13 歌手页开发完成


