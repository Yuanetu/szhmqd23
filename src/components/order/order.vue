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
                            <li class="active">
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
                <div class="cart-box">
                    <h2 class="slide-tit">
                        <span>1、收货地址</span>
                    </h2>
                    <div id="orderForm" name="orderForm" url="">
                        <div class="form-box address-info">
                            <el-form :model="order" status-icon :rules="rules" ref="orderRef" label-width="150px">
                                <el-form-item label="收货人姓名：" prop="accept_name">
                                    <el-input style="width:500px;" v-model="order.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区：" prop="area">
                                    <v-distpicker @selected="onSelected" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址：" prop="address">
                                    <el-input style="width:500px;" v-model="order.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码：" prop="mobile">
                                    <el-input style="width:500px;" v-model="order.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱：">
                                    <el-input style="width:300px;" v-model="order.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码：">
                                    <el-input style="width:300px;" v-model="order.post_code"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <h2 class="slide-tit">
                            <span>2、支付方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <label>
                                        <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                </label>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>3、配送方式</span>
                        </h2>
                        <ul class="item-box clearfix">
                            <!--取得一个DataTable-->
                            <li>
                                <label>
                                        <el-radio-group @change="expressChange" v-model="order.express_id">
                                            <el-radio :label="1">顺丰快递 <em>费用：20.00元</em></el-radio>
                                            <el-radio :label="2">中通快递 <em>费用：10.00元</em></el-radio>
                                            <el-radio :label="3">申通快递 <em>费用：08.00元</em></el-radio>
                                        </el-radio-group>
                                </label>
                            </li>
                        </ul>
                        <h2 class="slide-tit">
                            <span>4、商品清单</span>
                        </h2>
                        <div class="line15"></div>
                        <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                            <tbody>
                                <tr>
                                    <th colspan="2" align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="84" align="center">购买数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                </tr>
                                <tr v-for="item in goodslist" :key="item.id">
                                    <td width="68">
                                        <a target="_blank" href="/goods/show-89.html">
                                                <img v-lazy="item.img_url">
                                            </a>
                                    </td>
                                    <td>
                                        <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                    </td>
                                    <td>
                                        <span class="red">
                                                {{item.sell_price}}
                                            </span>
                                    </td>
                                    <td align="center">{{item.buycount}}</td>
                                    <td>
                                        <span class="red">
                                                {{item.sell_price * item.buycount}}
                                            </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="line15"></div>
                        <h2 class="slide-tit">
                            <span>5、结算信息</span>
                        </h2>
                        <div class="buy-foot clearfix">
                            <div class="left-box">
                                <dl>
                                    <dt>订单备注(100字符以内)</dt>
                                    <dd>
                                        <textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
                                    </dd>
                                </dl>
                            </div>
                            <div class="right-box">
                                <p>
                                    商品
                                    <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                    <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p>
                                    运费：￥
                                    <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                </p>
                                <p class="txt-box">
                                    应付总金额：￥
                                    <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                </p>
                                <p class="btn-box">
                                    <a @click="goBack" class="btn button">返回购物车</a>
                                    <a id="btnSubmit" @click="goToOrder" class="btn submit">确认提交</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// 按需导入
import {
    getLocalGoods
} from '../../common/localStorage.js'

import VDistpicker from 'v-distpicker'

