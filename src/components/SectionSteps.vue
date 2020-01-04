<template>
  <section class="bg-white" v-if="data">
    <SectionTitle :zn="data.title.zh" :en="data.title.en"></SectionTitle>
    <Banner :options="options" :banners="data.bannses" class="swiper-steps" :pagination="data.bannses.length > 1"
            :style="{'paddingBottom':data.bannses.length > 1 ? '70px' : '40px'}"
    >
      <template v-slot="slotProps">
        <a :href="slotProps.slide.buttonsrc" class="d-block">
          <img :src="slotProps.slide.imgurl" class="src">
          <div class="number">
            <span>{{slotProps.slide.number}}</span>
          </div>
          <div class="tip">{{slotProps.slide.tip}}</div>
        </a>
      </template>
    </Banner>
  </section>
</template>

<script>
	import SectionTitle from '@/components/SectionTitle.vue'
	import Banner from '@/components/Banner.vue'

	export default {
		name: "SectionSteps",
		components: {SectionTitle, Banner},
		props: ['data'],
		data() {
			return {
				options: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				},
			}
		}
	}
</script>

<style scoped lang="scss">
  .swiper-steps {
    text-align: center;

    .number {
      font-size: 40px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
      padding-bottom: 20px;

      span {
        width: 34px;
        height: 62px;
        display: inline-block;
        padding-bottom: 22px;
        border-bottom: 6px solid rgba(190, 164, 122, 1);
      }
    }

    .tip {
      font-size: 18px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      text-decoration: none;
      line-height: 22px;
    }

    .src {
      width: (100 / 375) * 100vw;
      height: (83 / 375) * 100vw;
    }
  }
</style>
