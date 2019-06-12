import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


export default new Router({
	mode: "history",
	routes: [{
			path: '/',
			name: 'HelloWorldF',
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
			component: resolve => require(['../components/HomeTest.vue'], resolve)
		},
		{
			path: '/ut',
			name: 'User',
			component: resolve => require(['../components/UserTest.vue'], resolve)
		},
		{
			path: '/test',
			name: 'Test',
			component: resolve => require(['../components/Test.vue'], resolve)
		},
		{
			path: '/techSort',
			name: 'TechSort',
			component: resolve => require(['../components/TechSort.vue'], resolve)
		},
		{
			path: '/n',
			name: 'NavMenu',
			component: resolve => require(['../components/NavMenuTest.vue'], resolve)
		},
		{
			path: '/user',
			name: 'User',
			component: resolve => require(['../components/User.vue'], resolve)
		},
		{
			path: '/bug',
			name: 'bug',
			component: resolve => require(['../components/BugTest.vue'], resolve)
		},
		{
			path: '/uploadTest',
			name: 'upload',
			component: resolve => require(['../components/UploadTest.vue'], resolve)
		},
				{
			path: '/up',
			name: 'upload',
			component: resolve => require(['../components/upload2Test.vue'], resolve)
		}
		
	]
})
