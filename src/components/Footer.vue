<template>
  <footer class="footer bg-white" v-if="load">
    <!--定制系列-->
    <!--<div class="system">-->
    <!--<SectionTitle zn="更多定制系列" en="More About Customise"></SectionTitle>-->
    <!--<el-collapse accordion class="collapse p-15">-->
    <!--<el-collapse-item v-for="item in footers" :key="item.id" :title="item.title">-->
    <!--<ul v-if="item.list" class="ul">-->
    <!--<li v-for="(it,index) in item.list" :key="index" class="li">{{it.title}}</li>-->
    <!--</ul>-->
    <!--</el-collapse-item>-->
    <!--</el-collapse>-->
    <!--</div>-->
    <!--联系方式-->
    <div class="contacts p-15">
      <a class="el-collapse-item__header d-block" v-for="item in contacts" :href="item.link" :key="item.id"
         @click="toKfu(item.id)">
        <i :class="['icon ',item.icon]"></i>{{item.title}}
      </a>
    </div>
    <!--网站导航-->
    <el-collapse accordion class="collapse website p-15">
      <el-collapse-item v-for="item in websites" :key="item.id" :title="item.title">
        <ul v-if="item.list" class="ul">
          <li v-for="(it,index) in item.list" :key="index" class="li p-15">
            <a :href="it.link">{{it.title}}</a>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
    <!--新媒体-->
    <el-collapse accordion style="margin-top: 1px">
      <el-collapse-item class="p-l-15 p-r-15">
        <template slot="title">
          <i class="icon icon_weichat"></i>&nbsp; 微信
        </template>
        <div style="width: 70%;
padding: 0;
border: 1px solid #e9e9e9;
box-sizing: border-box;
margin: 10px auto;"><img src="https://img.aimer.com.cn/theme/201706/wap/images/scan.gif?1472" class="img-response">
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="contacts p-15">
      <a class="el-collapse-item__header" style="border-top: 1px solid #e9e9e9"
         href="https://weibo.com/u/2302390042?topnav=1&wvr=6&topsug=1&is_all=1"
         target="_blank">
        <i class="icon icon_sina"></i>微博
      </a>
    </div>
    <!--订阅&&搜索线下门店-->
    <!--<div class="p-15 form">-->
    <!--<div class="input-item">-->
    <!--<div class="input-label">订阅电子快报</div>-->
    <!--<div class="input-box">-->
    <!--<input type="text" placeholder="输入邮箱地址">-->
    <!--<div class="button">订阅</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="input-item addr">-->
    <!--<div class="input-label">线下门店</div>-->
    <!--<div class="input-box">-->
    <!--<input type="text" placeholder="城市，地区">-->
    <!--<div class="button darken">搜索</div>-->
    <!--<i class="icon icon_adress"></i>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <a class="d-block download" href="http://m.aimer.com.cn/method/xiazai">
      <p>APP下载</p>
      <p class="device"><i class="icon_android icon"></i>|<i class="icon_apple icon"></i></p>
    </a>
    <div class="intr">
      <p>北京爱慕电子商务科技有限公司©2015-2020</p>
      <p>aimer.com.cn All Rights Reserved</p>
      <p>京ICP备14050669号-1 www.aimer.com.cn</p>
      <p>北京市朝阳公安分备案编号：110105005347</p>
    </div>
    <ul class="icon-con">
      <li><img src="https://img.aimer.com.cn/theme/201706/wap/css/images/copy_icon_01.jpg"></li>
      <li>
        <a href="https://si.trustutn.org/info?sn=170160808023563231607&amp;certType=1" target="_self">
          <img src="https://v.trustutn.org/images/cert/p2p_official_large.jpg">
        </a>
      </li>
      <li>
        <a href="https://v.pinpaibao.com.cn/cert/site/?site=www.aimer.com.cn&amp;at=business" target="_self">
          <img src="https://static.anquan.org/static/outer/image/hy_124x47.png">
        </a>
      </li>
      <li>
        <span
          style="position: relative !important;display: inline-block !important;width:131px !important;height:47px !important;">
          <a href="https://ss.knet.cn/verifyseal.dll?sn=e15110311011361263b0sn000000&amp;ct=df&amp;pa=lq0fXNiLFoyYwBsR"
             oncontextmenu="return false;"
             style="display:inline-block !important;width:131px !important;height:47px !important;" target="_blank">
            <img id="pbc0cvwc6kjxpexmgz" class="act" height="47px" alt="可信网站"
                 style="opacity: 1; display: block !important; width: 131px !important; height: 47px !important; position: absolute !important; top: 0px !important; left: 0px !important; border: none !important;"
                 src="https://rr.knet.cn/static/images/newLogo/star4.png"/>
          <img id="r17bu7jdb8jxpexmgz" class="" height="47px" alt="可信网站"
               style="opacity: 0; display: block !important; width: 131px !important; height: 47px !important; position: absolute !important; top: 0px !important; left: 0px !important; border: none !important;"
               src="https://rr.knet.cn/static/images/newLogo/3Y9M.png"/>
        </a>
        </span>
      </li>
      <div class="w clear"></div>
      <li class="w33"><img src="https://img.aimer.com.cn/theme/201706/wap/css/images/copy_icon_02.jpg"></li>
      <li class="w33"><img src="https://img.aimer.com.cn/theme/201706/wap/css/images/copy_icon_03.jpg"></li>
      <li class="w33"><img src="https://img.aimer.com.cn/theme/201706/wap/css/images/copy_icon_04.jpg"></li>
    </ul>
    <!--<div id="toTop" @click="toTop" style="display: block;"></div>-->
  </footer>
