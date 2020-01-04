<template>
  <!--订单列表 无用-->
  <section class="order" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>全部订单</template>
    </NavHeader>
    <main class="main">
      <div class="tabs">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="全部" name="first">
            <!--begin-->
            <div class="m-b-10 bg-white">
              <div class="prd-title">订单号:17062182837364 <span>2017.06.21 11:45:05</span></div>
              <div class="prd">
                <div class="img-box m-r-10">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
                <div class="intr">
                  <div>
                    <p class="info">
                      <i class="icon icon_dz m-r-5"></i>AIMER PERSONALIZATION爱慕定制复古蕾丝内衣AM440581
                    </p>
                    <p class="feature">颜色：定制色 尺码：75B</p>
                  </div>
                  <div class="price">
                    <span class="single">¥299</span>
                    <span class="number">×1</span>
                  </div>
                </div>
              </div>
              <div class="prd-status">订单状态：已付款</div>
              <div class="prd-action">
                <div class="button lighten m-r-10">查看物流</div>
                <div class="button">确认收货</div>
              </div>
            </div>
            <!--end-->
            <div class="m-b-10 bg-white">
              <div class="prd-title">订单号:17062182837364 <span>2017.06.21 11:45:05</span></div>
              <div class="prd">
                <div class="img-box m-r-10">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
                <div class="intr">
                  <div>
                    <p class="info">
                      <i class="icon icon_dz m-r-5"></i>AIMER PERSONALIZATION爱慕定制复古蕾丝内衣AM440581
                    </p>
                    <p class="feature">颜色：定制色 尺码：75B</p>
                  </div>
                  <div class="price">
                    <span class="single">¥299</span>
                    <span class="number">×1</span>
                  </div>
                </div>
              </div>
              <div class="prd-status">订单状态：已关闭</div>
              <div class="prd-action">
                <div class="button lighten m-r-10">删除订单</div>
              </div>
            </div>
            <div class="m-b-10 bg-white">
              <div class="prd-title">订单号:17062182837364 <span>2017.06.21 11:45:05</span></div>
              <div class="prd">
                <div class="img-box m-r-10">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
                <div class="intr">
                  <div>
                    <p class="info">
                      <i class="icon icon_dz m-r-5"></i>AIMER PERSONALIZATION爱慕定制复古蕾丝内衣AM440581
                    </p>
                    <p class="feature">颜色：定制色 尺码：75B</p>
                  </div>
                  <div class="price">
                    <span class="single">¥299</span>
                    <span class="number">×1</span>
                  </div>
                </div>
              </div>
              <div class="prd-status">订单状态：已关闭</div>
              <div class="prd-action">
                <div class="button lighten m-r-10">删除订单</div>
              </div>
            </div>
            <div class="m-b-10 bg-white">
              <div class="prd-title">订单号:17062182837364 <span>2017.06.21 11:45:05</span></div>
              <div class="prd">
                <div class="img-box m-r-10">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
                <div class="intr">
                  <div>
                    <p class="info">
                      <i class="icon icon_dz m-r-5"></i>AIMER PERSONALIZATION爱慕定制复古蕾丝内衣AM440581
                    </p>
                    <p class="feature">颜色：定制色 尺码：75B</p>
                  </div>
                  <div class="price">
                    <span class="single">¥299</span>
                    <span class="number">×1</span>
                  </div>
                </div>
              </div>
              <div class="prd-status">订单状态：已关闭</div>
              <div class="prd-action">
                <div class="button lighten m-r-10">删除订单</div>
              </div>
            </div>
            <div class="m-b-10 bg-white">
              <div class="prd-title">订单号:17062182837364 <span>2017.06.21 11:45:05</span></div>
              <div class="prd">
                <div class="img-box m-r-10">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
                <div class="intr">
                  <div>
                    <p class="info">
                      <i class="icon icon_dz m-r-5"></i>AIMER PERSONALIZATION爱慕定制复古蕾丝内衣AM440581
                    </p>
                    <p class="feature">颜色：定制色 尺码：75B</p>
                  </div>
                  <div class="price">
                    <span class="single">¥299</span>
                    <span class="number">×1</span>
                  </div>
                </div>
              </div>
              <div class="prd-status">订单状态：已关闭</div>
              <div class="prd-action">
                <div class="button lighten m-r-10">删除订单</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="定制订单" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="待付款" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="待收货" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="待评价" name="five">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </main>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'

	export default {
		name: "Order",
		data() {
			return {
				loaded: true,
				activeName: 'first'
			};
		},
		components: {
			NavHeader,
			Goback
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>

<style scoped lang="scss">
  .prd-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
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

  .prd-status {
    height: 45px;
    line-height: 45px;
    padding: 0 10px;
    font-size: 13px;
    border-top: 1px solid #e9e9e9;
  }

  .prd-action {
    padding: 10px;
    text-align: right;
    border-top: 1px solid #e9e9e9;

    .button {
      width: 83px;
      height: 30px;
      border-radius: 3px;
      line-height: 30px;
      font-size: 13px;
    }
  }
</style>
