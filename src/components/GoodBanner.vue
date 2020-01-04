<template>
  <section>
    <swiper ref="swiper" :options="options" class="goods_banner" @click="show = true">
      <swiper-slide v-for="(slide,index) in banners" :key="index" @slideChangeTransitionEnd="activeIndex === index">
        <img :src="slide" class="img-response"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <transition name="el-fade-in-linear" v-if="show">
      <div class="fullscreen">
        <swiper ref="swiperfullscreen" :options="optionsFullscreen" class="goods_banner_fullscreen"
                @click="show = false">
          <swiper-slide v-for="slide in banners" :key="slide.id" @slideChangeTransitionEnd="activeIndex === index">
            <div class="swiper-zoom-container">
              <img :src="slide" class="img-response">
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

	export default {
		name: "GoodBanner",
		props: {
			banners: {default: () => ([])},
		},
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				length: false,
				show: false,
				options: {
					observer: true,
					observeParents: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				},
				optionsFullscreen: {
					zoom: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						type: 'fraction',
						initialSlide: this.activeIndex
					}
				}
			}
		},
		watch: {}
	}
</script>
<style lang="scss">
  .goods_banner {
    width: 100%;

    .swiper-pagination-bullets {
      bottom: 20px;

      .swiper-pagination-bullet {
        margin: 0 5px;
      }
    }

    .swiper-pagination-bullet {
      width: 11px;
      height: 11px;
      border: 1px solid rgba(204, 204, 204, 1);
      background-color: #ffffff;

      &.swiper-pagination-bullet-active {
        background: rgba(190, 164, 122, 1);
      }
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
</style>