</template>

<script>
	import SectionTitle from '@/components/SectionTitle.vue'

	export default {
		name: "Footer",
		data() {
			return {
				footers: [],
				contacts: [],
				websites: [],
				load: false,
				goodid: this.$route.query.goods_id || ''
			}
		},
		components: {SectionTitle},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				this.$axios.get("data/mock.json").then((res) => {
					this.footers = res.data.data.footers;
					this.contacts = res.data.data.contacts;
					this.websites = res.data.data.websites;
					setTimeout(() => {
						this.load = true
					}, 100)
				})
			},
			toKfu(id) {
				// //打开在线客服的函数
				// goToOnlineKf : function(){
				// 	var goods_id = $( "#goods_id" ).val();
				// 	window.open( "http://m.aimer.com.cn/index/talker?goodid=" + goods_id );
				// },
				if (id == 5) {
					window.open("http://m.aimer.com.cn/index/talker?goodid=" + this.goods_id);
				}
			},
			toTop() {
				document.documentElement.scrollTop = 0
			},
		}
	}
</script>

<style lang="scss" scoped>
  .footer {
    position: relative;
    left: 0;
    top: 0;
  }

  .system {
    border-bottom: 1px solid #E9E9E9;
  }

  .footer .collapse:first-child {
    margin-top: 10px;
  }

  .collapse {
    .ul {
      padding-left: 10px;
    }

    .li {
      color: #333333;

      padding: 19px 0 19px 10px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);

      & + .li {
        border-top: 1px solid rgba(233, 233, 233, 1);
        a {
          font-weight: normal;
        }
      }
    }
  }

  .website {
    .ul {
      padding-left: 25px;
      background: rgba(241, 241, 241, 1);
    }
  }

  .contacts {
    /*border-top: 1px solid #e9e9e9;*/

    .icon {
      margin-right: 10px;
    }
  }

  .form {
    padding-bottom: 25px;

    .input-item {
      padding-top: 25px;
      padding-bottom: 15px;
    }

    .input-label {
      font-size: 12px;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
      padding-left: 10px;
      padding-bottom: 20px;
    }

    .input-box {
      position: relative;
      left: 0;
      top: 0;
    }

    .input-box input {
      height: 35px;
      background: rgba(242, 242, 242, 1);
      padding-left: 10px;
      width: calc(100% - 112px);
      border: none;
    }

    .input-item.addr {
      input {
        padding-left: 27px;
      }

      .icon {
        position: absolute;
        left: 10px;
        top: 9px;
      }
    }
  }

  .icon {
    margin-top: -3px;
  }

  .download {
    text-align: center;
    font-size: 12px;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    color: #333333;
    padding: 40px 20px;

    .device {
      padding-top: 10px;
      width: 96px;
      font-size: 24px;
      display: inline-flex;
      align-items: center;
      color: rgba(204, 204, 204, 0.5);
      justify-content: space-between;
    }
  }

  .intr {
    margin-bottom: 20px;

    p {
      text-align: center;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 1px;
      font-family: SimHei, 黑体, "Microsoft YaHei", "微软雅黑";
      color: #333333;
    }
  }

  .icon-con {
    width: 100%;
    padding: 15px 5% 5px;
    overflow: hidden;
    background: #E9E9E9;

    li {
      width: 23%;
      display: inline-block;
      margin: 0 1% 5px;

      img {
        width: 100%;
        vertical-align: baseline;
      }
    }

    .w33 {
      width: 30%;
    }
  }

  #toTop {
    background: transparent url("./../assets/images/bar_backtop.svg") no-repeat scroll 0 0;
    bottom: 20px;
    height: 40px;
    opacity: 0.8;
    position: absolute;
    right: 11px;
    width: 40px;
    z-index: 999;
    display: none;
  }
</style>
