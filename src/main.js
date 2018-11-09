import Vue from 'vue'
import App from './App.vue'
// 导入element-ui 轮播图
// import ElementUI from 'element-ui'
// 导入vue-lazyload 懒加载
import VueLazyload from 'vue-lazyload'

// 按需导入element-ui
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col
} from 'element-ui'

Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// 导入全局样式
// import 'element-ui/lib/theme-chalk/index.css'  //element-ui的css
import "./statics/site/css/style.css"

// 集成
// Vue.use(ElementUI)
Vue.use(VueLazyload,{
  loading: require('./statics/site/images/01.gif')
})

Vue.config.productionTip = false

// 导入过滤器
import '../src/filters'

// 导入路由对象
import router from './router'
// 导入Vuex
import store from '../src/store/'

new Vue({
  render: h => h(App),
  router,  //在根实例中注入路由对象
  store    //在根实例中注入 store（仓库）
}).$mount('#app')
