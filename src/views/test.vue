<template>
  <div>
    <input type="file" @change="upload"/>
  </div>
</template>

<script>
	import {getSign} from '@/utils'

	export default {
		name: "test",
		data() {
			return {}
		},
		methods: {
			upload(target) {
				var files = target.target.files[0];
				// const isJPG = file[0].type === 'image/jpeg';
				// const isLt2M = file[0].size / 1024 / 1024 < 2;
				//
				// if (!isJPG) {
				//     this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				// if (!isLt2M) {
				//     this.$message.error('上传头像图片大小不能超过 2MB!');
				// }
				var formData = new FormData();
				formData.append("file", files);
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "design_upload_img",
					"params": formData,
					"sign": getSign()
				}).then(() => {
					// console.log("res上传", res)
				}).catch((err) => {
					console.log(err)
				})
				//return isJPG && isLt2M;
			}
		}
	}
</script>

<style scoped>

</style>
