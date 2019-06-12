<template>
	<div>
		<!-- <el-upload
	  class="avatar-uploader"
	  action= "http://localhost:8888/api/img/insetImg"
	  :show-file-list="false"
	  :on-success="handleAvatarSuccess"
	  :before-upload="beforeAvatarUpload">
	  <img v-if="imageUrl" :src="imageUrl" class="avatar">
	  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload> -->
		用户id
		<el-input v-model="id" autocomplete="off"></el-input>
		内容
		<el-input v-model="content" autocomplete="off"></el-input>
		<el-upload class="upload-demo" action="http://localhost:8888/api/img/insetImg" :on-preview="handlePreview" :on-remove="handleRemove"
		 :before-remove="beforeRemove" :on-success="handleSuccess" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
		<el-button size="small" type="primary" @click="test()">遍历</el-button>
		<el-button size="small" type="primary" @click="commit()">发布交流</el-button>
		<!--  <el-upload
               ref="upload"
               action="http://localhost:8888/api/img/insetImg"
               name="picture"
               list-type="picture-card"
               :limit="1"
               :file-list="fileList"
               :on-exceed="onExceed"
               :before-upload="beforeUpload"
               :on-preview="handlePreview"
               :on-success="handleSuccess"
               :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog> -->
		<!-- <el-input v-model="imageUrl" autocomplete="off"></el-input> -->
	</div>
</template>



<script>
	export default {
		data() {
			return {
				imageUrl: '',
				//文件上传的参数
				dialogImageUrl: '',
				dialogVisible: false,
				//图片列表（用于在上传组件中回显图片）
				fileList: [{
					name: '',
					url: ''
				}],
				imgs: [],
				content: '',
				id: ''
				// fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

			};
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//文件上传成功的钩子函数
			handleSuccess(res, file) {
				this.$message({
					type: 'info',
					message: '图片上传成功',
					duration: 6000
				});

				console.log(res.data);
				console.log(res.code);
				console.log(res.total);
				this.imageUrl = res.data;
				this.imgs.push(res.data);

				// console.log(file);
				// alert(file);
				// alert(res);

				// this.editor.picture = file.response; //将返回的文件储存路径赋值picture字段
				// console.log(file.response)
			},
			test() {
				const len = this.imgs.length;
				for (let i = 0; i < len; i++) {
					console.log(this.imgs[i]);
				}
			},
			commit() {
				var _this = this;
				_this.$http({
					method: 'post',
					// url: this.apiServer + '/api/exchange/add?content='+this.content+'&userId='+this.id+'&imgs='+JSON.stringify(this.imgs),
					url: this.apiServer + '/api/exchange/add',
                       data:{
						   content:this.content,
						   userId:this.id,
						   imgs:JSON.stringify(this.imgs)
					   }
					,
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						alert("成功");
					} else {
						alert('数据加载失败！');
					}
				})
			},
			//删除文件之前的钩子函数
			// handleRemove(file, fileList) {
			//     this.$message({
			//         type: 'info',
			//         message: '已删除原有图片',
			//         duration: 6000
			//     });
			// },
			//点击列表中已上传的文件事的钩子函数
			// handlePreview(file) {
			// },
			//上传的文件个数超出设定时触发的函数
			onExceed(files, fileList) {
				this.$message({
					type: 'info',
					message: '最多只能上传一个图片',
					duration: 6000
				});
			},
			//文件上传前的前的钩子函数
			//参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
			beforeUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isGIF = file.type === 'image/gif';
				const isPNG = file.type === 'image/png';
				const isBMP = file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG && !isGIF && !isPNG && !isBMP) {
					this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
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
			}
		}
	}
</script>
