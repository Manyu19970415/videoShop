import { request } from "./request";
// 首页轮播图和推荐
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
// export function getHomeRecommenddata() {
//   return request({
//     url: '/home/recommend'
//   })
// }
//首页商品  流行 新品 推荐
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}