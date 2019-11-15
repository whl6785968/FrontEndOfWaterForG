import Vue from 'vue'

const has = Vue.directive('has',{
    inserted:function(el,binding,vnode) {
      if(!Vue.prototype.$_has(binding.value)){
        el.parentNode.removeChild(el);
      }
    }
});


Vue.prototype.$_has = function(value){
  let isExist = false;
  let currUserRole = sessionStorage.getItem("role");
  if(currUserRole == undefined || currUserRole == null){
      return false;
  }
  
  value.forEach((item,index) => {
    if(currUserRole == item){
      isExist = true;
    }
  })
  
  return isExist;
  
}

export { has }
