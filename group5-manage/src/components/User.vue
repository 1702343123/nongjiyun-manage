<template>
	
		<el-table :data="expert" style="width: 90%;margin: auto;" border stripe>
			<el-table-column prop="expertName" label="专家姓名"  width="150" align="center" type="selection">
			</el-table-column>
			<el-table-column prop="profession" label="行业"  width="150" align="center">
			</el-table-column>
			<el-table-column prop="grade" label="身份"  width="150" align="center">
			</el-table-column>
			<el-table-column prop="unitName" label="单位"  width="150" align="center">
			</el-table-column>
			<el-table-column prop="resume" label="专业"  width="150" align="center">
			</el-table-column>
			<el-table-column prop="phoneNumber" label="手机号码"  width="150" align="center">
			</el-table-column>
			<el-table-column prop="checkAll" label="签到次数"  width="150" align="center">
			</el-table-column>
			<el-table-column prop="score" label="总积分"  width="150" align="center">
			</el-table-column>
			<el-table-column prop="state" label="状态"  width="150" align="center">
			</el-table-column>
		</el-table>
		
		
</template>

<script>
	export default {
		data() {
			return {
				expert: []
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
			}

		}
	}
</script>
