import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types"

export default {
  addCarts(context, payload) {
    //查找之前数值中是否已经有数据
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct) {
      //oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      payload.count =1
      //context.state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }
  }
}
