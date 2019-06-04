<template>
	<div class="signin">
		<div class="form">
			<div class="avatar" style="margin-top: 20px;text-align: center;margin-bottom: 10px;">
				<!-- <img src="../assets/njy.png"  style="height: 70px;width: 70px;border-radius: 50%;"/> -->
			</div>
			<div class="input-box">
				<div class="input-phone">
					<!-- <img src="../assets/1_手机(1).png"/> -->
					<input type="text" v-model="userDTO.phoneNumber" placeholder="请输入手机号"/>
				</div>
				<div class="input-password" style="margin-top: 10px;">
					<!-- <img src="../assets/密码.png"/> -->
					<input type="password" v-model="userDTO.password" placeholder="请输入密码"/>
				</div>
			</div>
			<div v-if="!alertshow" style="width: 70%;margin: 0 auto;height: 16px;"></div>
			<div v-if="alertshow" style="width: 70%;margin: 0 auto;color: red;font-size: 12px;">*&nbsp;{{tishi}}&nbsp;*</div>
			<button type='primary' @click="signIn(userDTO)">登录</button>
			<div class="bottom">
				<div class="left" style="flex: 1 1 50%;">
					<a href="">忘记密码？</a>
				</div>
				<div class="right">
					<a href="./Signup">没有账号？现在注册</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui';
	export default {
		name: 'Signin',
		data() {
			return {
				userDTO:{
					phoneNumber:'',
					password:''
				},
				alertshow:false,
				tishi:'123'
			};
		},
		methods:{
			signIn: function(userDTO) {
				var _this=this;
				console.log(userDTO.phoneNumber)
				this.$http({
					method:'POST',
					url:'http://47.101.51.245:8888/api/user/signIn',
					data:{
						'phoneNumber':userDTO.phoneNumber,
						'password':userDTO.password
					},
					header:{
						'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						console.log(res.data.data);
						// alert('登录成功,欢迎使用农技耘');
						// swal("登录成功","欢迎使用农技耘","success")
						var user={
							userId:res.data.data.id,
							userName:res.data.data.userName,
							phoneNumber:res.data.data.phoneNumber,
							password:res.data.data.password,
							headUrl:res.data.data.headUrl,
							login:true,
						};
						var s = JSON.stringify(user);
						localStorage.setItem('login_key', s);
						Message({
							message:'登录成功，欢迎使用农技耘。',
							type:'success'
						});
						_this.$router.push('/home');
					}else{
						// alert('登录失败，'+res.data.msg)
						_this.alertshow=true
						_this.tishi=res.data.msg
						// sweetAlert("登录失败", res.data.msg, "error");
					}
				})
			},
			
		}
	}
</script>

