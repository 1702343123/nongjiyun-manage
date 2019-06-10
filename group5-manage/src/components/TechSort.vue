<template>
	<div>
		<div style="margin-top: 20px">
			<el-button @click="delArray()" type="danger">批量删除</el-button>
			<el-button @click="toggleSelection()">取消选择</el-button>
		</div>
		<el-table ref="multipleTable" :data="techSort" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="日期" width="120">
				<template slot-scope="scope">{{ scope.row.name }}</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="address" label="地址" show-overflow-tooltip>
			</el-table-column>

			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
				</template>

			</el-table-column>
		</el-table>

		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				multipleSelection: [],
				delarr: [], //存放删除的数据
				techSort: []

			}
		},
		mounted: function() {
			this.getTechSort();
		},
		methods: {
			toggleSelection() {
					this.$refs.multipleTable.clearSelection();
			},
			getTechSort: function() {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: 'http://47.101.51.245:8888/api/news/farmingTechnologySort',
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.techSort = res.data.data;
					} else {
						console.log(res.data.code);
						alert('数据加载失败！');
					}
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			
			// 多选删除
			delArray: function() {
				var _this = this;
				const length = this.multipleSelection.length;

				for (let i = 0; i < length; i++) {
					// console.log(this.multipleSelection[i])
					this.delarr.push(this.multipleSelection[i].id);
					console.log(this.delarr[i])
				}
				_this.$http({
					method: 'GET',
					url: 'http://localhost:8888/advertise2/deleteAll?ids=' + this.delarr,

					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						alert('成功！');
						_this.getTechSort();
					} else {
						alert('数据加载失败！');
					}
				})
			},
			
			//单行删除
			handleDelete(row) {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: 'http://localhost:8888/advertise2/deleteAll?ids=' + row,
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						alert('成功！');
						_this.getTechSort();
					} else {
						alert('数据加载失败！');
					}
				})
			}

		}
	}
</script>
