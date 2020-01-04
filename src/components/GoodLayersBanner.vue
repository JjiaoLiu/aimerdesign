<template>
  <section>
    <swiper ref="swiperLayers" class="swiper-layers" id="swiper-layers" :options="layersOptions" @click="show = true">
      <swiper-slide v-if="banners[0].front_img_url">
        <!--在正面添加diys-->
        <img :src="option.front_img_url" class="img-response p-absolute" v-for="option in banners"
             :key="option.id"/>
        <div class="p-absolute diys-layer"
             v-if="diys && diys.position"
             :style="style"
             v-html="txt">{{diys.customize_text}}
        </div>
      </swiper-slide>
      <swiper-slide v-if="banners[0].left_img_url">
        <img :src="banners[0].left_img_url" class="img-response hidden"/>
        <img :src="option.left_img_url" class="img-response p-absolute" v-for="option in banners"
             :key="option.id"/>
      </swiper-slide>
      <swiper-slide v-if="banners[0].right_img_url">
        <img :src="banners[0].right_img_url" class="img-response hidden"/>
        <img :src="option.right_img_url" class="img-response p-absolute" v-for="option in banners"
             :key="option.id"/>
      </swiper-slide>
      <swiper-slide v-if="banners[0].back_img_url">
        <img :src="banners[0].back_img_url" class="img-response hidden"/>
        <img :src="option.back_img_url" class="img-response p-absolute" v-for="option in banners"
             :key="option.id"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <transition name="el-fade-in-linear" v-if="show">
      <div class="fullscreen">
        <swiper ref="swiperfullscreen" :options="optionsFullscreen" class="goods_banner_fullscreen"
                @click="show = false;scale = 1">
          <swiper-slide v-if="banners[0].front_img_url">
            <div class="swiper-zoom-container">
              <div style="position: relative">
                <!--在正面添加diys-->
                <img :src="option.front_img_url" class="img-response" v-for="option in banners"
                     :key="option.id"/>
                <div class="p-absolute diys-layer"
                     v-if="diys && diys.position"
                     :style="{color:diys.customize_content.content,left:(diys.position.x_position - diys.position.width/2) * rate+'px',top:(diys.position.y_position - diys.position.height/2) * rate + 'px',width:diys.position.width * rate + 'px',height:diys.position.height * rate + 'px',backgroundImage:'url('+diys.content.img_url+')'}"
                     v-html="txt"
                >{{diys.customize_text}}
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide v-if="banners[0].left_img_url">
            <div class="swiper-zoom-container">
              <img :src="option.left_img_url" class="img-response" v-for="option in banners"
                   :key="option.id"/>
            </div>
          </swiper-slide>
          <swiper-slide v-if="banners[0].right_img_url">
            <div class="swiper-zoom-container">
              <img :src="option.right_img_url" class="img-response" v-for="option in banners"
                   :key="option.id"/>
            </div>
          </swiper-slide>
          <swiper-slide v-if="banners[0].back_img_url">
            <div class="swiper-zoom-container">
              <img :src="option.back_img_url" class="img-response" v-for="option in banners"
                   :key="option.id"/>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </transition>
  </section>
</template>

<script>
	// Vue-Awesome-Swiper
	// Swiper4 component for Vue, support pc and mobile, SPA and SSR.
	// https://github.com/surmon-china/vue-awesome-swiper
	import 'swiper/dist/css/swiper.css'
	import {swiper, swiperSlide} from 'vue-awesome-swiper'
	import {markTxt} from '@/utils'

	const clientWidth = window.innerWidth;
	export default {
		name: "GoodLayersBanner",
		props: {
			banners: {default: () => ([])},
			diys: {default: () => ({})},
		},
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				show: false,
				layersOptions: {
					pagination: {
						el: '.swiper-pagination'
					}
				},
				optionsFullscreen: {
					zoom: {
						toggle: false
					},
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						type: 'fraction',
						initialSlide: this.activeIndex
					},
					on: {
						zoomChange: (scale) => {
							this.scale = scale
						}
					}
				},
				scale: 1,
				rate: 0
			}
		},
		methods: {
			getImageRate(url) {
				var img = new Image();
				img.src = url;
				img.onload = () => {
					let rate = (clientWidth / img.width).toFixed(4);
					document.getElementById('swiper-layers').style.height = img.height * rate + 'px';
					this.rate = this.scale * rate
				}
			},
		},
		computed: {
			txt() {
				if (this.diys && this.diys.position && this.diys.customize_text) {
					return markTxt(this.diys.customize_text, this.diys.customize_content && this.diys.customize_content.content)
				}
				return ''
			},
			style() {
				if (this.diys && this.diys.position) {
					return {
						color: this.diys.customize_content ? this.diys.customize_content.content : "#515151",
						left: (this.diys.position.x_position - this.diys.position.width / 2) * this.rate + 'px',
						top: (this.diys.position.y_position - this.diys.position.height / 2) * this.rate + 'px',
						width: this.diys.position.width * this.rate + 'px',
						height: this.diys.position.height * this.rate + 'px',
						backgroundImage: this.diys.content.img_url ? 'url(' + this.diys.content.img_url + ')' : 'url(' + this.diys.customize_img_url + ')'
					}
				}
				return {}
			},
		},
		watch: {
			'banners': {
				immediate: true,
				deep: true,
				handler() {
					if (this.banners[0])
						this.getImageRate(this.banners[0].front_img_url);
				}
			},
			'scale': {
				immediate: true,
				handler() {
					this.getImageRate(this.banners[0].front_img_url);
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
  .goods_banner {
    width: 100%;
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

  .hidden {
    opacity: 0;
  }

  .swiper-layers {
    height: 100%;
    /*height: 80vw;*/
  }

</style>
