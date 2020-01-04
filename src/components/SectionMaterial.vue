<template>
  <section class="bg-white" v-if="data">
    <p class="title">为你甄选的面料</p>
    <div class="swiper-material">
      <Banner :options="options" :banners="data.bannses"
              :pagination="data.bannses.length > 3"
              :style="{'paddingBottom':data.bannses.length > 3 ? '70px' : '40px'}"
      >
        <template v-slot:default="slotProps">
          <a :href="slotProps.slide.buttonsrc" class="d-block material-wrap">
            <div class="left">
              <img :src="slotProps.slide.img" class="img-response">
            </div>
            <div class="right">
              <div class="color">{{slotProps.slide.color}}</div>
              <div class="material">{{slotProps.slide.material}}</div>
              <div class="dis">{{slotProps.slide.dis}}</div>
            </div>
          </a>
        </template>
      </Banner>
    </div>
  </section>
</template>

<script>
	import Banner from '@/components/Banner.vue'

	export default {
		name: "SectionMaterial",
		components: {Banner},
		props: ['data'],
		data() {
			return {
				options: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					spaceBetween: 35,
					slidesPerColumn: 3,
					slidesPerView: 1,
					slidesPerColumnFill: 'column',
				}
			}
		}
	}
</script>

<style scoped lang="scss">

  .title {
    text-align: center;
    font-size: 18px;
    line-height: 22px;
    padding-bottom: 10px;
    padding-top: 30px;
    border-top: 1px solid #E9E9E9;
  }

  .swiper-material {
    padding: 20px 0;
  }

  .material-wrap {
    padding: 0 38px;
    display: flex;
  }

  .color, .material {
    font-size: 14px;
    line-height: 20px;
  }

  .material {
    padding-bottom: 9px;
    margin-bottom: 9px;
    border-bottom: 1px solid #cccccc;
  }

  .dis {
    font-size: 12px;
    line-height: 16px;
  }

  .left {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .right {
    flex-grow: 1;
  }

</style>
