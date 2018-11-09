<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodslist" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.select"></el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <div data-v-2be32b7a="">
                                            <buyCartCounter :goodsId="item.id" :count="item.buycount" @goodsCountChanges="getChangedGoods"></buyCartCounter>
                                        </div>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a @click="deleteGoods(index)">删除</a>
                                    </td>
                                </tr>
                                <tr v-if="goodslist.length === 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="continueBuy">继续购物</button>
                            <button class="submit" @click="goToPay">提交订单</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 按需导入
import { getLocalGoods } from '../../common/localStorage.js'
// 导入购物车计数器子组件
import buyCartCounter from '../subcomponents/buyCartCounter.vue'

export default {
  components: {
    // buyCartCounter: buyCartCounter
    buyCartCounter
  },

  data() {
    return {
      goodslist: [],
      isShow: true
    }
  },

  created() {
    this.getGoodsListData()
  },

  computed: {
    // 获取总数量
    getTotalCount() {
      let totalCount = 0
      this.goodslist.forEach(item => {
        if (item.select) {
          totalCount += item.buycount
        }
      })

      return totalCount
    },

    // 获取总金额
    getTotalAmount() {
      let totalAmount = 0
      this.goodslist.forEach(item => {
        if (item.select) {
          totalAmount += item.buycount * item.sell_price
        }
      })

      return totalAmount
    }
  },

  methods: {
    getGoodsListData() {
      // 1.获取本地存储的商品信息
      const localgoods = getLocalGoods()

      // 2.把获取到的对象中的key封装为一个数组,
      const keys = Object.keys(localgoods)

      // console.log(this.goodslist)

      // 3.判断是否有值
      if (keys.length === 0) {
        return false
      }

      // 4.拼接url
      const url = `site/comment/getshopcargoods/${keys.join(',')}`

      // 4.发起请求
      this.$axios.get(url).then(res => {
        // console.log(res.data)
        res.data.message.forEach(item => {
          item.buycount = localgoods[item.id]
          item.select = true
        })

        this.goodslist = res.data.message
      })
    },
    // 修改
    getChangedGoods(changeGoods) {
      // console.log(changeGoods)
      this.goodslist.forEach((item,index) => {
        // 1.判断，通过id判断出要修改数量的商品
        if (item.id === changeGoods.goodsId) {
          item.buycount = changeGoods.shoppingCount
          // 2.判断,商品数量是否为0,如果为0,则调用删除的方法,否则,则修改商品的数量
          if (changeGoods.shoppingCount === 0) {
            this.deleteGoods(index)
          } else {
            // 3.准备载荷,并提交(conmmit) mutations中的 updateGoods 方法
            // const goods = {
            //     goodsId: changeGoods.goodsId,
            //     goodsNumber: changeGoods.shoppingCount
            // }

            // this.$store.commit('updateGoods',goods)  //自己写的
            this.$store.commit('updateGoods', changeGoods) //老师的写法
          }
        }
      })
    },
    // 删除
    deleteGoods(index) {
      // this.goodslist.forEach(item=>{
      //     if(item.id === goodsId){
      //         item.isShow = false
      //     }
      // })
      // // 准备载荷(参数),并提交(conmmit) mutations中的 deleteGoods方法
      // const goods = {goodsId}

      // this.$store.commit('deleteGoods',goods)

      // // 每次删除完.重新渲染下页面
      // this.getGoodsListData()

        // 老师的写法
        this.$confirm('是否删除该商品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                // 注意：要先获取id，再从数组中删除，否则会出问题,数组的索引会发生变动
                // 1.先获取要删除商品的id
                const goodsId = this.goodslist[index].id

                // 2.再从数组中删除对应下标的商品
                this.goodslist.splice(index, 1)

                // 准备载荷(参数),并提交(conmmit) mutations中的 deleteGoods方法
                this.$store.commit('deleteGoods', goodsId)
            })
            .catch(() => {

            })
    },

    // 继续购物
    continueBuy(){
        // 编程式导航
        this.$router.push({path: '/goodslist'})
    },

    // 提交订单
    goToPay(){
        let ids = []

        this.goodslist.forEach(item=>{
            if(item.select){
                ids.push(item.id)
            }
        })

        if(ids.length === 0){
            this.$message({
                message: '请至少选择一个商品下单息',
                type: 'warning'
            });
        }

        // 使用编程式导航，跳转到下单页面
        this.$router.push({path:'/order',query: {ids: ids.join(',')}})
    }
  }
}
</script>

<style>
.shopInfo {
  display: flex;
  align-items: center;
}
</style>

