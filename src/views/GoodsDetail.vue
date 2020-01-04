<template>
  <section class="goods_detail" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <Goback to="/home"/>
      </template>
      <template v-slot:center>专属定制</template>
      <template v-slot:right>
        <DotNav/>
      </template>
    </NavHeader>
    <main class="main bg-white">
      <!--顶部banner-->
      <GoodLayersBanner v-if="activeDesign && activeDesign.layers" :diys="activeDesign.diys"
                        :banners="activeDesign.layers"/>
      <GoodBanner :banners="banners" v-else/>
      <div class="logo">
        <a :href="baseinfo.brand_logo_redirect"><i class="icon icon_logo resize"></i></a>
      </div>
      <div class="good-detail p-l-20 p-b-10 p-r-20">
        <div class="g-d-1" style="padding-right: 80px">
          <i class="icon icon_make m-r-5"></i>
          <!--<i class="icon icon_takeout m-r-5" v-if="baseinfo.zt_flag"></i>-->
          <!--<a class="active-color m-r-5" style="text-decoration: underline" href="#" @click="toMap"-->
          <!--v-if="baseinfo.zt_flag">查找门店</a>-->
          {{baseinfo.name}}
        </div>
      </div>
      <div class="goods_price">
        <el-row class="g-d-2" type="flex" justify="space-between" align="middle"
                style="height: 45px;padding: 0 10px 0 20px">
          <el-col>
            <span class="price m-r-5">¥{{baseinfo.price}}</span>
            <del class="market_price m-r-5" v-if="baseinfo.price !== baseinfo.market_price">
              ¥{{baseinfo.market_price}}
            </del>
          </el-col>
          <el-col style="text-align: right" v-show="baseinfo.price === baseinfo.market_price">
            <span class="score m-r-5" @click="showTipMask = true">可获积分：{{baseinfo.score}} <i class="icon icon_tip"></i></span>
          </el-col>
        </el-row>
        <!--<el-row class="g-d-2" v-if="baseinfo.plus_price_flag==='y'" type="flex" justify="space-between" align="middle"-->
        <!--style="height: 45px;background:rgba(242,237,228,1);padding: 0 10px 0 20px">-->
        <!--<el-col>-->
        <!--<span class="price m-r-5">¥{{baseinfo.plus_price}}</span>-->
        <!--<i class="icon icon_price_type2"></i>-->
        <!--</el-col>-->
        <!--<el-col style="text-align: right;">-->
        <!--<a v-if="baseinfo.open_plus_flag === 'no'" :href="baseinfo.plus_open_url" class="score m-r-5"-->
        <!--style="color: #BEA47A">立即开通 &nbsp;<i-->
        <!--class="icon icon_right"></i></a>-->
        <!--<a v-if="baseinfo.open_plus_flag === 'open_end'" :href="baseinfo.plus_open_url" class="score m-r-5"-->
        <!--style="color: #BEA47A">立即续费 &nbsp;<i-->
        <!--class="icon icon_right"></i></a>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row v-else class="g-d-2" type="flex" justify="space-between" align="middle"-->
        <!--style="height: 45px;background:rgba(242,237,228,1);padding: 0 10px 0 20px">-->
        <!--<el-col>-->
        <!--<i class="icon icon_price_type1"></i>-->
        <!--</el-col>-->
        <!--<el-col style="text-align: right;">-->
        <!--<a :href="baseinfo.plus_open_url" class="score m-r-5" style="color: #BEA47A">立即开通 &nbsp;<i-->
        <!--class="icon icon_right"></i></a>-->
        <!--</el-col>-->
        <!--</el-row>-->
      </div>
      <div class="good-select-size section p-15" @click="getGoodSize">
        <span><font class="m-r-5">选择</font> 尺码 {{activeSize.new_alias}}</span><i class="icon icon_right"></i>
      </div>
      <!--<div class="good-make-size section p-15">-->
      <!--<span><i class="icon icon_measure m-r-5"></i>帮我测量尺码</span><i class="icon icon_right"></i>-->
      <!--</div>-->
      <div class="good-more p-15 section">
        <span @click="changegoodsCollect">
          <i :class="['icon m-r-5 ',baseinfo.collect_flag ? 'icon_heart_fill' : 'icon_heart']">
          </i>加入收藏夹
        </span>
        <span class="line"></span>
        <span @click="toKfu"><i class="icon m-r-5 icon_online"></i>在线咨询</span>
        <!--<span class="line"></span>-->
        <!--<span><i class="icon m-r-5 icon_share"></i>分享</span>-->
      </div>
      <div class="good-time section p-15">
        <span>定制周期为15天</span><span><a href="tel:400-650-5299">如有疑问，请联系400-650-5299</a></span>
      </div>
      <div class="tabs section" id="tab">
        <el-tabs v-model="activeName" :stretch="true" type="card" @tab-click="handleTabsClick">
          <el-tab-pane label="推荐搭配" name="recommend">
            <div style="overflow-x: auto;width: 100%;margin-bottom: 25px" class="recommends-warp">
              <div class="recommends"
                   :style="{width:activeRecommendsIds.length > 6 ? Math.ceil(activeRecommendsIds.length /2) * 33.34 + '%':'100%'}"
              >
                <div
                  :class="['list',item.id === activeDesign.id ? 'active' : '',activeRecommendsIds.includes(item.id) ? '' : 'in-valid']"
                  v-for="item in recommends"
                  :key="item.id"
                  :style="{width:clientWidth+ 'px'}"
                  @click="changeActiveDesign(item)">
                  <img :src="item.list_img" class="img-response"/>
                  <div class="checked-mask"><i class="icon icon_circle_check"></i></div>
                  <div class="stock_count">缺货</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的设计" name="myDesigns">
            <div style="width: 100%;overflow-x: auto;margin-bottom: 25px" class="recommends-warp"
                 v-if="myDesignLists.length">
              <div class="recommends"
                   :style="{width:myDesignLists.length > 6 ? Math.ceil(myDesignLists.length /2) * 33.34 + '%':'100%'}"
              >
                <div
                  :class="['list',item.id === activeDesign.id ? 'active' : '',item.stock_count > 0 ? '' : 'in-valid']"
                  :style="{width:clientWidth+ 'px'}"
                  v-for="item in myDesignLists" :key="item.id" @click="changeActiveDesign(item)">
                  <img :src="item.layers[0].front_img_url" class="img-response"/>
                  <div class="p-absolute diys-layer" v-if="item.diys && item.diys.position" :style="{
                    'color': item.diys.customize_content ? item.diys.customize_content.content : '#515151',
                    'left': (item.diys.position.x_position - item.diys.position.width/2) * rate + 'px',
                    'top': (item.diys.position.y_position - item.diys.position.height/2) * rate  + 'px',
                    'width': item.diys.position.width * rate + 'px',
                    'height': item.diys.position.height * rate + 'px',
                    'backgroundImage': item.diys.content.img_url ? 'url(' + item.diys.content.img_url + ')' : 'url(' + item.diys.customize_img_url + ')'}"
                       v-html="markTxt(item.diys.customize_text,item.diys.customize_content && item.diys.customize_content.content)">
                    {{item.diys.customize_text}}
                  </div>
                  <div class="checked-mask"><i class="icon icon_circle_check"></i></div>
                  <div class="stock_count">缺货</div>
                </div>
              </div>
            </div>
            <div class="recommends-tip" v-else>选择下面的“添加我的设计”，开始定制</div>
          </el-tab-pane>
        </el-tabs>
        <div class="p-25">
          <div class="button lighten" @click="editDesign">编辑我的设计</div>
        </div>
        <div class="p-25 goods-checkout">
          <div class="max-stock">
            <span v-if="activeName === 'myDesigns' && activeDesign.stock_count > 0">
              数量：<span v-if="activeDesign.stock_count > 5">{{activeDesign.stock_count}}件</span>
              <span v-else class="warn">仅剩{{activeDesign.stock_count}}件</span>
            </span>
            <span v-if="activeName === 'recommend' && activeStockCount > 0">
              数量：<span v-if="activeStockCount > 5">{{activeStockCount}}件</span>
              <span v-else class="warn">仅剩{{activeStockCount}}件</span>
            </span>
          </div>
          <div class="goods-number">
            <div class="input-number">
              <el-input-number v-model="buyNumber" :min="1" :step="1" type="number"
                               @change="changebuyNumber"
                               :step-strictly="true"></el-input-number>
            </div>
            <div class="checkout-button">
              <div class="button" @click="checkoutView">立即购买</div>
            </div>
          </div>
        </div>
        <a :href="baseinfo.normal_url" class="normal_url">购买标准款</a>
        <div style="padding: 15px 25px;border-top:1px solid #e9e9e9" v-html="baseinfo.intro"></div>
      </div>
      <SectionSteps v-if="steps" :data="steps"/>
      <SectionMaterial v-if="material" :data="material"/>
      <SectionSystem v-if="system" :data="system"/>
      <Footer/>
    </main>
    <!--各种弹框-->
    <transition name="el-zoom-in-bottom">
      <div v-show="showSizeMask" class="select_size pop transition-box">
        <div class="pop-flex" @click.self="showSizeMask = false">
          <div class="pop-main bg-white">
            <div class="p-15">
              <div class="size-item">
                尺码
                <div class="right">
                  <!--<u>帮我测量</u>-->
                  <!--<span class="line">|</span>-->
                  <u @click="toSize">查看尺码</u>
                </div>
              </div>
              <div class="goods_size">
                <span v-for="item in goodsSize" :key="item.id"
                      @click="changeLocalSize(item)"
                      :class="['item m-r-5',item.enabled ? '':'disabled',localActiveSize.id === item.id ? 'active':'']"
                >{{item.new_alias}}</span>
              </div>
            </div>
            <div class="goods_submit">
              <div class="w-100 p-15">
                <div class="button" @click="submitSize">确定</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-zoom-in-bottom">
      <div v-show="showTipMask" @click.self="showTipMask = false" class="tip-box pop transition-box">
        <div class="popup_cont_box">
          <div class="popup_close" @click="showTipMask = false"><i class="icon icon_close"></i></div>
          <div class="popup_cont">
            <h1 class="title text_center">使用帮助</h1>
            <p style="color:red">温馨提示：当前显示积分为订单中可获得积分，如参与满减，使用优惠券，电子券，会员活动，生日月等情况，以实际收到为准，详细则请看积分政策，请您谅解！</p>
            <h2> 1、什么是积分？</h2>
            <p>会员不直接享受折扣，可在爱慕积分商城进行兑换，可兑换电子券、产品券、专属商品、会员活动入场券、爱慕女人会服务项目。会员等级越高获得的积分越多
            </p>
            <h2>2、适用品牌？</h2>
            <p>爱慕（含慕澜、爱慕定制、爱慕家品）、爱慕先生（（UM25/ X-SOCKS）、爱慕儿童（Aimer Baby/Aimer Junior）、爱慕运动、、纽格芙、心爱、宝迪威德、爱慕商城和生活馆中的LA
              CLOVER/爱美丽/皇锦/乎兮/BECHIC品牌等<br>温馨提示：不含独柜/专卖店中的兰卡文/BECHIC/爱美丽品牌和生活馆中未指定EMPEROR（皇锦）品牌</p>
            <h2>3、积分获取规则？</h2>
            <p>
              爱慕、慕澜、爱慕定制、爱慕先生、爱慕运动、纽格芙、心爱、宝迪威德、UM25、爱慕儿童、乎兮、爱慕家品及爱慕商城中的爱美丽：1元1分（积分系数为1）<br>
              爱慕商城及生活馆中的LA CLOVER /BECHIC： 2元1分（积分系数为1/2）<br>
              爱慕商城及生活馆中的皇锦（家居服及皇锦指定商品）：3元1分（积分系数为1/3）
            </p>
            <h2>4、积分到账时间？</h2>
            <p>线上：订单发货15日（含）后积分会发至会员账户<br>线下：消费当日积分实时到账</p>
            <h2>5、积分兑换电子券？</h2>
            <p>积分兑换只能兑1000的整数倍，单次兑换1000起兑，兑换成功后，积分不可退回，电子券兑换可以手工输入或者直接选择页面展示的额度</p>
            <h2>6、积分和电子券有效期？</h2>
            <p>1）积分和电子券有效期均延至下下自然年最后一天，到期清零，与会员等级升降无关，与积分和电子券产生的年度有关<br>如：一个会员2018年内任意时间通过消费获得的积分以及兑换的电子券，有效期均截至2020年12月31日；2019年期间产生的积分和电子券有效期为2020年12月31日，与2019年期间有过升级无关。<br>2）尊享卡积分有效期为2个自然年
            </p>
            <h2>7、电子券如果使用？</h2>
            <p>购买正价产品时可以抵用现金，电子券不可抵用运费</p>

            <h2>8、温馨提示</h2>
            <p> 爱慕会在法律允许的范围内对本规则的条款进行解释和修改，取消细则，修改等均已网站公布为准</p>
            <h2>9、其他</h2>
            <p>如果使用期间有任何疑问可以联系在线客服或400-650-5299</p>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
	import NavHeader from '@/components/NavHeader.vue'
	import DotNav from '@/components/DotNav.vue'
	import Goback from '@/components/Goback.vue'
	import GoodBanner from '@/components/GoodBanner.vue'
	import GoodLayersBanner from '@/components/GoodLayersBanner.vue'
	import SectionSteps from '@/components/SectionSteps.vue'
	import Footer from '@/components/Footer.vue'
	import SectionSystem from '@/components/SectionSystem.vue'
	import SectionMaterial from '@/components/SectionMaterial.vue'
	import {getSign, markTxt} from '@/utils'
	import debounce from "lodash/debounce";
	import {mapMutations, mapState} from 'vuex'

	const clientWidth = (window.innerWidth - 15) / 3;

	export default {
		name: "GoodsDetail",
		components: {
			NavHeader,
			DotNav,
			Goback,
			GoodBanner,
			GoodLayersBanner,
			SectionSteps,
			Footer,
			SectionSystem,
			SectionMaterial
		},
		metaInfo() {
			return {
				title: this.baseinfo ? this.baseinfo.name : '',
				titleTemplate: '%s_定制_价格_图片_质量_怎么样－爱慕官网_爱慕官方商城'
			}
		},
		data() {
			return {
				markTxt: markTxt,
				clientWidth: clientWidth,
				tabOption: {},
				showTipMask: false,
				buyNumber: 1,
				myDesigns: [],
				showSizeMask: false,// 弹框
				loaded: false,
				goodsSize: [],
				activeName: "recommend",
				localActiveSize: {},
				baseinfo: {},
				recommends: [],
				goods_detail: [],
				stock: 0,
				system: [],
				material: [],
				steps: [],
				canChangeCollect: true,
				rate: 0,
				activeRecommendsIdsFirst: '',
				maxStock: 1,
				activeStockCount: 0 //
			}
		},
		computed: {
			...mapState(['activeDesign', 'activeSize', 'myDesign_id', 'is_login', 'checkout', 'activebuyNumber', 'goods_id']),
			banners() {
				if (this.activeDesign && this.activeDesign.imgs) {
					return this.activeDesign.imgs.split(",");
				}
				if (this.baseinfo) {
					let arr = [];
					arr.push(this.baseinfo.list_img_url);
					return arr;
				}
				return []
			},
			activeRecommendsIds() {
				if (this.activeSize.recommend_info) {
					let ri = this.activeSize.recommend_info.filter(f => {
						return f.stock_count
					});
					let ri_ids = [];
					ri.forEach((f) => {
						ri_ids.push(f.recommend_id)
					});
					return ri_ids;
				}
				let ri_ids = [];
				this.recommends.forEach((f) => {
					ri_ids.push(f.id)
				});
				return ri_ids;
			},
			checkSize() {
				return this.activeSize.id ? true : false
			},
			myDesignLists() {
				let myDesignList = [];
				if (this.myDesigns instanceof Array && this.myDesigns.length) {
					this.myDesigns.forEach(x => {
							let myDesign = {};
							myDesign.id = x.id;
							myDesign.diys = x.diys[0];
							myDesign.stock_count = x.stock_count; // 列表图
							x.items.forEach(f => {
									// 初期 layers只有一个
									myDesign.list_img_url = f.img_url; // 列表图
									let obj = {};
									if (f.selected_fabric.front_img_url) {
										obj.front_img_url = f.selected_fabric.front_img_url
									}
									if (f.selected_fabric.back_img_url) {
										obj.back_img_url = f.selected_fabric.back_img_url
									}
									if (f.selected_fabric.left_img_url) {
										obj.left_img_url = f.selected_fabric.left_img_url
									}
									if (f.selected_fabric.right_img_url) {
										obj.right_img_url = f.selected_fabric.right_img_url
									}
									myDesign.layers = [obj];
								}
							);
							myDesignList.push(myDesign);
						}
					);
					return myDesignList
				}
				return []
			},
		},
		created() {
			if (!this.$route.query.goods_id) {
				this.$router.push('/home');
				return false
			}
			this.getData();
			if (this.myDesign_id || this.activeDesign.id && this.activeDesign.id.length < 5) {
				this.activeName = 'myDesigns';
				this.getMyDesigns();
			}
			if (this.activeSize.id) {
				this.localActiveSize = Object.assign({}, this.activeSize);
			}
			if (this.activebuyNumber) {
				this.buyNumber = this.activebuyNumber
			}
		},
		mounted() {
			// let t = setInterval(() => {
			setTimeout(() => {
				if (this.activeDesign.id && this.loaded)
					document.getElementById("tab").scrollIntoView();
			}, 1500)
			// }, 1000);

		},
		methods: {
			...mapMutations([
				'setActiveDesignStore',
				'setActiveSizeStore',
				'setCheckoutStore',
				'setmyDesign_idStore',
				'setGoodsIdStore',
				'setIsLogin',
				'setActivebuyNumber'
			]),
			changeLocalSize(item) {
				if (!item.enabled) {
					return false
				}
				this.localActiveSize = item;
				this.buyNumber = 1;
			},
			toSize() {
				window.open(this.baseinfo.size_url)
			},
			closeSizeMask() {
				this.showSizeMask = false;
			},
			submitSize() {
				this.showSizeMask = false;
				this.buyNumber = 1;
				this.setActiveDesignStore({activeDesign: {}});
				this.setActiveSizeStore({activeSize: this.localActiveSize});
			},
			checkoutView() {
				if (!this.activeDesign.id) {
					this.$toast('请先选择要购买的商品');
					return false
				}
				let params = {};
				if (this.activeDesign.id.length >= 14) {
					params = {
						address_id: "",
						customer_memo: "",
						goods_id: this.goods_id,
						number: this.buyNumber,
						recommend_id: this.activeDesign.id,
						size_value_id: this.activeSize.id,
						user_design_id: ''
					}
				}
				if (this.activeDesign.id.length < 14) {
					params = {
						address_id: "",
						customer_memo: "",
						goods_id: this.goods_id,
						number: this.buyNumber,
						recommend_id: '',
						size_value_id: this.activeSize.id,
						user_design_id: this.activeDesign.id
					}
				}
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "checkout_view",
					"params": params,
					"sign": getSign(params)
				}).then((res) => {
					this.setCheckoutStore({checkout: res.data.data});
					this.$router.push('/submit_order')
				}).catch((err) => {
					console.log("checkout_view", err)
				})
			},
			getData() {
				this.setGoodsIdStore({goods_id: this.$route.query.goods_id});
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "goods_detail",
					"params": {"id": this.goods_id},
					"sign": getSign({"id": this.goods_id})
				}).then((res) => {
					this.baseinfo = res.data.data.baseinfo;
					this.recommends = res.data.data.recommends;
					this.steps = res.data.data.steps;
					this.material = res.data.data.material;
					this.system = res.data.data.system;
					this.setIsLogin({is_login: res.data.data.is_login});
					this.loaded = true;
				}).catch((err) => {
					console.log("goods_detail", err)
				})
			},
			getGoodSize() {//获取商品尺码信息的接口
				if (!this.is_login) {
					window.location.href = process.env.VUE_APP_LOGIN + "/passport/login?redirect_to=" + encodeURIComponent(window.location.href);
					return false
				}
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "goods_size",
					"params": {"goods_id": this.goods_id},
					"sign": getSign({"goods_id": this.goods_id})
				}).then((res) => {
					this.goodsSize = res.data.data;
					this.showSizeMask = true;
				}).catch((err) => {
					console.log("goodsSize:", err)
				})
			},
			changegoodsCollect() {
				if (!this.canChangeCollect) {
					return false
				}
				this.canChangeCollect = false;
				if (this.baseinfo.collect_flag) {
					this.goodsCancelCollect()
				} else {
					this.goodsCollect()
				}
			},
			goodsCancelCollect() {//取消收藏的接口
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "goods_cancel_collect",
					"params": {"goods_id": this.goods_id},
					"sign": getSign({"goods_id": this.goods_id})
				}).then((res) => {
					this.$set(this.baseinfo, 'collect_flag', !this.baseinfo.collect_flag);
					this.$toast(res.data.data, 'success');
					setTimeout(() => {
						this.canChangeCollect = true;
					}, 3000);
				}).catch((err) => {
					console.log('goods_cancel_collect', err);
					setTimeout(() => {
						this.canChangeCollect = true;
					}, 3000);
				})
			},
			goodsCollect() {//取消收藏的接口
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "goods_collect",
					"params": {"goods_id": this.goods_id},
					"sign": getSign({"goods_id": this.goods_id})
				}).then((res) => {
					this.$set(this.baseinfo, 'collect_flag', !this.baseinfo.collect_flag);
					this.$toast(res.data.data, 'success');
					setTimeout(() => {
						this.canChangeCollect = true;
					}, 3000);
				}).catch(() => {
					setTimeout(() => {
						this.canChangeCollect = true;
					}, 3000);
				})
			},
			getMyDesigns() {//获取我的设计的接口
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "my_designs",
					"params": {"goods_id": this.goods_id, "size_value_id": this.activeSize.id},
					"sign": getSign({"goods_id": this.goods_id, "size_value_id": this.activeSize.id})
				}).then((res) => {
					this.myDesigns = res.data.data;
				}).catch((err) => {
					// console.log('my_designs', err)
				})
			},
			handleTabsClick() {
				if (this.activeName === 'recommend') {
					return false
				}
				if (!this.activeSize.id) {
					this.getGoodSize();
					return false
				}
				if (this.activeName === 'myDesigns' && this.activeSize.id) {
					this.buyNumber = 1;
					this.getMyDesigns();
					return false
				}
			},
			changeActiveDesign(item) {
				if (!this.is_login) {
					window.location.href = process.env.VUE_APP_LOGIN+"/passport/login?redirect_to=" + encodeURIComponent(window.location.href);
					return false
				}
				if (this.activeName === 'myDesigns' && item.stock_count === 0) {
					return false;
				}
				if (this.activeName === 'recommend' && !this.activeRecommendsIds.includes(item.id)) {
					return false
				}
				if (this.checkSize) {
					this.buyNumber = 1;
					this.setActiveDesignStore({activeDesign: item});
					return false
				}
				this.getGoodSize()
			},
			editDesign() {
				if (this.checkSize) {
					if (!this.activeRecommendsIdsFirst) {
						this.$toast('此定制商品无货');
						return false;
					}
					let recommend_id = '';
					let design_id = '';
					if (this.activeName === 'recommend') {
						if (this.activeDesign.id && this.activeDesign.id.length >= 14) {
							recommend_id = this.activeDesign.id
						} else {
							this.$toast('请选择要编辑的设计');
							return false
						}
					}
					if (this.activeName === 'myDesigns') {
						if (this.myDesignLists.length) {
							if (this.activeDesign.id && this.activeDesign.id.length < 14) {
								design_id = this.activeDesign.id
							} else {
								this.$toast('请选择要编辑的设计');
								return false
							}
						} else {
							recommend_id = this.activeRecommendsIdsFirst
						}
					}
					this.$router.push({
						path: '/goods_order',
						query: {
							'goods_id': this.goods_id,
							'recommend_id': recommend_id,
							'design_id': design_id,
							'size_value_id': this.activeSize.id,
						}
					})
					;
				}
				if (!this.checkSize) {
					this.getGoodSize();
				}
				return false
			},
			changebuyNumber: debounce(function (e) {
				if (!this.checkSize) {
					this.getGoodSize();
					return false;
				}
				if (!this.activeDesign.id) {
					this.$toast('请先选择要购买的商品');
					this.buyNumber = 1;
					return false
				}
				if (this.activeName === 'recommend' && e <= this.activeStockCount) {
					this.buyNumber = e;
					return false
				}
				if (this.activeName === 'myDesigns' && e <= this.activeDesign.stock_count) {
					this.buyNumber = e;
					return false
				}
				this.$toast('库存不足，若想批量定制请联系客服！');
				this.buyNumber = this.maxStock;
			}, 300),
			toMap() {
				this.$router.push('/zt_map?goods_id=' + this.form.id)
			},
			toKfu() {
				window.open("http://m.aimer.com.cn/index/talker?goodid=" + this.form.id);
			},
		},
		watch: {
			'activeSize.id'(N) {
				if (!N) {
					return false
				}
				if (this.activeName === 'myDesigns') {
					this.getMyDesigns();
					return false
				}
			},
			myDesignLists() {
				if (this.myDesignLists && this.myDesignLists.length && this.myDesignLists[0] && this.myDesignLists[0].layers && this.myDesignLists[0].layers[0].front_img_url) {
					var img = new Image();
					img.src = this.myDesignLists[0].layers[0].front_img_url;
					img.onload = () => {
						this.rate = ((clientWidth) / img.width).toFixed(4)
					};
					if (this.myDesign_id) {
						let myDesign = this.myDesignLists.find((f) => {
							return f.id === this.myDesign_id
						});
						if (myDesign) {
							this.setActiveDesignStore({activeDesign: myDesign});
							this.setmyDesign_idStore({myDesign_id: ''});
							this.activeName = 'myDesigns'
						}
					}
				}
			},
			activeRecommendsIds: {
				immediate: true,
				deep: true,
				handler(N) {
					this.activeRecommendsIdsFirst = N[0];
				}
			},
			activeDesign: {
				deep: true,
				immediate: true,
				handler(N) {
					this.buyNumber = 1;
					if (this.activeName === 'recommend') {
						if (N.id) {
							let id = this.activeSize.recommend_info.find(f => {
								return f.recommend_id === this.activeDesign.id;
							});
							if (id) {
								this.activeStockCount = id.stock_count;
							} else {
								this.activeStockCount = 0
							}
						} else {
							this.activeStockCount = 0
						}
					} else {
						this.activeStockCount = 0
					}
				}
			},
			buyNumber: {
				handler(N) {
					if (N !== this.activebuyNumber) {
						this.setActivebuyNumber({activebuyNumber: this.buyNumber});
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 84px;

    .icon_logo.resize {
      width: 122px;
      height: 44px;
      background-size: 100%;
    }
  }

  .goods_price {
    font-size: 14px;
    line-height: 18px;

    .price {
      font-size: 24px;
      line-height: 28px;
    }

    .market_price {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
    }
  }

  .good-detail {
    font-size: 14px;
    line-height: 18px;

    .price {
      font-size: 24px;
      line-height: 28px;
    }

    .market_price {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
    }
  }

  .good-select-size, .good-make-size, .good-time {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
  }

  .good-more {
    height: 50px;
    padding: 15px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .line {
      width: 1px;
      height: 100%;
      background-color: #D8D8D8;
    }
  }

  .section {
    border-top: 1px solid rgba(233, 233, 233, 1);
  }

  .recommends {
    display: flex;
    flex-wrap: wrap;
    /*padding-bottom: 25px;*/

    .list {
      background-color: #ffffff;
      padding: 3px 2.5px;
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: center;*/
      position: relative;
      left: 0;
      top: 0;
      cursor: pointer;

      &.active {
        .checked-mask {
          display: block;
        }
      }

      &.in-valid {
        background-color: #FFFFFF;
        cursor: text;
        opacity: 0.8;

        .stock_count {
          display: flex;
          font-size: 14px;
        }
      }
    }
  }

  .recommends-tip {
    padding: 20px 15px;
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    line-height: 14px;
    margin-bottom: 30px;
  }

  .button {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 3px;
    /*margin-bottom: 20px;*/
  }

  .normal_url {
    font-size: 16px;
    line-height: 20px;
    padding: 0 0 20px 0;
    text-align: center;
    display: block;
    text-decoration: underline;
    width: 100%;
  }

  .pop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 7;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);

    .pop-flex {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
    }

    .pop-main {
      width: 100%;
    }

    .goods_size {
      font-size: 12px;
      line-height: 30px;
      display: flex;
      padding-top: 12px;
      padding-bottom: 14px;
      flex-wrap: wrap;

      .item {
        width: 83px;
        height: 30px;
        text-align: center;
        background-color: rgba(250, 250, 250, 1);
        border-radius: 2px;
        margin-bottom: 5px;
        transition: background-color .3s, color .3s;

        &.disabled {
          background-color: rgba(250, 250, 250, 1);
          color: rgba(204, 204, 204, 1);
        }

        &.active {
          background-color: rgba(190, 164, 122, 1);
          color: #ffffff;
        }
      }
    }

    .size-item {
      padding-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;

      .line {
        display: inline-block;
        vertical-align: middle;
        margin: 0 15px;
      }
    }

    .goods_submit {
      padding-top: 20px;
      border-radius: 3px;
      color: rgba(255, 255, 255, 1);

      .button {
        line-height: 60px;
        height: 60px;
        font-size: 16px;
      }
    }
  }

  .goods-checkout {
    position: relative;
    padding-top: 40px;
    padding-bottom: 30px;
    .max-stock {
      position: absolute;
      left: 0;
      top: 0;
      padding-top: 18px;
      padding-bottom: 5px;
      padding-left: 25px;
      font-size: 12px;
      font-family: STHeitiSC-Light;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
      .warn {
        color: #ff7575;
      }
    }
    .goods-number {
      display: flex;
      align-items: center;
    }
    .checkout-button {
      padding-left: 10px;
      flex: 1;
      .button {
        line-height: 50px;
        height: 50px;
        font-size: 16px;
      }
    }
  }

  .popup_cont_box {
    background: #fff;
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 8% 2% 0% 5%;
    height: 60%;

    h1, p {
      color: #000000;
      margin-bottom: 10px;
      font-family: SimHei, 黑体, "Microsoft YaHei", "微软雅黑";
      letter-spacing: 1px;
    }
    p {
      line-height: 1.8;
    }
    h1 {
      font-size: 15px;
    }
    h2 {
      font-size: 12px;
      font-family: SimHei, 黑体, "Microsoft YaHei", "微软雅黑";
      letter-spacing: 1px;
      color: #000000;
    }
    p {
      font-size: 12px;
    }
  }

  .popup_cont {
    width: 100%;
    min-width: 230px;
    margin-top: 5px;
    height: 98%;
    overflow-y: scroll;
    padding-right: 2%;
  }

  .popup_close {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .checked-mask {
    display: none;
    background: rgba(0, 0, 0, .05);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 26px;
      height: 26px;
    }
  }

  .stock_count {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    justify-content: center;
    display: none;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    line-height: 30px;
  }

  .diys-layer {
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center center;
    img {
      height: 100%;
    }
  }

  /*.recommends-warp::-webkit-scrollbar-track-piece {*/
  /*background-color: rgba(0, 0, 0, 0);*/
  /*border-left: 1px solid rgba(0, 0, 0, 0);*/
  /*}*/
  /**/
  .recommends-warp {
    overflow-scrolling: auto;
    -webkit-overflow-scrolling: auto;
  }

  .recommends-warp::-webkit-scrollbar {
    height: 3px;
    border-radius: 20px;

  }

  .recommends-warp::-webkit-scrollbar-thumb {
    background-color: #999999;
    background-clip: padding-box;
    border-radius: 20px;
    min-height: 28px;
  }

</style>
