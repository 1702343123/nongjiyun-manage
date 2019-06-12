<template>
	<div>
		<div style="margin-top: 20px;padding-left: 20px;padding-right: 30px;margin-bottom: 30px;">
			<!-- 搜索 -->
			<div style="display: flex;margin-bottom: 30px;">
				<div style="display: flex;">
					<label style="display: block;">城市搜索</label>
					<el-select v-model="city" placeholder="请选择" @change="searchSel()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			   <div style="display: flex;">
					 <label style="display: block;">人员类别</label>
					 <el-select v-model="identity" placeholder="请选择" @change="searchSel()">
					<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				 </div>
			</div>
			<div style="display: flex;justify-content: space-between;">
				<div>
					<el-button @click="toggleSelection()">取消选择</el-button>
					<!-- Form -->
					<el-button type="primary" @click="dialogFormVisibleAdd = true">添加用户</el-button>
				</div>
				<div style="display: flex;">
					<label style="display: block;">手机号、昵称、地域搜索</label>
					<div style="width: 300px;">
						<el-input v-model="keyword" placeholder="关键字"></el-input>
					</div>
					<el-button type="primary" @click="search(keyword)">搜索</el-button>
				</div>
			</div>

			<el-dialog title="填写用户信息" :visible.sync="dialogFormVisibleAdd">
				<el-form :model="form">
					<el-form-item label="用户名" :label-width="formLabelWidth">
						<el-input v-model="form.userName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="头像" :label-width="formLabelWidth">
						<el-upload
  class="upload-demo"
  action="http://localhost:8888/api/img/insetImg"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success="handleSuccess"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
					</el-form-item>
					<el-form-item label="头像地址" :label-width="formLabelWidth">
						<el-input v-model="form.headUrl" autocomplete="off"></el-input>
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
									<el-option label="男" value="男"></el-option>
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
				users: [],
				dialogFormVisible: false,
				dialogFormVisibleAdd: false,
				formLabelWidth: '120px',
				form: {
					email: '',
					identity: '',
					phoneNumber: '',
					sex: '',
					userAddress: '',
					userName: '',
					id: '',
					identity: '',
					city: '',
					headUrl:''
				},
				keyword: '',
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
					}],
					options2: [{
							value: '',
							label: '请选择'
						}, {
							value: '普通人员',
							label: '普通人员'
						}, {
							value: '农技推广人员',
							label: '农技推广人员'
						}, {
							value: '科教管理人员',
							label: '科教管理人员'
						}, {
							value: '科研院校人员',
							label: '科研院校人员'
						},
						{
							value: '其他',
							label: '其他'
						}],
						city:'',
						identity:'',
						fileList: [{name: '', url: ''}]
			}
		},
		mounted: function() {
			this.getUsers();
		},
		methods: {
				//文件上传成功的钩子函数
			handleSuccess(res, file) {
			    this.$message({
			        type: 'info',
			        message: '图片上传成功',
			        duration: 6000
			    });
					var _this=this;
					_this.form.headUrl=res;
					alert(_this.form.headUrl);
					console.log(res);

					},
					     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
			toggleSelection() {
				this.$refs.multipleTable.clearSelection();
			},
			getUsers: function() {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: this.apiServer + '/api/user/getAllUser',
					params: {
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
						userName: this.form.userName,
						icon:this.form.headUrl
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						console.log(res.data.code);
						console.log(_this.form.email);
						console.log(_this.form.headUrl);
						_this.dialogFormVisibleAdd = false;
						alert(res.data.msg);
						alert(_this.form.headUrl);
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
						_this.form.id = res.data.data.id;
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
			},
			search(keyword) {
				var _this = this;

				_this.$http({
					method: 'get',
					url: this.apiServer + '/rear/user/searchUser',
					params: {
						currPage: 1,
						keyword: _this.keyword,
						pageSize: 10
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.users = res.data.data;
						alert('成功');
					} else {
						alert('数据加载失败！');
					}
				})
			},
			searchSel() {
				var _this = this;

				_this.$http({
					method: 'get',
					url: this.apiServer + '/rear/user/search',
					params: {
						currPage: 1,
						identity: _this.identity,
						city: _this.city,
						pageSize: 10
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.users = res.data.data;
						console.log(_this.city);
						console.log(_this.identity);
						
					} else {
						alert('数据加载失败！');
					}
				})
			}

		}
	}
</script>
