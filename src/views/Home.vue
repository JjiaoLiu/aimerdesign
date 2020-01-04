<template>
  <section class="home" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <BanNav/>
      </template>
      <template v-slot:center>
        <i class="icon icon_logo"></i>
      </template>
    </NavHeader>
    <main class="main">
      <el-row class="lists" v-if="allData.biaoqian">
        <el-col :span="span" class="lists-link" v-for="(item,index) in allData.biaoqian" :key="index">
          <a :href="item.url" class="d-block">{{item.text}}</a>
        </el-col>
      </el-row>
      <Banner :banners="allData.slideshow1" :pagination="allData.slideshow1.length > 1">
        <template v-slot="slotProps">
          <figure>
            <a :href="slotProps.slide.buttonsrc" class="d-block">
              <img :src="slotProps.slide.imgurl" class="img-response">
            </a>
          </figure>
        </template>
      </Banner>
      <div class="logo" v-if="allData.logo">
        <a :href="allData.logo.buttonsrc"><img :src="allData.logo.imgurl" class="resize"/></a>
      </div>
      <section class="bg-white" v-if="allData.pickitup.goods">
        <SectionTitle :zn="allData.pickitup.zh" :en="allData.pickitup.en"></SectionTitle>
        <Banner :options="optionsSwiperType2" :banners="allData.pickitup.goods"
                :pagination="allData.pickitup.goods.length > 2"
                class="swiper-prod swiper-type-horizontal"
                :style="{'paddingBottom':allData.pickitup.goods.length > 2 ? '70px' : '40px'}"
        >
          <template v-slot="slotProps">
            <figure style="" @click="toGoodsDetail(slotProps.slide.id)">
              <img :src="slotProps.slide.imag" class="img-response">
              <div class="brand">{{slotProps.slide.brand_name}}</div>
              <div class="prod">{{slotProps.slide.name}}</div>
              <div class="button">立即定制</div>
            </figure>
          </template>
        </Banner>
      </section>
      <SectionSteps v-if="allData.steps" :data="allData.steps"/>
      <div v-if="allData.uniques">
        <section class="m-b-10 bg-white" v-for="(item,index) in allData.uniques" :key="index">
          <SectionTitle :zn="item.zh" :en="item.en"></SectionTitle>
          <figure>
            <a class="d-block" :href="item.url"><img :src="item.src" class="img-response"></a>
          </figure>
          <div class="swiper-prod swiper-type-vertical">
            <figure v-for="slide in item.goods" :key="slide.id" @click="toGoodsDetail(slide.id)">
              <img :src="slide.imag" class="img-response">
              <div class="brand">{{slide.brand_name}}</div>
              <div class="prod">{{slide.name}}</div>
              <div class="button">立即定制</div>
            </figure>
          </div>
        </section>
      </div>
      <section class="bg-white" v-if="allData.newgoods">
        <SectionTitle :zn="allData.newgoods_text.ch" :en="allData.newgoods_text.en"></SectionTitle>
        <div class="tabs">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="slide.text" :name="slide.text" v-for="slide in allData.newgoods"
                         :key="slide.text">
              <div class="swiper-tabs">
                <Banner :style="{'paddingBottom':slide.goods.length > 2 ? '70px' : '40px'}"
                        class="swiper-pagenation-out" :options="optionsSwiperType4" :banners="slide.goods"
                        :pagination="slide.goods.length > 2">
                  <template v-slot="slotProps">
                    <figure @click="toGoodsDetail(slotProps.slide.id)">
                      <img :src="slotProps.slide.imag" class="img-response">
                      <div class="brand">{{slotProps.slide.name}}</div>
                      <div class="button">立即定制</div>
                    </figure>
                  </template>
                </Banner>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
      <SectionSystem v-if="allData.system" :data="allData.system"/>
      <Footer/>
    </main>
  </section>
</template>
<script>
	// @ is an alias to /src
	import NavHeader from '@/components/NavHeader.vue'
	import BanNav from '@/components/BanNav.vue'
	import SectionTitle from '@/components/SectionTitle.vue'
	import Banner from '@/components/Banner.vue'
	import Footer from '@/components/Footer.vue'
	import SectionSteps from '@/components/SectionSteps.vue'
	import SectionSystem from '@/components/SectionSystem.vue'
	import {getSign} from '@/utils'
	import {mapMutations} from 'vuex'

	export default {
		name: 'home',
		components: {NavHeader, Footer, Banner, SectionTitle, SectionSteps, SectionSystem, BanNav},
		metaInfo() {
			return {
				title: '爱慕定制_Aimer爱慕官网|爱慕官方商城'
			}
		},
		computed: {
			span() {
				if (this.allData) {
					return 24 / this.allData.biaoqian.length;
				}
				return 24
			}
		},
		data() {
			return {
				loaded: false,
				banners: [],
				steps: [],
				allData: {},
				tabs: [],
				optionsSwiperType2: {
					slidesPerView: 2,
					spaceBetween: 15,
					slidesPerGroup: 2,
					loop: true,
					loopFillGroupWithBlank: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				},
				optionsSwiperType3: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				},
				optionsSwiperType4: {
					slidesPerView: 2,
					spaceBetween: 20,
					slidesPerGroup: 2,
					loop: true,
					loopFillGroupWithBlank: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				},
				activeName: ''
			}
		},
		created() {
			this.getData();
		},
		methods: {
			...mapMutations([
				'setActiveDesignStore',
				'setActiveSizeStore',
				'setIsLogin',
				'setCheckoutStore',
				'setActivebuyNumber'
			]),
			getData() {
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "dz_index",
					"params": {},
					"sign": getSign({})
				}).then((res) => {
					this.allData = res.data.data;
					this.activeName = this.allData.newgoods ? this.allData.newgoods[0].text : '';
					this.loaded = true;
					this.setIsLogin({is_login: res.data.data.is_login});
				}).catch((err) => {
					console.log(err)
				})
			},
			toGoodsDetail(id) {
				this.setActiveDesignStore({activeDesign: {'img': ''}});
				this.setActiveSizeStore({activeSize: {}});
				this.setCheckoutStore({checkout: {checkout_address: {}}});
				this.setActivebuyNumber({activebuyNumber: 1});
				this.$router.push("/goods_detail?goods_id=" + id)
			}
		}
	}
</script>
<style lang="scss" scoped>
  .lists {
    font-size: 18px;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    border-top: 1px solid rgba(233, 233, 233, 1);
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    &-link {
      height: 70px;
      line-height: 70px;
      text-align: center;
      background: rgba(255, 255, 255, 1);
    }
    a[href] {
      text-decoration: none;
    }
    &-link + &-link {
      border-left: 1px solid rgba(233, 233, 233, 1);
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 104px;
    background-color: #ffffff;
    .resize {
      height: 104px;
    }
  }

  .swiper-prod {
    text-align: center;
    .brand {
      padding-top: 10px;
      font-size: 14px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      text-align: center;
    }
    .prod {
      padding: 0 5px;
      margin-bottom: 20px;
      height: 36px;
      font-size: 12px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-wrap: break-word;
    }
  }

  .swiper-type-vertical {
    padding: 0 70px;
    > figure {
      padding: 30px 0;
    }
    .brand {
      padding-top: 20px;
    }
    .prod {
      padding: 0;
    }
  }

  .swiper-type-horizontal {
    padding: 20px 10px 0 10px;
  }

  .swiper-tabs {
    padding: 0 20px;
    text-align: center;
    .brand {
      display: -webkit-box;
      margin-bottom: 20px;
      width: 100%;
      line-height: 1.414;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 32px;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
</style>
