<template>
  <swiper ref="swiper" :options="options" class="swiper" @slideChangeTransitionEnd="slideChangeTransitionEnd">
    <swiper-slide v-for="(slide,index) in banners" :key="slide.id">
      <slot :slide="slide" :index="index"></slot>
    </swiper-slide>
    <div :class="['swiper-pagination ',pagination ? '' :'swiper-pagination-hidden']" slot="pagination"></div>
  </swiper>
</template>

<script>
	// Vue-Awesome-Swiper
	// Swiper4 component for Vue, support pc and mobile, SPA and SSR.
	// https://github.com/surmon-china/vue-awesome-swiper
	import 'swiper/dist/css/swiper.css'
	import {swiper, swiperSlide} from 'vue-awesome-swiper'

	export default {
		name: "Banner",
		props: {
			banners: {default: () => ([])},
			options: {
				default: () => ({
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				})
			},
			number: {default: false},
			pagination: {default: false},
		},
		data() {
			return {
				activeIndex: 1
			}
		},
		computed: {},
		components: {
			swiper,
			swiperSlide
		},
		methods: {
			slideChangeTransitionEnd() {
				this.activeIndex = this.$refs.swiper.swiper.activeIndex + 1;
			}
		}
	}
</script>
<style lang="scss" scoped>
  .swiper {
    /*height: 80vw;*/
  }
</style>
