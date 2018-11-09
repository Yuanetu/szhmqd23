import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //在Vue的原型对象中挂载$state  Vue.prototype.$state = xxx

// 按需导入
import {addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods} from '../common/localStorage.js'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        // 要操作的数据
        buycount: 0
    },
    getters: {
        getBuyNumber(state){
            // console.log(state.buycount);
            
            return state.buycount === 0 ? getTotalCount() : state.buycount
        }
    },
    mutations: {
        // state 就是上面的state ，固定的
        // goods 载荷(就是参数的意思)， 约定 goods = {goodsId: 90,goodsNumber: 2}

        addGoods(state,goods){
            // console.log(addLocalGoods(goods))
            state.buycount = addLocalGoods(goods)
        },

        updateGoods(state,goods){
            state.buycount = updateLocalGoods(goods)
        },
        
        deleteGoods(state,goodsId){
            state.buycount = deleteLocalGoods(goodsId)
        }
    }
})

export default store