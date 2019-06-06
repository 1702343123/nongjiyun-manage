<template>
	<div>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="日期" width="120">
				<template slot-scope="scope">{{ scope.row.date }}</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="address" label="地址" show-overflow-tooltip>
			</el-table-column>

			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
				</template>

			</el-table-column>
		</el-table>

		<div style="margin-top: 20px">
			<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
			<el-button @click="toggleSelection()">取消选择</el-button>
			<el-button @click="delAll()">批量删除</el-button>
			<el-button @click="getAll()">批量获取</el-button>
			<el-button @click="del()">哈哈</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-03',
					name: '张娟',
					address: '上海市普陀区金沙江路 1518 弄',
					id: 1
				}, {
					date: '2016-05-02',
					name: '潘炳稳',
					address: '上海市普陀区金沙江路 1518 弄',
					id: 2
				}, {
					date: '2016-05-04',
					name: '何杰',
					address: '上海市普陀区金沙江路 1518 弄',
					id: 3
				}, {
					date: '2016-05-01',
					name: '汤先送',
					address: '上海市普陀区金沙江路 1518 弄',
					id: 4
				}, {
					date: '2016-05-08',
					name: '范佳林',
					address: '上海市普陀区金沙江路 1518 弄',
					id: 7
				}, {
					date: '2016-05-06',
					name: '唐元芳',
					address: '上海市普陀区金沙江路 1518 弄',
					id: 5
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					id: 6
				}],
				multipleSelection: [],
				delarr: [], //存放删除的数据
				id: 1

			}
		},

		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAll() {

				const length = this.multipleSelection.length;


				for (let i = 0; i < length; i++) {

					// console.log(this.multipleSelection[i])
					this.delarr.push(this.multipleSelection[i].id);
					console.log(this.delarr[i])

				}

			},
			del: function() {
				var _this = this;
				const length = this.multipleSelection.length;

				for (let i = 0; i < length; i++) {

					// console.log(this.multipleSelection[i])
					this.delarr.push(this.multipleSelection[i].id);
					console.log(this.delarr[i])
				}
				_this.$http({
					method: 'GET',
					url: 'http://localhost:8888/advertise2/deleteAll?id=' + this.delarr,

					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (1 == 1) {
						Message({
							message: '发布成功!！',
							type: 'success',
						});
						_this.$router.push('/exchange');
					} else {
						Message({
							message: '发布失败!！',
							type: 'error',
						});
					}
				})
			},
			//单行删除

			handleDelete(index, row) {

				var len = this.delarr.push(row); //把单行删除的每条数据的id添加进放删除数据的数组
				console.log(row);
			},
			getAll() {

				const length = this.delarr.length;


				for (let i = 0; i < length; i++) {
					console.log("输出数据")
					console.log(this.delarr[i]);
				}
			}
		}
	}
</script>
