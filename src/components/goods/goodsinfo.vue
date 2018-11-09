<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if="goods.goodsinfo" class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist " :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number :min="1" :max="goods.goodsinfo.stock_quantity" size="small" v-model="buyCount"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="addToShopCartRef" @click="addToShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix >
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="isShow =false" href="javascript:;" :class="isShow ? '':'selected' ">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="isShow = true" href="javascript:;" :class="isShow ? 'selected':'' ">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="!isShow" class="tab-content entry" style="display: block;">
                                <div style="padding:5px;" v-html="goods.goodsinfo.content"></div>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="isShow" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textareaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="postComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="usercontent.length === 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in usercontent" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD hh:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[2, 5, 10, 15]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <transition 
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter">
            <div v-show="isShowCart" ref='animateDivRef' class="animationImg" v-if="goods.imglist">
                <img :src="goods.imglist[0].original_path" alt="">
            </div>
        </transition>
    </div>
</template>

<script>
// import axios from 'axios'
// 按需导入 Affix 
import {Affix } from 'iview'

import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'


// 导出vue的对象
export default {
  data() {
    return {
      goods: {},  // 商品数据
    //   buyCount: 0,  // 购买数量
      buyCount: 1,  // 购买数量
      isShow: false,  //是否显示商品评论
      pageIndex: 1, //页码
      pageSize: 2,  //页容量
      usercontent: [],   //评论列表
      total: 0,  //总条数
      addToShopCartOffset: null, //加入购物车按钮元素的偏移量
      shopCartOffset: null, //顶部购物车偏移量
      isShowCart: false // 是否显示飞入购物车的图片
    }
  },

  components: {
      Affix
  },

  created() {
    // 获取商品数据
    this.getgoodsDetail()
    // 获取评论
    this.getuserContent()
    
    // this.ShopCount()
    // console.log(this.buyCount);
    
  },

  updated(){
      $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
  },

  watch: {
      $route(){
    // 获取商品数据
    this.getgoodsDetail()
    // 获取评论
    this.getuserContent()
      }
  },

  methods: {
    getgoodsDetail() {
        this.$axios.get(`site/goods/getgoodsinfo/${this.$route.params.goodsId}`).then(res => {
            // console.log(res.data)
            this.goods = res.data.message

            // 获取加入购物车的offsetTop和offsetLeft;
            setTimeout(()=>{
                // console.log($(this.$refs.shoppingCartOffset).offset());
                // 获取加入购物车dom元素的偏移量
                this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset()

                $(this.$refs.animateDivRef).css({
                    top: this.addToShopCartOffset.top,
                    left: this.addToShopCartOffset.left,
                })

                // 获取结束位置的偏移量
                this.shopCartOffset = $('#shoppingCartCount').offset()
            },200)
        })
    },

    getuserContent(){
        this.$axios.get(`site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=>{
            this.usercontent = res.data.message
            // console.log(res.data);
            this.total = res.data.totalcount
        })
    },
    // 分页相关---更改了页容量
    handleSizeChange(pageSize){
        // console.log(pageSize)
        this.pageIndex = 1

        this.pageSize = pageSize

        this.getuserContent()
    },
    // 分页相关---更改了页码
    handleCurrentChange(pageIndex){
        // console.log(pageIndex)

        this.pageIndex = pageIndex

        this.getuserContent()
    },

    postComment(){
        const content = this.$refs.textareaRef.value

        if(content.trim().length === 0){
            // 提示，内容不能为空
            this.$message({
                message: '内容不能为空！！！',
                type: 'warning'
            });

            return false
        }

        this.$axios.post(`site/validate/comment/post/goods/${this.$route.params.goodsId}`,{commenttxt: content}).then(res=>{
            // 提示提交成功
            this.$message({
                message: '提交成功',
                type: 'success'
            });
            // 清空文本域
            this.$refs.textareaRef.value = ''
            // 重新加载第一页
            this.pageIndex = 1
            this.getuserContent()
        })
    },

    addToShopCart(){
        this.isShowCart = true;

        // 准备载荷(参数)，并提交(conmmit) mutations中的addGoods
        const goods = {
            goodsId: this.$route.params.goodsId,
            goodsNumber: this.buyCount
        }

        this.$store.commit('addGoods',goods)
        // this.ShopCount()

        // 每次添加完后,重新把计数器初始化为1
        this.buyCount = 1

    },

    // ShopCount(){
    //     // 准备载荷(参数)，并提交(conmmit) mutations中的addGoods
    //     const goods = {
    //         goodsId: this.$route.params.goodsId,
    //         goodsNumber: this.buyCount
    //     }

    //     this.$store.commit('addGoods',goods)
    // },

    beforeEnter(el){
        el.style.top = this.addToShopCartOffset.top +'px';
        el.style.left = this.addToShopCartOffset.left +'px';
        el.style.transform = 'scale(1.0)';
    },

    enter(el,done){
        el.style.transition = 'all 0.3s';

        el.offsetWidth;

        el.style.top = this.shopCartOffset.top - 5 +'px';
        el.style.left = this.shopCartOffset.left +'px';
        el.style.transform = 'scale(0.1)';

        done()
    },

    afterEnter(el){
        this.isShowCart = false;
    }

  }
}
</script>

<style>
    @import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';

    .animationImg {
        width: 35px;
        height: 35px;
        position: absolute;
        top: 0;
        left: 0;
    }

     .animationImg img {
         width: 35px;
     }
</style>

