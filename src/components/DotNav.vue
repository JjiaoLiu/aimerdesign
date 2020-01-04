<template>
  <section class="dot-nav p-l-15 h-100 p-r-15" @click="show = !show">
    <i class="icon icon_threedot"></i>
    <transition name="el-zoom-in-top">
      <div class="drop_top_link" v-if="show">
        <ul>
          <li class="top_home">
            <a href="https://m.aimer.com.cn/">
              <i class="icon icon_home"></i>
              首页</a>
          </li>
          <li class="top_sort">
            <a href="https://m.aimer.com.cn/goodslist/cate">
              <i class="icon icon_sort"></i>
              分类</a>
          </li>
          <li class="top_bag">
            <a href="https://m.aimer.com.cn/shopcart" id="shopcart">
              <i class="icon icon_bag"></i>
              购物袋</a>
          </li>
          <li class="top_user">
            <a href="https://m.aimer.com.cn/account">
              <i class="icon icon_user"></i>
              用户中心</a>
          </li>
          <li class="top_closet">
            <a href="https://m.aimer.com.cn/privateclothespress">
              <i class="icon icon_bar"></i>
              私人衣橱</a>
          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script>
	export default {
		name: "DotNav",
		data() {
			return {
				show: false
			}
		}
	}
</script>

<style scoped lang="scss">
  .dot-nav {
    position: relative;
    left: 0;
    top: 0;
    user-select: none;
  }

  .drop_top_link {
    position: absolute;
    padding: 10px;
    right: 5px;
    background: #FFFFFF;
    display: block;
    top: 40px;
    border: 1px solid #ccc;
    border-radius: 3px;
    z-index: 999;
    li {
      position: relative;
      padding-left: 30px;
    }
    a[href] {
      font-size: 12px;
      color: #333333;
      letter-spacing: 0;
      display: block;
      padding: 12px 0;
      border-bottom: 1px solid #e9e9e9;
      width: 70px;
      text-align: left;
    }
    .icon {
      left: 0;
      position: absolute;
    }
  }
</style>
