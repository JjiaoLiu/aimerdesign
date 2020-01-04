<template>
  <section class="edit_address" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>{{title}}</template>
      <template v-slot:right>
        <div class="p-l-15 h-100 p-r-15" @click="saveAddress" style="font-size: 16px">保存</div>
      </template>
    </NavHeader>
    <main class="main">
      <div class="bg-white m-b-10">
        <label for="user_name" class="list-item">收货人
          <input id="user_name" type="text" autofocus="on"
                 v-model="data.user_name"/></label>
        <label for="mobile" class="list-item">联系电话
          <input id="mobile" type="text" v-model="data.mobile"/></label>
        <label for="province_id" class="list-item">省市
          <el-select v-model="data.province_id" placeholder="请选择" id="province_id">
            <el-option
              v-for="item in optionsProvice"
              :key="item.id"
              :label="item.cn_name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <label for="city_id" class="list-item">城市
          <el-select v-model="data.city_id" placeholder="请选择" id="city_id">
            <el-option
              v-for="item in optionsCity"
              :key="item.id"
              :label="item.cn_name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <label for="county_id" class="list-item">区县
          <el-select v-model="data.county_id" placeholder="请选择" id="county_id">
            <el-option
              v-for="item in optionsCounty"
              :key="item.id"
              :label="item.cn_name"
              :value="item.id">
            </el-option>
          </el-select>
        </label>
        <div class="list-item">
          <textarea name="address" id="address" cols="30" rows="10" v-model="data.address"
                    placeholder="请填写详细地址"></textarea>
        </div>
      </div>
      <div class="bg-white m-b-10">
        <div class="list-item">设为默认
          <div class="mb-checkbox">
            <input type="checkbox" v-model="default_flag" id="default_flag"/>
            <label for="default_flag" class="checkbox"></label>
          </div>
        </div>
      </div>
    </main>
    <div class="action-section bg-white">
      <div class="button" @click="saveAddressToOrder">保存并使用</div>
    </div>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'
	import {getSign, checkMobile} from '@/utils'
	import {mapMutations} from 'vuex'

	export default {
		name: "EditAddress",
		metaInfo() {
			return {
				title: this.title
			}
		},
		data() {
			return {
				default_flag: false,
				loaded: true,
				data: {
					county_id: '',
					city_id: '',
					province_id: '',
				},
				// id: ''
				id: this.$route.query.id || '',
				optionsProvice: [],
				optionsCity: [],
				optionsCounty: [],
				title: this.$route.query.id ? '编辑地址' : '添加新地址',
				disabled: false,
				params: {}
			}
		},
		computed: {
			province() {
				let obj = this.optionsProvice.find(f => {
					return f.id === this.data.province_id
				});
				if (obj) {
					return obj.cn_name
				} else {
					return ''
				}
			},
			city() {
				let obj = this.optionsCity.find(f => {
					return f.id === this.data.city_id
				});
				if (obj) {
					return obj.cn_name
				} else {
					return ''
				}
			},
			county() {
				let obj = this.optionsCounty.find(f => {
					return f.id === this.data.county_id
				});
				if (obj) {
					return obj.cn_name
				} else {
					return ''
				}
			}
		},
		components: {
			NavHeader,
			Goback
		},
		created() {
			if (this.id) {
				this.getData()
			}
			this.initAddress()
		},
		methods: {
			...mapMutations([
				'setAddressStore'
			]),
			getData() {
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "personal_address_detail",
					"params": {id: this.id},
					"sign": getSign({id: this.id})
				}).then((res) => {
					this.data = res.data.data;
					if (this.data.default_flag === 'yes') {
						this.default_flag = true
					} else {
						this.default_flag = false
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			checkForm() {
				if (!this.data.user_name) {
					this.$message({
						type: 'warning',
						message: '请输入收件人'
					});
					return false
				}
				if (!this.data.mobile || !checkMobile(this.data.mobile)) {
					this.$message({
						type: 'warning',
						message: '请输入11位手机号码'
					});
					return false
				}
				if (!this.data.province_id || !this.data.city_id || !this.data.county_id) {
					this.$message({
						type: 'warning',
						message: '请选择地址'
					});
					return false
				}
				if (!this.data.address) {
					this.$message({
						type: 'warning',
						message: '请填写详细地址'
					});
					return false
				}
				return true
			},
			saveAddress() {
				if (this.checkForm()) {
					let params = {
						address: this.data.address,
						city_id: this.data.city_id,
						county_id: this.data.county_id,
						default_flag: this.default_flag ? 'yes' : 'no',
						id: this.id,
						mobile: this.data.mobile,
						province_id: this.data.province_id,
						user_name: this.data.user_name
					}
					this.$axios.post("/aimerdesign", {
						"partner": "aimerdesign",
						"version": "1.0",
						"timestamp": parseInt((new Date().getTime()) / 1000),
						"method": "personal_address_edit",
						"params": params,
						"sign": getSign(params)
					}).then((res) => {
						console.log('personal_address_edit', res)
						this.$message({
							type: 'success',
							message: `${this.id ? '修改' : '新增'}成功！`
						});
						this.$router.push(`/address_book`);
					}).catch((err) => {
						console.log('personal_address_edit', err)
						this.$message({
							type: 'error',
							message: `${this.id ? '修改' : '新增'}失败！`
						});
					})
				}
			},
			saveAddressToOrder() {
				if (this.checkForm()) {
					this.params = {
						address: this.data.address,
						city_id: this.data.city_id,
						county_id: this.data.county_id,
						default_flag: this.default_flag ? 'yes' : 'no',
						id: this.id,
						mobile: this.data.mobile,
						province_id: this.data.province_id,
						user_name: this.data.user_name
					}
					this.$axios.post("/aimerdesign", {
						"partner": "aimerdesign",
						"version": "1.0",
						"timestamp": parseInt((new Date().getTime()) / 1000),
						"method": "personal_address_edit",
						"params": this.params,
						"sign": getSign(this.params)
					}).then((res) => {
						console.log('personal_address_edit', res);
						this.$message({
							type: 'success',
							message: `${this.id ? '修改' : '新增'}成功！`
						});
						let data = Object.assign({}, this.data, {
							'province': this.province,
							'city': this.city,
							'county': this.county,
							'id': res.data.data
						});
						this.setAddressStore({checkout_address: data});
						this.$router.push(`/submit_order`);
					}).catch((err) => {
						console.log(err);
						this.$message({
							type: 'error',
							message: `${this.id ? '修改' : '新增'}失败！`
						});
					})
				}
			},
			initAddress(address_region) {
				let params = {};
				if (!this.data.province_id) {
					params.id = 0
				} else {
					params.id = address_region;
					params.province_id = this.data.province_id;
				}
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "address_region",
					"params": params,
					"sign": getSign(params)
				}).then((res) => {
					if (arguments.length === 0) {
						this.optionsProvice = res.data.data;
						return false
					}
					if (arguments[1] === 'city') {
						this.optionsCity = res.data.data
					}
					if (arguments[1] === 'county') {
						this.optionsCounty = res.data.data
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		},
		watch: {
			'data.province_id': {
				handler(N) {
					this.initAddress(N, 'city')
				},
				deep: true,
				immediate: true
			},
			'data.city_id': {
				handler(N) {
					this.initAddress(N, 'county')
				},
				deep: true,
				immediate: true
			},
		}
	}
</script>

<style scoped lang="scss">
  .list-item {
    padding: 15px 10px;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    justify-content: space-between;
    white-space: nowrap;
  }

  input, select, textarea {
    background: none;
    border: none;
    outline: none;
    font-size: 14px;
    text-align: right;
  }

  textarea {
    text-align: left;
    height: 90px;
    resize: none;
    width: 100%
  }

  .action-section {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 84px;
    display: flex;
    align-items: center;
    padding: 20px;
    border-top: 1px solid #e9e9e9;

    .button {
      width: 100%;
      height: 100%;
      line-height: 45px;
    }
  }
</style>
