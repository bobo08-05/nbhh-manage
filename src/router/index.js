import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push=function(location,resolve,reject) {
 if(resolve && reject){
  originPush.call(this,location,resolve,reject)
 }else{
  originPush.call(this,location,()=>{},()=>{})
 }
}

import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';

let router = new VueRouter({
 routes:[
  {
   path:'/login',
   component:Login
  },
  {
   path:'/register',
   component:Register
  },
  {
   path:'/home',
   component:Home
  },
  {
   path:'*',
   redirect:'/login'
  }
 ]
})

export default router;

