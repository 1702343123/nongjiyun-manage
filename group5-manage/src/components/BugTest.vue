<template>
	<div>
		<div v-for="(asking, index) in askings" :key="index">
			<div>{{asking.user.id}}</div>
		</div>
	</div>
</template>
<script>
	export default {
	  name: 'bug',
		data(){
			return{
				askings:[]
			};
		},
		mounted:function(){
			this.getAskings();
		},
		methods:{
			getAskings: function() {
				var _this = this;
				console.log('getaskings');
				_this.$http({
					method: 'POST',
					url: 'http://47.101.51.245:8888/api/question/getQuestionList',
					header: {
						'content-type': 'application/json;charset=UTF-8'
					}
				}).then(function(res) {
					if(res.data.code==0){
						_this.askings = res.data.data;
					}else{
						alert('加载数据失败');
					}
			
				})
			},
		}
	}
</script>
