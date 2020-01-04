<template>
  <section class="goods">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>
        <i class="icon icon_logo"></i>
      </template>
    </NavHeader>
    <main class="main">
      <!--<el-row :gutter="15" class="list infinite-list" v-infinite-scroll="load">-->
      <!--<el-col :span="12" v-for="i in banners" :key="i.id" class="col">-->
      <!--<div class="infinite-list-item">-->
      <!--<img :src="i.img" class="img-response"/>-->
      <!--<div class="figure">-->
      <!--<div class="brand">{{i.brand}}</div>-->
      <!--<div class="dis">{{i.dis}}</div>-->
      <!--<div class="detail">-->
      <!--<span>¥{{i.price}}</span><span>¥{{i.o_price}}</span><i-->
      <!--class="icon icon_price_type1"></i><i class="icon icon_price_type2"></i>-->
      <!--<div class="f-r"><i class="icon icon_heart"></i></div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-col>-->
      <!--</el-row>-->
    </main>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'

	const bannersData = [{
		"img": "img/index-banner-1.jpg",
		"brand": "MODELAB",
		"dis": "爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17",
		"price": "699",
		"o_price": "699",
		"isMember": true,
		"isShare": true,
		"isMark": true
	}, {
		"img": "img/index-banner-1.jpg",
		"brand": "MODELAB",
		"dis": "爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17",
		"price": "699",
		"o_price": "699",
		"isMember": true,
		"isShare": true,
		"isMark": true
	}];
	export default {
		name: "Goods",
		components: {NavHeader, Goback},
		data() {
			return {
				count: 0,
				banners: [{
					"img": "img/index-banner-1.jpg",
					"brand": "MODELAB",
					"dis": "爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17",
					"price": "699",
					"o_price": "699",
					"isMember": true,
					"isShare": true,
					"isMark": true
				}, {
					"img": "img/index-banner-1.jpg",
					"brand": "MODELAB",
					"dis": "爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17",
					"price": "699",
					"o_price": "699",
					"isMember": true,
					"isShare": true,
					"isMark": true
				}, {
					"img": "img/index-banner-1.jpg",
					"brand": "MODELAB",
					"dis": "爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17",
					"price": "699",
					"o_price": "699",
					"isMember": true,
					"isShare": true,
					"isMark": true
				}, {
					"img": "img/index-banner-1.jpg",
					"brand": "MODELAB",
					"dis": "爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17爱慕慕澜夏日之约3/4无托抹胸文胸AD17D17",
					"price": "699",
					"o_price": "699",
					"isMember": true,
					"isShare": true,
					"isMark": true
				}],

			}
		},
		methods: {
			load() {
				this.banners.push(...bannersData)
			},
		}
	}
</script>

<style scoped lang="scss">
  .infinite-list {
    height: calc(100vh - 70px);
    padding: 0 10px;
    margin: 0;
    list-style: none;
    overflow: auto;
  }

  .infinite-list .infinite-list-item {
    background-color: #ffffff;
    margin-top: 15px;
    margin-bottom: 25px;
  }

  .figure {
    color: rgba(51, 51, 51, 1);
    padding: 10px 5px;
    width: 100%;
  }

  .brand {
    font-size: 14px;
    line-height: 20px;
  }

  .dis {
    font-size: 12px;
    line-height: 18px;
    height: 36px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .detail {
    padding-top: 14px;
    font-size: 12px;
    line-height: 12px;

    > span, > .icon {
      display: inline-block;
      margin-right: 5px;
    }
  }
</style>
