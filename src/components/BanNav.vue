<template>
  <section class="h-100 ban-nav">
    <div class="p-l-15 p-r-15" style="cursor: pointer" @click="show= true">
      <i class="icon icon_menu"></i>
    </div>
    <div class="fixed-ban-nav" v-if="show">
      <i class="close icon icon_x" @click="show = false"></i>
      <ul class="list">
        <li><a href="https://m.aimer.com.cn">首页</a></li>
        <li><a href="https://m.aimer.com.cn/goodslist/cate">全部分类</a></li>
        <li><a href="https://m.aimer.com.cn/goodslist/p69,317/">女士</a></li>
        <li><a href="https://m.aimer.com.cn/goodslist/p69,318/">男士</a></li>
        <li><a href="https://m.aimer.com.cn/goodslist/b,15-29-30">儿童</a></li>
        <li><a href="/">定制</a></li>
        <li><a href="https://m.aimer.com.cn/goodslist/sale,0/">全部商品</a></li>
        <li><a href="https://m.aimer.com.cn/privateclothespress/hotcloset?module_id=1555">人气衣橱</a></li>
        <li><a href="https://www.aimer.com.cn/information/list?cid=6195">爱慕故事</a></li>
        <li><a href="https://www.aimer.com.cn/information/list?cid=6196">内衣百科</a></li>
        <!-- <li><a href="#">爱慕女人会</a></li>-->
        <div class="line"></div>
        <li id="my_account_li">
          <a v-if="!is_login"
             :href='href'>
            <i class="icon icon_user_menu m-r-10"></i>登录
          </a>
          <a v-else
             href='http://m.aimer.com.cn/account'>
            <i class="icon icon_user_menu m-r-10"></i>我的账户
          </a>
        </li>
        <li>
          <a href="https://www.aimer.com.cn/privateclothespress?type=collect">
            <i class="icon icon_nolove m-r-10"></i>我的收藏
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: "BanNav",
		data() {
			return {
				show: false,
				href: process.env.VUE_APP_LOGIN + "passport/login?redirect_to=" + encodeURIComponent(window.location.href)
			}
		},
		computed: {
			...mapState(['is_login']),
		}
	}
</script>

<style scoped lang="scss">
  .fixed-ban-nav {
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.92);
  }

  .list {
    font-size: 14px;
    line-height: 20px;
    .icon {
      margin-top: 0;
    }
    a[href] {
      color: #515151;
      font-size: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding: 12.5px 20px;
      margin: 0;
      display: flex;
      align-items: center;
      letter-spacing: 1px;
      line-height: 20px;
      font-family: SimHei, 黑体, "Microsoft YaHei", 微软雅黑;
    }
  }

  .close {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .line {
    background: #cccccc none repeat scroll 0 0;
    height: 1px;
    padding: 0 20px;
    margin: 10px auto;
    opacity: 0.7;
    width: calc(100% - 40px)
  }
</style>