export default {
    // 局部注册
    components: {
        VDistpicker
    },

    data() {
        var checkMobile = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号码不能为空'));
            }

            setTimeout(() => {
                if ((/^1[3,4,5,6,7,8][0-9]{9}$/).test(value)) {
                    callback()
                } else {
                    callback(new Error("手机号不合法!"))
                }
            }, 1000);
        }

        return {
            // 将来要提交给后台进行下单的数据
            order: {
                accept_name: '小鸡巴', //收货人
                area: {
                    // 所属区域
                    province: {
                        code: '440000',
                        value: '广东省'
                    },
                    city: {
                        code: '440300',
                        value: '深圳市'
                    },
                    area: {
                        code: '440305',
                        value: '南山区'
                    }
                },
                address: '铃兰高中', //详细地址
                mobile: '13812345678', //手机号码
                email: 'liyapeng@163.com', //电子邮箱
                post_code: '518000', //邮政编码
                payment_id: '6', //支付方式
                express_id: 1, //快递选择
                expressMoment: 20, // 快递费，默认是顺丰的快递费
                message: '山田孝之' //留言

            },
            // 表单校验规则
            rules: {
                accept_name: [{
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }, ],
                address: [{
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }, ],
                mobile: [{
                        validator: checkMobile,
                        trigger: 'blur'
                    }
                    // validator:验证器, trigger: 触发器
                ],
                area: [{
                    required: true,
                    message: '请选择所属区域',
                    trigger: 'blur'
                }]
            },

            goodslist: [], //购买的商品信息
            totalPrice: 0, //总金额
            totalCount: 0, //总数量

        }
    },

    created() {
        this.getGoodsInfo()
    },

    computed: {
        // // 计算商品金额
        // getTotalMoney() {

        //     this.goodslist.forEach(item => {
        //         this.totalAmount += (item.buycount * item.sell_price)
        //     })

        //     return this.totalAmount
        // },

        // 计算总金额
        getTotalAmount() {
            return this.totalPrice + this.order.expressMoment
        }
    },

    methods: {
        // 获取提交过来的商品信息
        getGoodsInfo() {
            // 获取本地存储的商品信息
            const localgoods = getLocalGoods()
            // console.log(localgoods);

            const idsString = this.$route.query.ids.split(',')

            if(!localgoods[idsString[0]]){
                this.goodslist = []
                console.log(idsString)
            }
            else{
                const tempObj = {}

                this.$axios.get(`site/validate/order/getgoodslist/${this.$route.query.ids}`).then(res => {
                    // console.log(res.data);
                    res.data.message.forEach(item => {
                        item.buycount = localgoods[item.id]

                        tempObj[item.id] = item.buycount

                        this.totalCount += item.buycount
                        this.totalPrice += item.buycount * item.sell_price
                    });

                    // 给order加上goodsAmount,goodsids,cargoodsobj后台需要
                    this.order.goodsAmount = this.totalPrice
                    this.order.goodsids = this.$route.query.ids
                    this.order.cargoodsobj = tempObj

                    this.goodslist = res.data.message
                })
            }
        },

        onSelected(data) { //省区市重新赋值,当选择最后一项时触发
            // console.log(data);
            this.order.area = data
        },

        // 切换快递方式
        expressChange(label) {
            switch (label) {
                case 1:
                    this.order.expressMoment = 20
                    break;

                case 2:
                    this.order.expressMoment = 10
                    break;

                case 3:
                    this.order.expressMoment = 8
                    break;

                default:
                    break;
            }
        },

        // 确认提交订单
        goToOrder() {
            this.$refs.orderRef.validate((valid) => {
                if (!valid) {
                    console.log('error submit!!');
                    return false;
                } 
                else {
                    // console.log(this.order)
                    this.$axios.post('site/validate/order/setorder', this.order).then(res => {
                        // console.log(res.data)
                        if(res.data.status === 0){ //成功
                        // 跳转到payorder页面
                        this.$router.push({path: '/pay',query:{orderid: res.data.message.orderid}})
                        }

                        // 2.删除本地的商品信息
                        const idsArray = this.$route.query.ids.split(',')
                        // console.log(idsArray)   //["88", "91", "92"]
                        idsArray.forEach(id=>{
                            this.$store.commit('deleteGoods',id)
                        })

                    })
                }
            });
        },

        // 返回购物车
        goBack(){
            // this.$router.push({path: '/shopcart'})
            this.$router.go(-1)
        }

    },
}
</script>

<style>
tbody img {
    width: 100%;
}
</style>
