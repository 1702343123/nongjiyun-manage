<template>

	<div>
		<el-table :data="techSort" style="width: 70%;margin: auto;">
			<el-table-column label="日期" width="180">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="姓名" width="180">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="bottom">
						<p>姓名: {{ scope.row.name }}</p>
						<p>住址: {{ scope.row.id }}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.icon }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
					<el-button size="mini" type="danger" @click="delSort(scope.row.id)">删除</el-button>

				</template>
			</el-table-column>
		</el-table>


		<el-table :data="users" style="width: 70%;margin: auto;">
			<el-table-column label="日期" width="180">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.userName }}</span>
				</template>
			</el-table-column>


		</el-table>

		<el-select v-model="value" placeholder="请选择" @change="sel()">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<el-select v-model="value2" placeholder="请选择" @change="sel()">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>

		  <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRecord">
    </el-pagination>
  </div>
		
	</div>

</template>

<script>
	export default {
		data() {
			return {
				techSort: [],
				users: [],
				options: [{
						value: '',
						label: '请选择'
					}, {
						value: '宿迁',
						label: '宿迁'
					}, {
						value: '南京',
						label: '南京'
					}, {
						value: '苏州',
						label: '苏州'
					}, {
						value: '盐城',
						label: '盐城'
					},
					{
						value: '江苏',
						label: '江苏'
					}
				],
				value: '',
				value2: '',
				totalRecord: 0,
				currPage: 1,
        pageSize:10
			}
		},
		mounted: function() {
			// this.getTechSort();
			this.getUsers();
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
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
						alert('数据加载失败！');
					}
				})
			},
			getUsers: function() {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: this.apiServer + '/api/user/getAllUser',
					params: {
						currPage:_this.currPage,
						pageSize: _this.pageSize
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.totalRecord=res.data.total;
						_this.users = res.data.data;
						console.log(res.data.data);
						
						
					} else {
						console.log(res.data.code);
						alert('数据加载失败！');
					}
				})
			},
			delSort: function(id) {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: 'http://47.101.51.245:8888/news/delTechnoSortById/' + id,
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data == 0) {
						alert('成功！');
						_this.getTechSort();
					} else {
						alert('数据加载失败！');
					}
				})
			},
			sel() {
				console.log(this.value);
				console.log(this.value2);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				  var _this = this;
				_this.pageSize = val;
				  _this.getUsers();
			},
			 handleCurrentChange(val) {
				 console.log(`第${val}页 `);
      var _this = this;
      _this.currPage = val;
        _this.getUsers();
     
    },



		}
	}
</script>
