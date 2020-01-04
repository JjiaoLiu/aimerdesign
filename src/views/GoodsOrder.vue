<template>
  <section class="size" v-if="loaded" v-loading="loading" element-loading-text="保存设计中">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>{{title}}</template>
    </NavHeader>
    <main class="main" style="background: #F7F7F7">
      <div v-if="showFile" class="upload">
        <div>
          <label for="file" class="upload-file"
                 v-loading="loading"
                 element-loading-background="rgba(255, 255, 255, 1)"
                 :style="{backgroundImage:'url('+ activeDiys.customize_img_url + ')',backgroundColor:activeDiys.customize_img_url? '#000000':'#ffffff'}">
            <input type="file" id="file" @change="upload" style="display: none"/>
            <i class="icon icon_add" v-if="!activeDiys.customize_img_url"></i>
          </label>
        </div>
        <div>
          <label for="file" class="upload-button">从手机相册上传/修改</label>
        </div>
        <p class="upload-tip">*上传文件大小：1MB-10MB</p>
      </div>
      <div v-if="!showFile">
        <div style="position: relative">
          <div v-if="showText">
            <div class="diys-text">
              <input type="text" ref="customize_content" class="input-txt" v-model="activeDiys.customize_content"
                     :maxlength="activeDiys.max_length"
                     @keyup="checkInput" :style="{color:activeOption.content}">
              <div class="tip" ref="tip">*请输入不超过{{activeDiys.max_length}}个字符的数字与大写字母</div>
            </div>
          </div>
          <swiper ref="swiperLayers" class="swiper-layers" @click="showzoom = true" :options="layersOptions">
            <swiper-slide v-if="layers[0].front_img_url" id="node">
              <!--在正面添加diys-->
              <!--在正面添加diys-->
              <div style="position: relative;left: 0;top: 0">
                <img :src="option.front_img_url" class="img-response" v-for="option in layers"
                     :key="option.id"/>
                <div class="p-absolute" v-for="item in dataDiysLayer" :key="item.diy_id"
                     :style="{left:(item.x_position - item.width/2) * rate+'px',top:(item.y_position - item.height/2) * rate + 'px',width:item.width *rate + 'px',height:item.height * rate + 'px',verticalAlign:'top'}"
                >
                  <div class="diys-layer w-100 h-100" v-if="item.customize_content" v-html="markTxt(item)">
                    {{item.customize_content}}
                  </div>
                  <el-image
                    v-if="item.customize_img_url"
                    style="width: 100%; height: 100%"
                    :src="item.customize_img_url"
                    fit="contain"></el-image>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide v-if="layers[0].left_img_url">
              <img :src="option.left_img_url" class="img-response" v-for="option in layers"
                   :key="option.id"/>
            </swiper-slide>
            <swiper-slide v-if="layers[0].right_img_url">
              <img :src="option.right_img_url" class="img-response" v-for="option in layers"
                   :key="option.id"/>
            </swiper-slide>
            <swiper-slide v-if="layers[0].back_img_url">
              <img :src="option.back_img_url" class="img-response" v-for="option in layers"
                   :key="option.id"/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <transition name="el-fade-in-linear" v-if="showzoom">
            <div class="fullscreen">
              <swiper ref="swiperLayerszoom" class="goods_banner_fullscreen" :options="layerszoomOptions"
                      @click="showzoom = false;scale = 1">
                <swiper-slide v-if="layers[0].front_img_url">
                  <div class="swiper-zoom-container">
                    <!--在正面添加diys-->
                    <div style="position: relative;left: 0;top: 0">
                      <img :src="option.front_img_url" class="img-response" v-for="option in layers"
                           :key="option.id"/>
                      <div class="p-absolute" v-for="item in dataDiysLayer" :key="item.diy_id"
                           :style="{left:(item.x_position - item.width/2) * rate+'px',top:(item.y_position - item.height/2) * rate + 'px',width:item.width *rate + 'px',height:item.height * rate + 'px'}"
                      >
                        <div class="diys-layer w-100 h-100" v-if="item.customize_content" v-html="markTxt(item)">
                          {{item.customize_content}}
                        </div>
                        <el-image
                          v-if="item.customize_img_url"
                          style="width: 100%; height: 100%"
                          :src="item.customize_img_url"
                          fit="contain"></el-image>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <swiper-slide v-if="layers[0].left_img_url">
                  <div class="swiper-zoom-container">
                    <img :src="option.left_img_url" class="img-response" v-for="option in layers"
                         :key="option.id"/>
                  </div>
                </swiper-slide>
                <swiper-slide v-if="layers[0].right_img_url">
                  <div class="swiper-zoom-container">
                    <img :src="option.right_img_url" class="img-response" v-for="option in layers"
                         :key="option.id"/>
                  </div>
                </swiper-slide>
                <swiper-slide v-if="layers[0].back_img_url">
                  <div class="swiper-zoom-container">
                    <img :src="option.back_img_url" class="img-response" v-for="option in layers"
                         :key="option.id"/>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
          </transition>
        </div>
        <!--****************************-->
        <div class="options">
          <swiper ref="swiper" :options="swiperOptions" class="swiper-options">
            <swiper-slide v-for="(option) in options" :key="option.id"
                          class="option">
              <input type="radio" :id="option.id" name="options" :disabled="fabrics && option.stock_count <= 0"
                     :value="option.id"
                     :checked="topLevel ? false : option.selected"
                     @change="changeActiveOption(option)"/>
              <label :for="option.id">
                <img :src="option.img_url" :style="{'width':fabrics || isPositiosLevel ||topLevel ? '90px' :'70px'}"/>
                <span class="name">{{option.name}}</span>
                <div v-if="fabrics && option.stock_count <= 0" class="stock_count">
                  缺货
                </div>
                <div v-if="!(fabrics && option.stock_count <= 0)">
                  <div class="checked-mask"><i class="icon icon_circle_check"></i></div>
                </div>
              </label>
            </swiper-slide>
            <swiper-slide v-if="diys_option_show && activeDiys.customize_type === 1" class="option">
              <input type="radio" id="customize_flag_1" name="options"
                     :checked="userDiys || activeDiys.customize_content"
                     @click="changeActiveOptionToDiys"/>
              <label for="customize_flag_1">
                <i class="icon icon_diys_edit d-block"></i>
                <span class="name">{{activeDiys.customize_content ? activeDiys.customize_content : '自定义'}}</span>
                <div class="checked-mask" v-if="userDiys"><i class="icon icon_circle_check"></i></div>
              </label>
            </swiper-slide>
            <swiper-slide v-if="diys_option_show && activeDiys.customize_type === 2" class="option">
              <input type="radio" id="customize_flag_2" name="options"
                     :checked="userDiys || activeDiys.customize_img_url"
                     @click="changeActiveOptionToDiys"/>
              <label for="customize_flag_2">
                <i class="icon icon_diys_img"></i>
                <span class="name">{{activeDiys.customize_img_url ? "我的图片" : '自定义'}}</span>
                <div class="checked-mask" style="display: block" v-if="userDiys"><i class="icon icon_circle_check"></i>
                </div>
              </label>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="actions">
        <div class="action" v-if="!topLevel" @click="toPrevLevel">
          <i class="icon icon_cancel"></i>
        </div>
        <div class="action">
          <span v-if="topLevel" class="save" @click="saveDesign">完成</span>
          <span
            v-if="!topLevel && !userDiys && activeOption.price && activeOption.price > 0">另需¥{{activeOption.price}}</span>
          <span
            v-if="!topLevel && activeDiys.customize_price && (activeDiys.customize_content) && (userDiysNext || userDiys)">另需¥{{activeDiys.customize_price * activeDiys.customize_content.length}}</span>
          <span
            v-if="!topLevel && activeDiys.customize_price && (activeDiys.customize_type === 2) && (userDiysNext || userDiys)">另需¥{{activeDiys.customize_price}}元</span>
        </div>
        <div class="action" v-if="!topLevel" @click="nextAction"
             :style="{opacity:!this.userDiysNext ? '1' : ((this.activeDiys.customize_img_url || this.activeDiys.customize_content) ? '1' : '0.5')}">
          <i class="icon icon_ok"></i>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'
	import {getSign, markTxt} from '@/utils'
	import 'swiper/dist/css/swiper.css'
	import {swiper, swiperSlide} from 'vue-awesome-swiper'
	import {mapMutations} from 'vuex'
	import html2canvas from 'html2canvas';

	const clientWidth = window.innerWidth;

	export default {
		name: "GoodsOrder",
		components: {
			NavHeader,
			Goback,
			swiper,
			swiperSlide,
		},
		metaInfo() {
			return {
				title: this.title
			}
		},
		data() {
			return {
				output: '',
				showzoom: false,
				loading: false,
				res: null,     // 操作值
				resCopy: null,  // 净值
				goods_id: this.$route.query.goods_id,
				recommend_id: this.$route.query.recommend_id,
				design_id: this.$route.query.design_id,
				size_value_id: this.$route.query.size_value_id,
				loaded: false,
				title: "选择定制项目",
				options: [],
				topLevel: true,
				activeOption: '',
				diys_option_show: false,  //diys 最后一层是否可自定义 diys项目一定存在customize_flag字段  topLevel级赋值
				userDiys: false,   // 用户选择了自定义option
				customizeOption: false,   //diys中 用户选择了系统自定义option
				userDiysNext: false,   // 当前用户在编辑自定义
				showFile: false,   // 自定义 customize_type 为图片
				showText: false,  // 自定义 customize_type 为文字
				fabrics: false,  // 面料级
				isPositiosLevel: false,
				isPositiosLevelNext: false, // diys位置选择的下一级  选择 contend
				params: {items: [], diys: null},
				layers: [], // 放 items 的图层 默认只有 layer item 1:1
				rate: 0,
				activeDiysId: '', //放 diys 的图层 先考虑一种 // 操作值
				swiperOptions: {
					slidesPerView: 'auto',
					slideToClickedSlide: true
				},
				scale: 1,
				layersOptions: {
					observer: true,
					observeParents: true,
					pagination: {
						el: '.swiper-pagination'
					},
				},
				layerszoomOptions: {
					observer: true,
					observeParents: true,
					pagination: {
						el: '.swiper-pagination'
					},
					zoom: {
						toggle: false
					},
					on: {
						zoomChange: (scale) => {
							this.scale = scale
						}
					}
				},
				canClick: true
			}
		},
		computed: {
			activeDiys() {
				if (this.activeDiysId) {
					return this.res.diys.find(f => {
						return f.id === this.activeDiysId
					})
				}
				return {}
			},
			dataDiysLayer() {
				let arr = [];
				let choosedDiys = this.res.diys.filter(f => {
					let positon = f.positions.find(m => {
						return m.selected === true
					});
					return positon
				});
				if (choosedDiys.length) {
					choosedDiys.forEach((f, i) => {
						arr.push({});
						arr[i].diy_id = f.id;
						let positon = f.positions.find(m => {
							return m.selected === true
						});
						arr[i].position_id = positon.id;
						arr[i].x_position = positon.x_position;
						arr[i].y_position = positon.y_position;
						arr[i].width = positon.width;
						arr[i].height = positon.height;
						let content = f.contents.find(m => {
							return m.selected === true
						});
						if (content) {
							arr[i].type = 'div';
							arr[i].content_id = content.id;
							arr[i].customize_img_url = content.img_url
						} else {
							if (f.customize_img_url) {
								arr[i].type = 'customize';
								arr[i].customize_type = 'img';
								arr[i].customize_img_url = f.customize_img_url
							}
							if (f.customize_content) {
								let content = f.customize_contents.find(m => {
									return m.selected === true
								});
								arr[i].type = 'customize';
								arr[i].customize_content_id = content.id;
								arr[i].customize_content_color = content.content;
								arr[i].customize_content = f.customize_content;
								arr[i].customize_type = 'text';
							}
						}
					})
				}
				return arr;
			}
		},
		created() {
			this.getGoodsDesignInfo()
		},
		methods: {
			...mapMutations([
				'setmyDesign_idStore'
			]),
			getLayerImg(re) {
				if (re.children && re.children.length) {
					let r = re.children.find(c => {
						return c.selected === true
					});
					return this.getLayerImg(r);
				} else {
					let fabricsR = re.fabrics.find((r) => {
						return r.selected === true
					});
					return fabricsR
				}
			},
			// layers是形成一张图的图层
			// 匹配items（部位）和layers
			getLayersBanner() {
				this.res.layers.forEach((f) => {
					let item = this.res.items.find((i) => {
						return i.layer_id === f.id
					});
					let imgs = this.getLayerImg(item);
					// if (imgs.front_img_url) {
					f.front_img_url = imgs.front_img_url;
					// }
					// if (imgs.left_img_url) {
					f.left_img_url = imgs.left_img_url;
					// }
					// if (imgs.right_img_url) {
					f.right_img_url = imgs.right_img_url;
					// }
					// if (imgs.back_img_url) {
					f.back_img_url = imgs.back_img_url;
					// }
					// if (imgs.img_url) {
					f.img_url = imgs.img_url;
					// }
				});
				this.layers = this.res.layers;
			},
			// 获取商品的定制信息（最新接口）
			getGoodsDesignInfo() {
				let params;
				if (this.recommend_id) {
					params = {
						"goods_id": this.goods_id,
						"recommend_id": this.recommend_id,
						"size_value_id": this.size_value_id
					}
				}
				if (this.design_id) {
					params = {
						"design_id": this.design_id,
						"goods_id": this.goods_id,
						"size_value_id": this.size_value_id,
					}
				}
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "get_goods_design_info",
					"params": params,
					"sign": getSign(params)
				}).then((res) => {
					this.res = JSON.parse(JSON.stringify(res.data.data));
					this.resCopy = JSON.parse(JSON.stringify(res.data.data));
					this.options = this.res.items.concat(this.res.diys);
					this.topLevel = true;
					this.getLayersBanner();
					this.loaded = true
				}).catch(() => {
				})
			},
			changeActiveOption(item) {
				if (this.topLevel) {
					this.activeOption = item;
					this.nextAction();
					return false
				}
				if (item.stock_count <= 0) {
					return false;
				}
				this.options.forEach((f) => {
					f.selected = false;
				});
				this.activeOption = item;
				this.activeOption.selected = true;
				// 如果当前是面料级，重新获取layers
				if (this.fabrics) {
					this.getLayersBanner()
				}

				if (this.isPositiosLevelNext && !this.userDiysNext) {
					this.userDiys = false;
					// 判断出当前用户选择了系统自定义option
					this.customizeOption = true;
					// this.lay
				}
				if (this.userDiysNext) {
					//
				}
			},
			changeActiveOptionToDiys() {
				this.options.forEach((f) => {
					f.selected = false;
				});
				this.activeOption = '';
				// 用户选择 diys option
				this.userDiys = true;
				this.customizeOption = false
			},
			nextAction() {
				if (this.userDiysNext) {
					if (!(this.activeDiys.customize_img_url || this.activeDiys.customize_content)) {
						return false
					}
				}
				// 用于UI显示判断,默认情况都是非topLevel
				// 如果是选定后，点击 √ 最后会重置各项标志位 topLeval = true
				this.topLevel = false;
				/** 标准定制
				 选择项目---（位置）？-----面料
				 **/
				if (this.activeOption.children && this.activeOption.children.length) {
					// 进入下一级
					this.title = "选择位置";
					this.options = this.activeOption.children;
					let index = this.options.findIndex((item) => {
						return item.selected === true
					});
					if (index === -1) {
						index = 0
					}
					this.activeOption = this.options[index];
					this.activeOption.selected = true;
					this.$refs.swiper.swiper.slideTo(index);
					return false
				}
				if (this.activeOption.fabrics && this.activeOption.fabrics.length) {
					//下一级
					this.title = "选择材质";
					this.options = this.activeOption.fabrics;
					let index = this.options.findIndex((item) => {
						return item.selected === true
					});
					if (index === -1) {
						index = 0
					}
					this.activeOption = this.options[index];
					this.activeOption.selected = true;
					this.$refs.swiper.swiper.slideTo(index);
					// 当前是是选择面料级
					this.fabrics = true;
					return false
				}
				// diys 的二级 出现 选择位置
				if (this.activeOption.positions && this.activeOption.positions) {
					// 记录当前diy id
					this.activeDiysId = this.activeOption.id;
					this.title = "选择位置";
					this.options = this.activeDiys.positions;  // 系统定义的位置
					//文字自定义的颜色列表  如果用户选择 自定义 && customize_type ==1(自定义文字) 则要用到
					// ***
					let index = this.options.findIndex((item) => {
						return item.selected === true
					});
					if (index === -1) {
						index = 0
					}
					this.activeOption = this.options[index];
					this.activeOption.selected = true;
					this.$refs.swiper.swiper.slideTo(index);
					// 当前级别是 diys 选择位置
					this.isPositiosLevel = true;
					return false
				}
				// diys 位置选择  下一级 出现  内容列表 + （自定义）？
				if (this.isPositiosLevel) {
					this.title = '选择' + this.activeDiys.name + '图案';
					if (this.activeDiys.customize_flag) {
						this.diys_option_show = true;
					}
					if (this.activeDiys.contents) {
						this.options = this.activeDiys.contents; //系统定义的内容列表
					}
					// 这时候如果存在 自定义文字或是自定义图片或内容列表为空  则activeOption一定是自定义
					if (this.activeDiys.customize_content || this.activeDiys.customize_img_url || (this.options && this.options.length === 0)) {
						this.activeOption = '';
						this.userDiys = true;
						this.customizeOption = false;
						this.$refs.swiper.swiper.slideTo(this.options.length);
					} else {
						// 如果不是
						let index = this.options.findIndex((item) => {
							return item.selected === true
						});
						if (index === -1) {
							index = 0
						}
						this.activeOption = this.options[index];
						this.activeOption.selected = true;
						this.customizeOption = true;
						this.$refs.swiper.swiper.slideTo(index);
					}
					// 重置isPositiosLevel
					this.isPositiosLevel = false;
					this.isPositiosLevelNext = true;
					return false
				}
				// 用户选择了自定义  下一步定义图片、文字
				if (this.userDiys) {
					this.diys_option_show = false;
					if (this.activeDiys.customize_type === 1) {
						this.title = '添加文字';
						this.activeDiys.customize_img_url = '';
						this.options = this.activeDiys.customize_contents; // 文字自定义的颜色列表
						let index = this.options.findIndex((item) => {
							return item.selected === true
						});
						if (index === -1) {
							index = 0
						}
						this.activeOption = this.options[index];
						this.activeOption.selected = true;
						this.$refs.swiper.swiper.slideTo(index);
						this.showText = true;
					}
					if (this.activeDiys.customize_type === 2) {
						this.title = "添加制定图案";
						this.activeDiys.customize_content = '';
						this.showFile = true;
					}
					// 重置userDiys
					this.userDiys = false;
					this.userDiysNext = true;
					return false
				}
				// checked  最后一步
				if (this.userDiysNext) {
					// customize_content
					if (this.activeDiys.customize_type === 1) {
						this.activeDiys.customize_content = this.activeDiys.customize_content.toUpperCase();
						if (!this.checkInput()) {
							return false
						}
						this.mergeRes();
						return false
					}
					if (this.activeDiys.customize_type === 2) {
						if (this.activeDiys.customize_img_url) {
							//用户自定义的图片
							this.mergeRes();
							return false
						} else {
							this.$message.warning('选择图片');
							return false
						}
					}
				}

				// 判断出当前用户选择了系统自定义option checked
				if (this.customizeOption) {
					this.mergeRes();
					return false
				}
				// 选择面料 checked
				this.mergeRes()
			},
			// 点击 ❌
			toPrevLevel() {
				//返回上一页
				// 如果当前是面料*位置，上一页是topLevel
				if (this.isPositiosLevel || this.fabrics) {
					if (this.fabrics) {
						this.res.items = JSON.parse(JSON.stringify(this.resCopy.items));
					}
					if (this.isPositiosLevel) {
						this.res.diys = JSON.parse(JSON.stringify(this.resCopy.diys));
					}
					this.topLevel = true;
					this.isPositiosLevel = false;
					this.fabrics = false;
					this.options = this.res.items.concat(this.res.diys);
					this.title = '选择定制项目';
					this.getLayersBanner()
				}
				// 当前自定义选择content,返回位置选择
				if (this.isPositiosLevelNext && !this.userDiysNext) {
					this.isPositiosLevel = true;
					this.isPositiosLevelNext = false;
					this.diys_option_show = false;
					this.title = '选择位置';
					this.options = this.activeDiys.positions;
					this.activeOption = this.activeDiys.positions.find(f => {
						return f.selected === true;
					});
					// 重置用户编辑过的自定义
					let realDiys = this.resCopy.diys.find(f => {
						return f.id === this.activeDiysId
					});
					this.activeDiys.customize_content = JSON.parse(JSON.stringify(realDiys.customize_content));
					this.activeDiys.contents = JSON.parse(JSON.stringify(realDiys.contents));
					this.activeDiys.customize_img_url = JSON.parse(JSON.stringify(realDiys.customize_img_url));
					this.activeDiys.customize_contents = JSON.parse(JSON.stringify(realDiys.customize_contents));
					return false;
				}
				// 当前用户在编辑自定义，返回自定义选择content
				if (this.userDiysNext) {
					this.diys_option_show = true;
					this.userDiysNext = false;
					this.userDiys = true;
					//1 文字输入 2 图片上传
					if (this.activeDiys.customize_type === 1) {
						this.showText = false;
					}
					if (this.activeDiys.customize_type === 2) {
						this.showFile = false;
					}
					this.title = '选择烫钻';
					this.options = this.activeDiys.contents;
					// 重置用户编辑过的自定义
					let realDiys = this.resCopy.diys.find(f => {
						return f.id === this.activeDiysId
					});
					this.activeDiys.customize_content = JSON.parse(JSON.stringify(realDiys.customize_content));
					this.activeDiys.contents = JSON.parse(JSON.stringify(realDiys.contents));
					this.activeDiys.customize_img_url = JSON.parse(JSON.stringify(realDiys.customize_img_url));
					// this.activeDiys.customize_contents = JSON.parse(JSON.stringify(realDiys.customize_contents));
					this.activeOption = '';

					return false;
				}
			},
			reset() {
				this.diys_option_show = false;  //diys 最后一层是否可自定义 diys项目一定存在customize_flag字段  topLevel级赋值
				this.customizeOption = false;   //diys中 用户选择了系统自定义option
				this.userDiys = false;// 用户选择了自定义option
				this.userDiysNext = false;   // 当前用户在编辑自定义
				this.showFile = false;  //当前 自定义 级别操作 customize_type 为图片
				this.showText = false; // 当前 自定义 级别操作  customize_type 为文字
				this.isPositiosLevel = false; // diys 位置选择级
				this.isPositiosLevelNext = false; // diys位置选择的下一级  选择 contend
				this.title = "选择定制项目";
				this.fabrics = false; // 面料级
				this.topLevel = true;
				this.options = this.res.items.concat(this.res.diys);
				this.activeOption = this.options[0];
			},
			mergeRes() {
				this.resCopy = Object.assign({}, this.resCopy, this.res);
				this.res = JSON.parse(JSON.stringify(this.resCopy));
				this.reset();
			},
			getItemPaths() {
				this.res.items.forEach((item) => {
					this.params.items.push({item_path: item.id, fabric_id: ''});
					this.getItemPath(item);
				});
				this.layers = this.res.layers;
			},
			getItemPath(re) {
				if (re.children && re.children.length) {
					let r = re.children.find(c => {
						return c.selected === true
					});
					this.params.items[this.params.items.length - 1].item_path = this.params.items[this.params.items.length - 1].item_path + '-' + r.id;
					return this.getItemPath(r);
				} else {
					let fabricsR = re.fabrics.find((r) => {
						return r.selected === true
					});
					this.params.items[this.params.items.length - 1].fabric_id = fabricsR.id;
					return false
				}
			},
			getDiys() {
				this.params.diys = this.dataDiysLayer;
			},
			saveDesign() {
				this.loading = true;
				var _this = this;
				html2canvas(document.getElementById('node'), {
					useCORS: true, dpi: window.devicePixelRatio * 2,
					scale: 2,
				}).then(function (canvas) {
					var image = new Image();
					image.src = canvas.toDataURL("image/png");
					image.onload = () => {
						var base64String = image.src;
						var bytes = window.atob(base64String.split(',')[1]);
						var ab = new ArrayBuffer(bytes.length);
						var ia = new Uint8Array(ab);
						for (var i = 0; i < bytes.length; i++) {
							ia[i] = bytes.charCodeAt(i);
						}
						var blob = new Blob([ab], {type: 'image/png'});
						var fd = new FormData();
						fd.append('myfile', blob, Date.now() + '.png');
						_this.$axios.post("/aimerdesign/thumbupload", fd, {
							headers: {'Content-Type': 'multipart/form-data'},
						}).then((res) => {
							_this.getDiys();
							if (!_this.canClick) {
								return false
							}
							_this.canClick = false;
							_this.getItemPaths();
							let design_data = JSON.stringify(_this.params);
							let params;
							if (_this.design_id) {
								params = {
									design_data: design_data,
									design_id: _this.design_id,
									goods_id: _this.goods_id,
									imgurl: res.data.data.imgsrc
								}
							} else {
								params = {
									design_data: design_data,
									goods_id: _this.goods_id,
									imgurl: res.data.data.imgsrc
								}
							}
							_this.$axios.post("/aimerdesign", {
								"partner": "aimerdesign",
								"version": "1.0",
								"timestamp": parseInt((new Date().getTime()) / 1000),
								"method": "save_my_design",
								"params": params,
								"sign": getSign(params)
							}).then((res2) => {
								_this.$toast("保存成功", "success");
								_this.setmyDesign_idStore({'myDesign_id': res2.data.data});
								_this.$router.back();
							}).catch(() => {
								_this.canClick = true;
								_this.loading = false
							})
						}).catch((err) => {
							console.log(err);
							_this.canClick = true;
							_this.loading = false
						})
					}
				});


			},
			upload(target) {
				this.loading = true;
				var files = target.target.files[0];
				const isJPG = files.type === 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/ppeg';
				const isLt2M = files.size / 1024 / 1024 < 10 && files.size / 1024 / 1024 > 1;
				//
				if (!isJPG) {
					this.$message.error('上传图片只能是JPG/PNG/JPEG/PJPEG 格式!');
					this.loading = false;
					return false
				}
				if (!isLt2M) {
					this.$message.error('上传图片不能小于1MB，不能超过 10MB!');
					this.loading = false;
					return false
				}
				var formData = new FormData();
				formData.append('myfile', files);
				this.$axios.post("/aimerdesign/imgupload", formData, {
					headers: {'Content-Type': 'multipart/form-data'},
				}).then((res) => {
					this.loading = false;
					this.activeDiys.customize_img_url = res.data.data.imgsrc
				}).catch(() => {
				})
			},
			checkInput() {
				var reg = /^[a-zA-Z0-9]+$/;
				if (reg.test(this.$refs.customize_content.value)) {
					this.$refs.tip.style.color = '#515151';
					return true
				} else {
					this.$refs.tip.style.color = '#ff0000';
					return false
				}
			},
			markTxt(item) {
				return markTxt(item.customize_content, item.customize_content_color);
			},
			getImageRate(url) {
				var img = new Image();
				img.src = url;
				img.onload = () => {
					return ((clientWidth) / img.width).toFixed(4);
				};
			}
		},
		watch: {
			'layers': {
				deep: true,
				immediate: true,
				handler() {
					if (this.layers && this.layers.length && this.layers[0] && this.layers[0].front_img_url) {
						var img = new Image();
						img.src = this.layers[0].front_img_url;
						img.onload = () => {
							this.rate = this.scale * (((clientWidth) / img.width).toFixed(4));
						};
					}
				}
			},
			'scale': {
				handler() {
					if (this.layers && this.layers.length && this.layers[0] && this.layers[0].front_img_url) {
						var img = new Image();
						img.src = this.layers[0].front_img_url;
						img.onload = () => {
							this.rate = this.scale * (((clientWidth) / img.width).toFixed(4));

						};
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
  .upload {
    text-align: center;
    /*display: flex;*/
    /*align-content: center;*/
    /*flex-direction: column;*/
    height: 100%;
    /*justify-content: center;*/
  }

  .upload-file {
    margin-top: 50px;
    background: #FFFFFF;
    width: 175px;
    height: 175px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .upload-button {
    margin-top: 50px;
    display: inline-block;
    border: 1px solid #BEA47A;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    width: 220px;
  }

  .upload-tip {
    padding-top: 20px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 18px;
  }

  .swiper-layers {
    /*height: 80vw;*/
    background-color: #ffffff;
    .h-img {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .option {
    background: rgba(247, 247, 247, 1);
    /*border: 1px solid rgba(255, 255, 255, 1);*/
    width: 140px;
    height: 163px;
    margin-bottom: 60px;
    padding-bottom: 0.1px;

    .name {
      position: absolute;
      width: 100%;
      bottom: 15px;
      left: 0;
      font-size: 14px;
      text-align: center;
      color: rgba(51, 51, 51, 1);
      line-height: 14px;
      z-index: 3;
    }

    label {
      background: white;
      border: 1px solid #f7f7f7;
      height: 100%;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      position: relative;
      left: 0;
      top: 0;
    }

    .stock_count {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      justify-content: center;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.8);
      font-size: 18px;
      color: rgba(153, 153, 153, 1);
      line-height: 30px;
    }

    input[type=radio] {
      display: none;
    }
    .checked-mask {
      display: none;
    }
    input[type=radio]:checked + label {
      /*background: #ffffff;*/
      .checked-mask {
        display: block;
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
    }

    img {
      max-width: 90px;
      min-width: 70px;
      margin-bottom: 20px;
      &.with70 {
        width: 70px;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    background: #FFFFFF;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;

    .action {
      height: 60px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 33%;
      flex: 1;

      .save {
        width: 100%;
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(190, 164, 122, 1);
        font-size: 16px;
        color: #ffffff;
      }
    }
  }

  .diys-layer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center center;
    img {
      height: 100%;
    }
  }

  .hidden {
    opacity: 0;
  }

  .diys-text {
    position: absolute;
    z-index: 2;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("./../assets/images/goods_diys_input_bg.jpg") no-repeat;
    background-size: cover;
    text-align: center;

    input {
      width: calc(100% - 160px);
      padding: 20px;
      margin: 0 auto;
      text-align: center;
      display: block;
      height: 60px;
      line-height: 20px;
      font-size: 14px;
      border: 1px solid rgba(190, 164, 122, 1)
    }

    .tip {
      padding-top: 20px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
    }

  }

  .fullscreen {
    position: fixed;
    z-index: 7;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .goods_banner_fullscreen {
      width: 100%;
      height: 100%;

      .swiper-container {
        width: 100%;
        height: 100%;
      }

      .swiper-slide {
        overflow: hidden;
      }

      .swiper-pagination-fraction {
        bottom: 40px;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);

        .swiper-pagination-current, .swiper-pagination-total {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .input-txt {
    text-transform: uppercase;
  }
</style>
