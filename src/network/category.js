import {request} from "./request";

//分类菜单栏
export function getCategory() {
  return request({
    url: "/category"
  })
}

//分类对应的内容
export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  })
}

//分类对应的列表内容
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url:"/subcategory/detail",
    params:{
      miniWallkey,
      type
    }
  })
}
