<template>
	<div>
		<el-table :data="expert" style="width: 90%;margin: auto;" border stripe>
			<el-table-column prop="expertName" label="专家姓名" width="150" align="center" type="selection">
			</el-table-column>
			<el-table-column prop="profession" label="行业" width="150" align="center">
			</el-table-column>
			<el-table-column prop="grade" label="身份" width="150" align="center">
			</el-table-column>
			<el-table-column prop="unitName" label="单位" width="150" align="center">
			</el-table-column>
			<el-table-column prop="resume" label="专业" width="150" align="center">
			</el-table-column>
			<el-table-column prop="phoneNumber" label="手机号码" width="150" align="center">
			</el-table-column>
			<el-table-column prop="checkAll" label="签到次数" width="150" align="center">
			</el-table-column>
			<el-table-column prop="score" label="总积分" width="150" align="center">
			</el-table-column>
			<el-table-column prop="state" label="状态" width="150" align="center">
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="getTest()">get请求测试1</el-button>
		<el-button type="primary" @click="getTest2()">get请求测试2</el-button>
		<el-button type="primary" @click="postTest()">post请求测试1</el-button>
		<el-button type="primary" @click="postTest2()">post请求测试2</el-button>
		<el-button type="primary" @click="postTest3()">post请求测试3</el-button>

		<el-button type="primary" @click="allTest()">并发请求</el-button>
		<el-input type="text" v-model="user.currPage" placeholder="页码" />
		<el-input type="text" v-model="user.pageSize" placeholder="数量" />
		<el-input type="text" v-model="user.review" placeholder="状态" />

	</div>

</template>

<script>
	export default {
		data() {
			return {
				expert: [],
				user: {
					currPage: '',
					pageSize: '',
					review: ''
				}
			}
		},
		mounted: function() {
			this.getExpert();
		},
		methods: {

			getExpert: function() {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: 'http://47.101.51.245:8888/expert/getAllExpert',
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.expert = res.data.data;
					} else {
						alert('数据加载失败！');
					}
				})
			},
			getTest() {
				var _this = this;

				_this.$http.get('http://47.101.51.245:8888/expert/getAllExpert?currPage=1&pageSize=3')
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getTest2() {
				// 可选地，上面的请求可以这样做
				var _this = this;

				_this.$http.get('http://47.101.51.245:8888/expert/getAllExpert', {
						params: {
							currPage: 2,
							pageSize: 3
						}
					})
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			postTest() {
				var _this = this;
				_this.$http.post('http://47.101.51.245:8888/video/searchVideoByReview?currPage=0&pageSize=5&review=0', {})
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			postTest2() {
				var _this = this;
				_this.$http.post('http://47.101.51.245:8888/video/searchVideoByReview', {
						currPage: 0,
						pageSize: 5,
						review: 0
					})
					.then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},


			allTest() {
				function getUserAccount() {
					return _this.$http.get('http://47.101.51.245:8888/expert/getAllExpert?currPage=1&pageSize=3');
				}

				function getUserPermissions() {
					return _this.$http.get('http://47.101.51.245:8888/expert/getAllExpert?currPage=2&pageSize=3');
				}
				var _this = this;

				_this.$http.all([getUserAccount(), getUserPermissions()])
					.then(_this.$http.spread(function(acct, perms) {
						alert("成功")
						// 两个请求现在都执行完成
					}));
			},


			postTest3() {
				// 发送 POST 请求
				var _this = this;
				_this.$http({
						method: 'post',

						url: 'http://localhost:8888/video/searchVideoByReview',
						// 用data可以请求成功但没有返回数据，不知道为啥
						params: {
							currPage: this.user.currPage,
							pageSize: this.user.pageSize,
							review: this.user.review
						},
						transformRequest: [function(data) {
							// 对 data 进行任意转换处理
							return _this.qs.stringify(data)
						}],
						headers: {
							'content-type': 'application/json'
						}
					}).then(function(response) {
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			}

		}
	}
</script>
