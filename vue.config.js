module.exports = {
	devServer: {
		proxy: {
			'/aimerdesign': {
				target: "http://mobiletest.aimer.com.cn:8888/aimerdesign",
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/aimerdesign": ''
				}
			},
			'/aimerdesignimgupload': {
				target: "http://mtest.aimer.com.cn:8888/goods/imgupload",
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/aimerdesignimgupload": ''
				}
			}
		}
	}
};
