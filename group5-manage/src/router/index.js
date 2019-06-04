import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


export default new Router({
	mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
				// component: resolve => require(['../components/Signin.vue'], resolve)
      	component: resolve => require(['../components/HelloWorld.vue'], resolve)
    },
		  {
		  path: '/sign',
		  name: 'Signin',
		  	component: resolve => require(['../components/Signin.vue'], resolve)
		},
		{
		  path: '/home',
		  name: 'Home',
		  	component: resolve => require(['../components/Home.vue'], resolve)
		},
		{
		  path: '/user',
		  name: 'User',
		  	component: resolve => require(['../components/User.vue'], resolve)
		},
		{
		  path: '/test',
		  name: 'Test',
		  	component: resolve => require(['../components/Test.vue'], resolve)
		}
  ]
})
