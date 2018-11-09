import Vue from 'vue'
import VueRouter from 'vue-router'

// 在Vue原型上挂在一个属性 $axios
import axios from 'axios'
Vue.prototype.$axios = axios;

//设置baseURL之后，发送请求的时候会把baseURL和路径拼接起来
axios.defaults.baseURL = "http://47.106.148.205:8899/"
// 最近做vue项目时遇到登录权限问题，登录以后再发送的请求头部并没有携带登录后设置的cookie，导致后台无法校验其是否登录。检查发现是vue项目中使用axios发送ajax请求导致的。查看文档得知axios默认是不让ajax请求头部携带cookie的
axios.defaults.withCredentials = true


Vue.use(VueRouter)

// 导入组件
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from '../components/goods/goodsinfo.vue'
// import shopcart from '../components/shopcart/shopcart.vue'
// import order from '../components/order/order.vue'
// import login from '../components/account/login.vue'
// import payorder from '../components/pay/payorder.vue'
// import paysuccess from '../components/pay/paysuccess.vue'
// import myOrders from '../components/vip/myOrders.vue'
// import orderInfo from '../components/vip/orderInfo.vue'
// import vipCenter from '../components/vip/vipCenter.vue'

const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const payorder = () => import(/* webpackChunkName: "payorder" */ '../components/pay/payorder.vue')
const paysuccess = () => import(/* webpackChunkName: "paysuccess" */ '../components/pay/paysuccess.vue')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '../components/vip/myOrders.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vip/orderInfo.vue')
const vipCenter = () => import(/* webpackChunkName: "vipCenter" */ '../components/vip/vipCenter.vue')

// 创建路由对象，设置路由规则
const router = new VueRouter({
    routes:[
        {path: '/',redirect:'/goodslist'},
        {path: '/goodslist',component:goodslist},
        {path: '/goodsinfo/:goodsId',component:goodsinfo},
        {path: '/shopcart' ,component:shopcart},
        {path: '/login' ,component:login},
        /**下面的路由规则，是需要进行登录校验的 */
        {path: '/order',component:order ,meta:{checkIslogin:true}},
        {path: '/pay',component:payorder ,meta:{checkIslogin:true}},
        {path: '/paysuccess',component:paysuccess ,meta:{checkIslogin:true}},
        {path: '/myOrders',component:myOrders ,meta:{checkIslogin:true}},
        {path: '/orderInfo',component:orderInfo ,meta:{checkIslogin:true}},
        {path: '/vipCenter',component:vipCenter ,meta:{checkIslogin:true}},
    ]
})

/* 导航守卫
*这个方法可以拦截到所有的路由跳转
*需要调用next，如果不调用next，就不会跳转
*/
router.beforeEach((to, from, next) => {
    if(to.path !== '/login'){
        // console.log(to)
        localStorage.setItem('wantVisitPage',to.fullPath)
    }

    // 需要进行登录验证的
    if(to.meta.checkIslogin){
        // 发送请求，判断是否已经登录，如果登录了，则next,
        // 如果没有登录，则通过编程式导航跳转到登录页 router.push({path: '/login'})
        axios.get('site/account/islogin').then(res=>{
            if(res.data.code === 'logined'){  //登录过
                next()
            }
            else{  //还没有登录
               router.push({path: '/login'}) 
            }
        })
    }
    // 来到这里，是代表不需要进来登录验证的
    else{
        next()
    }
  })

// 导出路由对象
export default router