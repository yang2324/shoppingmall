import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types"

export default {
  addCarts(context, payload) {
    return new Promise((resolve, reject) => {

      //查找之前数值中是否已经有数据
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) { //商品数量加1
        //oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve("商品数量加1")
      } else {  //新添加商品
        payload.count = 1
        //context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve("新添加商品成功")
      }
    })
  }
}
