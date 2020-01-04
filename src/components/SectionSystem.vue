<template>
  <section class="bg-white system" v-if="data">
    <SectionTitle :zn="data.title.zh" :en="data.title.en"></SectionTitle>
    <div class="swiper-system">
      <swiper class="swiper"
              :style="{'paddingBottom':data.bannses.length > 1 ? '86px' : '20px'}"
              ref="swiper" :options="options" @slideChangeTransitionEnd="slideChangeTransitionEnd">
        <swiper-slide v-for="(slide,index) in data.bannses" :key="index">
          <a class="d-block" :href="slide.buttonsrc"> <img :src="slide.imgurl" class="img-response"></a>
        </swiper-slide>
        <div :class="['swiper-pagination ',data.bannses.length > 1 ? '' :'swiper-pagination-hidden']"
             slot="pagination"></div>
      </swiper>
      <div class="number t-c" v-if="data.bannses.length > 1">
        <span>{{activeIndex}}/{{data.bannses && data.bannses.length}}</span>
      </div>
    </div>
    <div class="system-tip">
      <p>{{data.text}}</p>
    </div>
    <!--<div class="t-c"><a :href="data.buttonsrc" class="button">立即定制</a></div>-->
  </section>
</template>

<script>
	import 'swiper/dist/css/swiper.css'
	import {swiper, swiperSlide} from 'vue-awesome-swiper'
	import SectionTitle from '@/components/SectionTitle.vue'

	export default {
		name: "SectionSystem",
		props: ['data'],
		components: {
			SectionTitle,
			swiper,
			swiperSlide
		},
		data() {
			return {
				options: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				},
				activeIndex: 1,
			}
		},
		methods: {
			slideChangeTransitionEnd() {
				this.activeIndex = this.$refs.swiper.swiper.activeIndex + 1;
			},
		}
	}
</script>

<style scoped lang="scss">
  .system {
    padding-bottom: 30px;
  }

  .swiper-system {
    padding: 10px 30px 20px 30px;
    text-align: center;
    position: relative;
  }

  .swiper {
    padding-bottom: 90px;
  }

  .system-tip {
    font-size: 12px;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    padding: 0 50px 30px 50px;
    margin-top: -20px;
    word-break: break-word;
  }

  .number {
    position: absolute;
    bottom: 70px;
    left: 0;
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
  }
</style>
