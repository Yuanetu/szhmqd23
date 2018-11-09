 /**
 * 给 store/index.js 调用的，这个里面有 新增、修改、删除等方法
 */
 
 
 /**
  * 1.获取本地保存的商品数量信息，取出来张成这样 
  *     {88:2,89:3}   id作为key，数量作为值
  */
const getLocalGoods = ()=>{
    return JSON.parse(localStorage.getItem('Goods') || '{}')
}

 /**
  * 3.获取总数量
  * 
  * {88:2,89:3}   id作为key，数量作为值
  */
const getTotalCount = ()=>{
    // 1.获取本地存储的商品数量
    const localGoods = getLocalGoods()

    let goodsTotal = 0

    // 2.循环,把获取到的值进行累加
    for(var key in localGoods){
        goodsTotal += localGoods[key]
    }

    return goodsTotal
}




/* 2.把新增的商品信息存储到本地
* @param {*} goods
*     {goodsId:93,count:3}
*     {goodsId:88,count:3}
*/
const addLocalGoods = (goods)=>{
    // 1.获取本地存储的商品数量,并转为对象
    const localGoods = getLocalGoods()
    // console.log(localGoods)

    // 2.对传递过来的goods.goodsId进行判断，如果已经在localStorage对象中了
    // 则只是把数量累加，如果不存在，则新增一对键值对
    if(localGoods[goods.goodsId]){
        // 如果存在,则累加
        localGoods[goods.goodsId] += goods.goodsNumber
    }
    else{
       localGoods[goods.goodsId] = goods.goodsNumber
    }

    // 3.把新增后的数据重新存储到本地存储中去,记得先把把对象转成json字符串
    localStorage.setItem('Goods' ,JSON.stringify(localGoods))

    // 4.重新统计一下localStorage中最新的数量，并返回
    return getTotalCount()
}

/* 4.修改商品的数量
* @param {*} goods
*     {goodsId:93,count:3}
*     {goodsId:88,count:3}
*/
const updateLocalGoods = (goods)=>{
        // 1.获取本地存储的商品数量,并转为对象 {87:5,88:2}
        const localGoods = getLocalGoods()

        // 2.判断,通过goods.goodsId判断是不是要修改的商品
        // if(localGoods[goods.goodsId]){
        //     // 如果存在,则重新赋值
        //     localGoods[goods.goodsId] = goods.shoppingCount
        // }

        // 2.老师的写法
        localGoods[goods.goodsId] = goods.shoppingCount

        // 5.判断,当商品数量为0时,删除该商品
        if(localGoods[goods.goodsId] === 0){
            const text = delete localGoods[goods.goodsId]
            console.log(text)
        }

        // 3.把修改后的商品数量覆盖保存回去,记得先把把对象转成json字符串
        localStorage.setItem('Goods' ,JSON.stringify(localGoods))

        // 4.重新统计一下localStorage中最新的数量，并返回
        return getTotalCount()
}

/* 5.删除被选中的商品
* @param {*} goods
*     {goodsId:93,count:3}
*     {goodsId:88,count:3}
*/
const deleteLocalGoods = goodsId=>{
    // 1.获取本地存储的商品数量,并转为对象
    const localGoods = getLocalGoods()

    // 2.通过goodsId来判断要删除哪一个商品
    // if(localGoods[goods.goodsId]){
    //     const text = delete localGoods[goods.goodsId]
    //     console.log(text)
    // }

    // 2.老师的写法
    delete localGoods[goodsId]

    // 3.把删除后的数据重新存储,记得先把把对象转成json字符串
    localStorage.setItem('Goods' ,JSON.stringify(localGoods))

    // 4.重新统计一下localStorage中最新的数量，并返回
    return getTotalCount()
}

// 按需导出
// 不加default 就是按需导出
export {
    addLocalGoods,
    getTotalCount,
    getLocalGoods,
    updateLocalGoods,
    deleteLocalGoods
}