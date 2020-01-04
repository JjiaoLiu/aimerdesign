<template>
  <section class="submit_order" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <Goback :to="'/goods_detail?goods_id='+ $store.state.goods_id"/>
      </template>
      <template v-slot:center>确认订单信息</template>
    </NavHeader>
    <main class="main">
      <div class="bg-white m-b-10">
        <!--<div class="zt type">-->
        <!--<div class="label">-->
        <!--<div class="radio">-->
        <!--<i class="icon icon_radio"></i>-->
        <!--</div>-->
        <!--<div class="for">-->
        <!--<p class="title">门店自提</p>-->
        <!--<div class="data">请选择您要提货的实体店（具体的提货时间取决于您所在的城市）</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="add_data">-->
        <!--<i class="icon icon_right"></i>-->
        <!--</div>-->
        <!--</div>-->
        <div class="dlv type" @click="$router.push('/address_book')">
          <div class="label">
            <div class="radio">
              <i class="icon icon_radio_checked"></i>
            </div>
            <div class="for">
              <p class="title">快递上门</p>
              <div class="data" v-if="checkout.checkout_address">
                <p>收货人：{{checkout.checkout_address.user_name}}</p>
                <p>
                  地址：{{checkout.checkout_address.province}}{{checkout.checkout_address.city}}{{checkout.checkout_address.county}}{{checkout.checkout_address.address}}</p>
                <p>联系电话：{{checkout.checkout_address.mobile}}</p>
                <!--<p>营业时间：{{ checkout.checkout_address.user_name}}</p>-->
              </div>
              <div v-else class="data">请选择您的送货地址（具体的寄送时间取决于您所在的城市）</div>
            </div>
          </div>
          <div class="add_data">
            <i class="icon icon_right"></i>
          </div>
        </div>
      </div>
      <div class="bg-white">
        <div class="prd-title">定制商品</div>
        <div class="prd" v-for="item in checkout.checkout_productlist" :key="item.productid">
          <div class="img-box m-r-10">
            <div v-if="rate">
              <img :src="activeDesign.layers[0].front_img_url" style="width: 93px"/>
              <div v-if="activeDesign.diys && activeDesign.diys.position" class="p-absolute diys-layer" :style="{
                    'color': activeDesign.diys.customize_content ? activeDesign.diys.customize_content.content : '#515151',
                    'left': (activeDesign.diys.position.x_position - activeDesign.diys.position.width/2) * rate + 'px',
                    'top': (activeDesign.diys.position.y_position - activeDesign.diys.position.height/2) * rate + 'px',
                    'width': activeDesign.diys.position.width * rate + 'px',
                    'height': activeDesign.diys.position.height * rate + 'px',
                    'backgroundImage': activeDesign.diys.content.img_url ? 'url(' + activeDesign.diys.content.img_url + ')' : 'url(' + activeDesign.diys.customize_img_url + ')',
                    }" v-html="txt">
                {{activeDesign.diys.customize_text}}
              </div>
            </div>
            <img :src="item.imgurl" class="img-response" v-else/>
          </div>
          <div class="intr">
            <div>
              <p class="info">{{item.name}}</p>
              <p class="feature">颜色：{{item.color}} 尺码：{{item.size}}</p>
            </div>
            <div class="price">
              <span class="single">¥{{item.price}}</span>
              <span class="number">×{{item.num}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white m-b-10">
        <div class="list-item">支付方式<span>在线支付</span></div>
        <!--<div class="list-item">电子券<span><i class="icon icon_right"></i></span></div>-->
        <!--<div class="list-item">优惠券<span><i class="icon icon_right"></i></span></div>-->
        <!--<div class="list-item">包邮卡<span><span>{{checkout.checkout_usefreepost}}</span></span></div>-->
        <!--<div class="list-item">会员卡<span><span>{{checkout.checkout_usev6cardsres}}</span></span></div>-->
        <div class="list-item flex-start">订单附言：
          <input type="text" v-model="checkout.checkout_customer_memo" maxlength="50"
                 placeholder="添加您需要备注的内容，50字以内"></div>
      </div>
      <div class="bg-white" style="margin-bottom: 50px">
        <div class="list-item-2" v-for="(item,index) in checkout.checkout_statistics" :key="index">
          {{item.name}} <span>{{item.value}}</span>
        </div>
      </div>
    </main>
    <div class="action-section">
      <div>
        <span class="actual_price">实付款¥{{checkout.checkout_amount}}</span> <br>
        <span class="score" v-if="checkout.checkout_total_score">可获得积分：{{checkout.checkout_total_score}}</span>
      </div>
      <div class="button" @click="submitOrder">提交订单</div>
    </div>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'
	import {mapMutations, mapState} from 'vuex'
	import {getSign, markTxt} from '@/utils'

	export default {
		name: "SubmitOrder",
		metaInfo() {
			return {
				title: '确认订单'
			}
		},
		components: {
			NavHeader,
			Goback,
		},
		data() {
			return {
				loaded: true,
				radio: 1
			}
		},
		computed: {
			...mapState(['checkout', 'activeDesign']),
			rate() {
				if (this.activeDesign && this.activeDesign.layers)
					return this.getImageRate(this.activeDesign.layers[0].front_img_url);
				return 0
			},
			txt() {
				if (this.activeDesign.diys && this.activeDesign.diys.customize_text) {
					return markTxt(this.activeDesign.diys.customize_text, this.activeDesign.diys.customize_content && this.activeDesign.diys.customize_content.content)
				}
				return ''
			},
		},
		created() {
			if (!this.checkout.checkout_productlist) {
				this.$router.push('/home')
			}
		},
		methods: {
			...mapMutations([
				'setAddressStore',
				'setCheckoutStore'
			]),
			getImageRate(url) {
				var img = new Image();
				img.src = url;
				return ((93) / img.width).toFixed(4)
			},
			submitOrder() {
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "checkout_submit",
					"params": {
						address_id: this.checkout.checkout_address.id,
						amount: this.checkout.checkout_amount,
						customer_memo: this.checkout.checkout_customer_memo,
						goods_id: this.checkout.checkout_goodsid,
						number: this.checkout.checkout_productlist[0].num,
						product_id: this.checkout.checkout_productlist[0].productid,
						recommend_id: this.checkout.checkout_recommend_id,
						user_design_id: this.checkout.checkout_design_id
					},
					"sign": getSign({
						address_id: this.checkout.checkout_address.id,
						amount: this.checkout.checkout_amount,
						customer_memo: this.checkout.checkout_customer_memo,
						goods_id: this.checkout.checkout_goodsid,
						number: this.checkout.checkout_productlist[0].num,
						product_id: this.checkout.checkout_productlist[0].productid,
						recommend_id: this.checkout.checkout_recommend_id,
						user_design_id: this.checkout.checkout_design_id
					})
				}).then((res) => {
					window.location.href = res.data.data.url;
				}).catch((err) => {
					console.log('checkout_submit', "err", err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
  .type {
    padding: 25px 15px 25px 10px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .label {
    display: flex;
    align-items: flex-start;

    .radio {
      margin-right: 12px;
    }

    .icon {
      margin: 0;
    }

    .title {
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      padding-bottom: 5px;
    }

    .data {
      font-size: 12px;
      line-height: 16px;
    }
  }

  .prd-title {
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #e9e9e9;
  }

  .prd {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #e9e9e9;
    .img-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 93px;
      position: relative;
      left: 0;
      top: 0;
    }

    .intr {
      display: inline-flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: space-between;
    }

    .info {
      font-size: 14px;
      line-height: 18px;
      /*height: 100%;*/
      /*padding-bottom: 5px;*/
    }

    .feature {
      font-size: 12px;
      color: rgba(102, 102, 102, 1);
      line-height: 16px;
      padding-bottom: 5px;
    }

    .price {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;

      .single {
        font-size: 18px;
      }

      .number {
        font-size: 12px;
      }
    }
  }

  .list-item {
    padding: 15px 10px;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    justify-content: space-between;
    white-space: nowrap;

    &.flex-start {
      justify-content: flex-start;
    }
  }

  .list-item-2 {
    padding: 6px 10px;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;

    &.flex-start {
      justify-content: flex-start;
    }
  }

  input {
    border: none;
    outline: none;
    font-size: 14px;
    line-height: 18px;
    flex: 1;
  }

  .action-section {
    height: 50px;
    position: fixed;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
    padding: 7px 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;

    .actual_price {
      font-size: 16px;
      color: rgba(190, 164, 122, 1);
      line-height: 20px;
    }

    .score {
      font-size: 11px;
      line-height: 16px;
    }

    .button {
      width: 89px;
      height: 37px;
      border-radius: 4px;
      margin-left: 12px;
    }

  }

  .diys-layer {
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 100%;
    }
  }
</style>
