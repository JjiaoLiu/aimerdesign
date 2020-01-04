<template>
  <section class="submit_order" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>定制订单详情</template>
    </NavHeader>
    <main class="main">
      <div class="bg-white m-b-10">
        <div class="type">
          <i class="icon icon_position m-r-10"></i>
          <div class="data">
            <p class="name">店铺名称：北京王府井双安店 <span>010-59037173</span></p>
            <p class="get">取货地址：北京市海淀区北三环西路38号双安商场一层爱慕专卖店</p>
          </div>
        </div>
      </div>
      <div class="bg-white m-b-10">
        <div class="prd-title">定制商品</div>
        <div class="prd">
          <div class="img-box m-r-10">
            <img src="/img/goods_pic_1.png" class="img-response"/>
          </div>
          <div class="intr">
            <div>
              <p class="info"><i class="icon icon_dz"></i>AIMER PERSONALIZATION爱慕定制复古蕾丝内衣AM440581</p>
              <p class="feature">颜色：定制色 尺码：75B</p>
            </div>
            <div class="price">
              <span class="single">¥299</span>
              <span class="number">×1</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white m-b-10">
        <div class="list-title">
          订单信息
        </div>
        <div class="list-item-2">订单号<span>在线支付</span></div>
        <div class="list-item-2">订单时间<span><i class="icon icon_right"></i></span></div>
        <div class="list-item-2">订单状态<span><i class="icon icon_right"></i></span></div>
        <div class="list-item-2">支付方式<span><i class="icon icon_right"></i></span></div>
        <div class="list-item-2">订单备注<span></span></div>
      </div>
      <div class="bg-white m-b-10">
        <div class="list-item-2">商品金额 <span>在线支付</span></div>
        <div class="list-item-2">运费<span>在线支付</span></div>
        <div class="list-item-2">优惠券折扣<span>在线支付</span></div>
        <div class="list-item-2">活动优惠金额<span>在线支付</span></div>
        <div class="list-item-2">会员电子券抵扣<span>在线支付</span></div>
        <div class="list-item-2">订单总金额<span>在线支付</span></div>
        <div class="list-item-2">会员电子券抵扣<span>在线支付</span></div>
      </div>
      <div class="action-section">
        <p class="font">含运费</p>
        <p class="payed">已付款:￥950.00</p>
        <div>
          <div class="button lighten">查看定制进度</div>
          <div class="button">确认收货</div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'
	// import {getSign} from '@/utils'

	export default {
		name: "OrderDetail",
		metaInfo() {
			return {
				title: '定制订单详情'
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
		}
	}
</script>

<style scoped lang="scss">
  .type {
    padding: 25px 15px 25px 10px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    align-items: center;

    .data {
      flex-grow: 1;

      .name {
        font-size: 14px;
        line-height: 18px;
        padding-bottom: 5px;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
      }

      .get {
        font-size: 13px;
        line-height: 16px;
      }
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

    .img-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 93px;
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
      height: 100%;
      padding-bottom: 5px;
    }

    .feature {
      font-size: 12px;
      color: rgba(102, 102, 102, 1);
      line-height: 16px;
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

  .list-title {
    padding: 15px 10px;
    border-bottom: 1px solid #e9e9e9;
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
  }

  .action-section {
    height: 150px;
    /*position: fixed;*/
    width: 100%;
    border-top: 1px solid #e9e9e9;
    /*left: 0;*/
    /*bottom: 0;*/
    background-color: #ffffff;
    padding: 20px;
    text-align: center;

    .font {
      font-size: 12px;
      line-height: 16px;
      padding-bottom: 10px;
    }

    .payed {
      font-size: 16px;
      line-height: 20px;
      padding-bottom: 20px;
    }

    .button {
      width: calc(50% - 10px);
      border-radius: 4px;
      margin: 0 5px;
    }
  }

</style>
