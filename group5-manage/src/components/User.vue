<template>
	<div>
		<div style="margin-top: 20px">
			<el-button @click="delArray()" type="danger">批量删除</el-button>
			<el-button @click="toggleSelection()">取消选择</el-button>
			<!-- Form -->
			<el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>

			<el-dialog title="填写用户信息" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="用户名" :label-width="formLabelWidth">
						<el-input v-model="form.userName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="手机号" :label-width="formLabelWidth">
						<el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" :label-width="formLabelWidth">
						<el-input v-model="form.email" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="身份" :label-width="formLabelWidth">
						<el-input v-model="form.identity" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="地址" :label-width="formLabelWidth">
						<el-input v-model="form.userAddress" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" :label-width="formLabelWidth">
						<el-select v-model="form.sex" placeholder="性别">
							<el-option label="男" value="女"></el-option>
							<el-option label="女" value="女"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="add(form)">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		<el-table ref="multipleTable" :data="users" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="手机号码" width="120">
				<template slot-scope="scope">{{scope.row.phoneNumber}}</template>
			</el-table-column>
			<el-table-column label="用户名称" width="120">
				<template slot-scope="scope">{{scope.row.userName}}</template>
			</el-table-column>
			<el-table-column prop="name" label="身份" width="120">
				<template slot-scope="scope">{{scope.row.identity}}</template>
			</el-table-column>
			<el-table-column prop="address" label="地区" show-overflow-tooltip>
				<template slot-scope="scope">{{scope.row.userAddress}}</template>
			</el-table-column>
			<el-table-column prop="address" label="单位名称" show-overflow-tooltip>
				<template slot-scope="scope">{{scope.row.unitAddress}}</template>
			</el-table-column>
			<el-table-column prop="address" label="种养类别及规模" show-overflow-tooltip>
				<template slot-scope="scope">{{scope.row.plantCategory}}</template>
			</el-table-column>
			<el-table-column prop="address" label="签到次数" show-overflow-tooltip>
				<template slot-scope="scope">{{scope.row.checkAll}}</template>
			</el-table-column>
			<el-table-column prop="address" label="总积分" show-overflow-tooltip>
				<template slot-scope="scope">{{scope.row.score}}</template>
			</el-table-column>
			<el-table-column prop="address" label="注册时间" show-overflow-tooltip>
				<template slot-scope="scope">{{scope.row.time}}</template>
			</el-table-column>
			<el-table-column label="禁用/启用" width="180">
				<template slot-scope="scope">
					<el-button size="small" type="danger" v-if="scope.row.status==0" @click="handleDelete(scope.row.id)">禁用</el-button>
					<el-button size="small" type="primary" v-if="scope.row.status==1" @click="handleDelete(scope.row.id)">启用</el-button>
				</template>
			</el-table-column>
			<el-table-column label="编辑" width="180">
				<template slot-scope="scope">
					<el-button size="small" type="primary" @click="getUserById(scope.row.id)">编辑</el-button>

					<el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
						<el-form :model="form">
							<el-form-item label="用户名" :label-width="formLabelWidth">
								<el-input v-model="form.userName" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="手机号" :label-width="formLabelWidth">
								<el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" :label-width="formLabelWidth">
								<el-input v-model="form.email" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="身份" :label-width="formLabelWidth">
								<el-input v-model="form.identity" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="地址" :label-width="formLabelWidth">
								<el-input v-model="form.userAddress" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="性别" :label-width="formLabelWidth">
								<el-select v-model="form.sex" placeholder="性别">
									<el-option label="男" value="女"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="updateUser(form)">确 定</el-button>
						</div>
					</el-dialog>
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
				users: [],
				dialogFormVisible: false,
				formLabelWidth: '120px',
				form: {
					email: '',
					identity: '',
					phoneNumber: '',
					sex: '',
					userAddress: '',
					userName: '',
					id:''
				},

			}
		},
		mounted: function() {
			this.getUsers();
		},
		methods: {
			toggleSelection() {
				this.$refs.multipleTable.clearSelection();
			},
			getUsers: function() {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: this.apiServer + '/api/user/getAllUser',
					param: {
						currPage: 1,
						pageSize: 10
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.users = res.data.data;
						console.log(res.data.data);
					} else {
						console.log(res.data.code);
						alert('数据加载失败！');
					}
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			// 禁用/启用
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

			//禁用/启用
			handleDelete(row) {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer + '/rear/user/setStatusUser?id=' + row,
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.data.status == 0) {
						console.log(res.data.data.status);
						alert(res.data.data.msg);
						_this.getUsers();
					} else if (res.data.data.status == 1) {
						console.log(res.data.data.status);
						alert(res.data.data.msg);
						_this.getUsers();
					} else {
						alert('数据加载失败！');
					}
				})
			},
			add(form) {
				var _this = this;
				_this.$http({
					method: 'POST',
					url: this.apiServer + '/rear/user/addUser',
					params: {
						email: this.form.email,
						identity: this.form.identity,
						phoneNumber: this.form.phoneNumber,
						sex: this.form.sex,
						userAddress: this.form.userAddress,
						userName: this.form.userName
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						console.log(res.data.code);
						console.log(_this.form.email);
						_this.dialogFormVisible = false;
						alert(res.data.msg);
						_this.getUsers();

					} else {
						alert('数据加载失败！');
					}
				})
			},
			getUserById(id) {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer + '/api/user/getUserMsgById?userId=' + id,

					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						console.log(res.data.code);
						console.log(res.data.data.email);
						console.log(res.data.data.id);
						_this.dialogFormVisible = true;
						_this.form.email = res.data.data.email;
						_this.form.phoneNumber = res.data.data.phoneNumber;
						_this.form.userName = res.data.data.userName;
						_this.form.userAddress = res.data.data.userAddress;
						_this.form.sex = res.data.data.sex;
						_this.form.identity = res.data.data.identity;
						_this.form.userAddress = res.data.data.userAddress;
						_this.form.id=res.data.data.id;
					} else {
						alert('数据加载失败！');
					}
				})
			},
			updateUser(form) {
				var _this = this;
				
				_this.$http({
					method: 'post',
					url: this.apiServer + '/api/user/updateMyMsg',
					params: {
						id: this.form.id,
						email: this.form.email,
						identity: this.form.identity,
						phoneNumber: this.form.phoneNumber,
						sex: this.form.sex,
						userAddress: this.form.userAddress,
						userName: this.form.userName
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.dialogFormVisible = false;
						_this.getUsers();
						console.log(res.data.data.id)
						alert('修改成功');
					} else {
						alert('数据加载失败！');
					}
				})
			}

		}
	}
</script>
