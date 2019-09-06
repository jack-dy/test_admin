import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout/Index.vue';

Vue.use(Router);

export const asyncRouterMap =[
  {
    path:'/',
    name:'dashboard',
    component:Layout,
    hidden: true,
    redirect:'/home',
    children:[
      {
        path:'/home',
        name:'home',
        meta:{title:'首页', icon:'fa fa-home'},
        component:()=>import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden:false,
    meta:{title:'系统登录'},
    component:()=>import('@/views/Login/Login.vue') 
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes:asyncRouterMap
});

//路由卫士
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.tsToken?true:false;
  if(isLogin){
    if(to.path=='/login'){
      next('/');
    }else{
      next();
    }
  }else{
    if(to.path=='/login'){
      next();
    }else{
      next('/login');
    }
  }
});



export default router;
