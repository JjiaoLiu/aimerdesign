<template>
  <swiper ref="swiper" :options="options" class="swiper">
    <swiper-slide v-for="(slide,index) in banners" :key="index">
      <slot :slide="slide"></slot>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
	// Vue-Awesome-Swiper
	// Swiper4 component for Vue, support pc and mobile, SPA and SSR.
	// https://github.com/surmon-china/vue-awesome-swiper
	import 'swiper/dist/css/swiper.css'
	import {swiper, swiperSlide} from 'vue-awesome-swiper'

	export default {
		name: "LayersBanner",
		props: {
			banners: {default: () => ([])},
			options: {default: () => ({})}
		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="scss" scoped>
  .swiper {
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
</style>
