<template>
  <section class="zt_map">
    <NavHeader>
      <template v-slot:left>
        <Goback :to="'/goods_detail?goods_id='+ $store.state.goods_id"/>
      </template>
      <template v-slot:center>自提门店</template>
      <template v-slot:right>
        <DotNav/>
      </template>
    </NavHeader>
    <main class="main bg-white">
      <div class="select-row">
        <el-row :gutter="20" type="flex">
          <el-col :span="8" :gutter="20">
            <el-select class="w-100" v-model="parent_id" placeholder="所在省">
              <el-option
                v-for="item in optionsProvice"
                :key="item.id"
                :label="item.cn_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select class="w-100" v-model="city_id" placeholder="所在市">
              <el-option
                v-for="item in optionsCity"
                :key="item.id"
                :label="item.cn_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select class="w-100" v-model="county_id" placeholder="所在区">
              <el-option
                v-for="item in optionsCounty"
                :key="item.id"
                :label="item.cn_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
        <bm-point-collection shape="BMAP_POINT_SHAPE_WATERDROP" :points="data">
        </bm-point-collection>
      </baidu-map>
      <p class="map-tips">温馨提示：此页面仅展示该商品当前库存，为避免缺货情况，请您及时下单购买</p>
      <el-radio-group v-model="active_id" class="adr-list">
        <el-radio :label="option.id" v-for="(option,index) in data" class="radio" :key="index">
          <p class="p1">
            <span class="store_name">{{option.store_name}}</span>
            <span class="count">库存{{option.count}}件</span>
          </p>
          <p>地址：{{option.store_address}}</p>
          <p>联系电话：<a :href="'tel:'+option.store_tel">{{option.store_tel}}</a></p>
          <p>营业时间：{{option.business_hours}}</p>
        </el-radio>
      </el-radio-group>
    </main>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'
	import {getSign} from "../utils";
	import DotNav from '@/components/DotNav.vue'

	const data = [{
		"id": "798",
		"store_code": "ZH010069",
		"store_name": "北京汉光百货店",
		"store_address": "北京市西城区西单北大街176号汉光百货4层爱慕专柜",
		"store_tel": "010-66058618",
		"store_gpslng": "116.37438",
		"store_gpslat": "39.90947",
		"business_hours": "10:00-22:00",
		"count": 7
	}, {
		"id": "1398",
		"store_code": "ZH370001",
		"store_name": "公司总部展示厅",
		"store_address": "北京市朝阳区望京高新技术产业开发区爱慕大厦",
		"store_tel": "010-84776002",
		"store_gpslng": "116.46804",
		"store_gpslat": "40.01311",
		"business_hours": "10:00-22:00",
		"count": 10
	}];

	export default {
		name: "ZTmap",
		metaInfo() {
			return {
				title: '自提门店'
			}
		},
		data() {
			return {
				data: [],
				zoom: 15,
				goods_id: this.$route.query.goods_id,
				keyword: '北京市东城区',
				optionsProvice: [],
				optionsCity: [],
				optionsCounty: [],
				active_id: '',
				county_id: '',
				city_id: '',
				parent_id: ''
			}
		},
		computed: {
			center() {
				if (this.active_id) {
					let add = this.data.find(f => {
						return f.id === this.active_id
					});
					return {
						lng: add.lng,
						lat: add.lat
					}
				}
				if (this.data.length) {
					return {lng: this.data[0].lng, lat: this.data[0].lat}
				}
				return {lng: 0, lat: 0}
			}
		},
		components: {
			NavHeader, Goback, DotNav
		},
		created() {
			this.initAddress()
		},
		methods: {
			handler() {
				this.getData();
			},
			getData() {
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "goods_stores",
					"params": {goods_id: this.goods_id, keyword: this.keyword},
					"sign": getSign({goods_id: this.goods_id, keyword: this.keyword})
				}).then((res) => {
					// console.log(res)
					if (!res.data.data.length) {
						this.data = data;
					} else {
						this.data = res.data.data;
					}
					//匹配出所有的坐标
					this.data.forEach(f => {
						f.lng = +f.store_gpslng;
						f.lat = +f.store_gpslat;
					});
				}).catch((err) => {
					console.log(err)
				})
			},
			initAddress(address_region) {
				let params = {};
				if (!this.parent_id) {
					params.id = 0
				} else {
					params.id = address_region;
					params.parent_id = this.parent_id;
				}
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "address_region",
					"params": params,
					"sign": getSign(params)
				}).then((res) => {
					if (!this.parent_id) {
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
			keyword() {
				this.getData()
			},
			parent_id: {
				handler(N) {
					this.initAddress(N, 'city')
				}
			},
			city_id: {
				handler(N) {
					this.initAddress(N, 'county')
				}
			},
			county_id: {
				handler(N) {
					this.keyword = (this.optionsCounty.find(f => {
						return f.id === N
					})).cn_name;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
  .select-row {
    padding: 0.1px 15px;
    margin: 10px 0;
  }

  .bm-view {
    width: 100%;
    height: 249px;
  }

  .map-tips {
    padding: 10px 15px;
    color: #bea47a;
    font-size: 12px;
    line-height: 20px;
  }

  .adr-list {
    padding: 15px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    .radio {
      padding: 10px 0;
    }
    .p1 {
      display: flex;
      justify-content: space-between;
    }
    .store_name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .store_name {
      font-size: 14px;
      color: #BEA47A;
      line-height: 14px;
      padding-bottom: 6px;
    }
    p {
      line-height: 21px;
      font-weight: normal;
    }
  }
</style>
