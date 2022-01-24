
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //判断是不是新添加的商品
      let oldProduct = null
      oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
      //判断是否存在oldProduct
      if (oldProduct) { //数量加1
        context.commit('addCounter', oldProduct)
        resolve('数量+1')
      } else { //添加新商品
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('种类+1')

      }
    })
  }
}