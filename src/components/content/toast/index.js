import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.new的方式，根据组件构造器的方式，创建一个组件对象
  const toast = new toastConstructor()
  //3.将组件对象手动挂载某个元素上
  toast.$mount(document.createElement("div"))
  //4.将挂载的元素放在body中
  document.body.appendChild(toast.$el)
  //5.最后将toast挂载Vue原型上
  Vue.prototype.$toast = toast
}

export default obj
