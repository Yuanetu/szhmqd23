<template>
    <div>
        <div class="left" @click="substrict">-</div>
        <div class="middle">{{shoppingCount}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                shoppingCount: this.count,
            }
        },

        props: ['goodsId','count'],

        methods: {
            add(){
                this.shoppingCount++
                this.getChangeshopCount()
            },

            substrict(){
                if(this.shoppingCount === 0){
                    return false
                }

                this.shoppingCount--
                this.getChangeshopCount()
            },

           getChangeshopCount(){
            //    console.log(this.shoppingCount);
               
                this.$emit('goodsCountChanges',{
                    shoppingCount: this.shoppingCount,
                    goodsId: this.goodsId
                })
            }

        },

    }
</script>

<style>
    .left,
    .middle,
    .right {
        display: inline-block;
        border: 1px solid rgb(0, 132, 255);
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }

    .middle {
        margin: 0 2px;
    }
</style>

