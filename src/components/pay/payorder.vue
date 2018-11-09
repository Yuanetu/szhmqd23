<template>
<div>
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="javascript:;">支付中心</a>
        </div>
    </div>

    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <div class="nav-tit pay">
                    <a href="javascript:;" class="selected">支付中心</a>
                </div>
                <div class="form-box payment">
                    <div class="el-row">
                        <div class="el-col el-col-18">
                            <div class="el-row">
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>订 单 号：</dt>
                                        <dd>{{orderlist.order_no}}</dd>
                                    </dl>
                                </div>
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>收货人姓名：</dt>
                                        <dd>{{orderlist.accept_name}}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>送货地址：</dt>
                                        <dd>{{orderlist.area}} {{orderlist.address}}
                                        </dd>
                                    </dl>
                                </div>
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>手机号码：</dt>
                                        <dd>{{orderlist.mobile}}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>支付金额：</dt>
                                        <dd>{{orderlist.order_amount}} 元</dd>
                                    </dl>
                                </div>
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>支付方式：</dt>
                                        <dd>在线支付</dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="el-row">
                                <div class="el-col el-col-12">
                                    <dl class="form-group">
                                        <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                        <dd>{{orderlist.message}}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="el-col el-col-6">
                            <!-- <dzh-qrcode url="https://baike.baidu.com/item/BL/215436" :img_url="img_url"></dzh-qrcode> -->

                            <img id="imgLogo" src="../../assets/f7e49e7cd47d954d6ed6060e72e7faff.png" hidden>
                            <div id="container2">
                                <canvas width="400" height="400"></canvas>
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
// 导入二维码生成组件
import DZHQRCode from 'dzh-qrcode'

export default {
    // 局部注册
    components: {
        'dzh-qrcode': DZHQRCode
    },
    data() {
        return {
            orderlist: {}, //订单信息
            // img_url: require('../../assets/f7e49e7cd47d954d6ed6060e72e7faff.png')
            img_url: '',
            timeInterval: -1 //用来清除定时器
        }
    },

    created() {
        // 为了保险起见，在每次刷新页面的时候，清除上一个遗留下来的定时器
        clearInterval(this.timeInterval)

        this.getorder()
        // this.img_url = require('../../assets/f7e49e7cd47d954d6ed6060e72e7faff.png')

        // 轮询
        this.task()

    },

    mounted() {
        //图片logo
        // vue解析的时候，在去加载img的时候，如果发现有hidden属性，可能会演示加载
        // setTimeout(() => {
        //     $('#container2').erweima({
        //         mode: 4,
        //         mSize: 20,
        //         image: $("#imgLogo")[0],
        //         text: `http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.query.orderid}`
        //     });
        // },300)
        //文字logo
        // $("#container").erweima({
        //     label: '周洋毅'
        // });

    },

    updated() {
        setTimeout(() => {
            $('#container2').erweima({
                mode: 4,
                mSize: 20,
                image: $("#imgLogo")[0],
                text: `http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.query.orderid}`
            });
        },200)
    },

    methods: {
        // 定时器，用来轮询，每隔几秒向服务器发起请求，看用户是否已经完成支付,如果完成，则跳转到完成支付页面，如果没有在，则停留在本页面
        task() {
            this.timeInterval = setInterval(() => {
                this.getorder()
            }, 3000)
        },

        // 1.根据订单ID获取订单信息
        getorder() {
            // 发起请求
            this.$axios
                .get(`site/validate/order/getorder/${this.$route.query.orderid}`)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.message[0].status === 2) {
                        this.$router.push({
                            path: '/paysuccess'
                        })
                        return false
                    }

                    this.orderlist = res.data.message[0]
                })
        }
    },

    beforeDestroy() { //当调用beforeDestroy()钩子函数的时候，证明已经支付成功
        // 在Vue实例销毁前，清空定时器
        // console.log(this.timeInterval);

        clearInterval(this.timeInterval)
        // console.log(this.timeInterval);

    }
}
</script>
