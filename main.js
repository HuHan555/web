import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 建议在main.js里初始化全局的GoEasy对象
// Vue.prototype.goEasy = GoEasy.getInstance({
//   host:'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
//   appkey: "BC-9a1731b3b09e46968e69b7765f9d1b89" //替换为您的应用appkey
// });
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
