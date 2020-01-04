<template>
  <section class="order_progress" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>查看定制进度</template>
    </NavHeader>
    <main class="main">
      <div class="bg-white m-b-10">
        <div class="prd">
          <div class="img-box m-r-10">
            <img src="/img/goods_pic_1.png" class="img-response"/>
          </div>
          <div class="intr">
            <div>
              <p class="info">AIMER PERSONALIZATION爱慕定制复古蕾丝内衣AM440581</p>
              <p class="feature">颜色：定制色 尺码：75B</p>
            </div>
            <div class="price">
              <span class="single">¥299</span>
              <span class="number">×1</span>
            </div>
          </div>
        </div>
      </div>
      <div class="collapse m-b-10">
        <el-collapse accordion v-model="activeNames">
          <el-collapse-item name="activeNames">
            <template slot="title">
              <div class="title">
                工厂已发货<br>
                <span class="small">2019/05/22 20:30:00</span>
              </div>
            </template>
            <div class="steps">
              <div class="step" @click="fullscreen = true">
                <div class="cricle"></div>
                <div class="dis">
                  <p>流程时间时间时间时间</p>
                  <p>时间时间时间时间</p>
                  <u>查看大图</u>
                </div>
                <div class="img_box">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
              </div>
              <div class="step">
                <div class="cricle"></div>
                <div class="dis">
                  <p>流程时间时间时间时间</p>
                  <p>时间时间时间时间</p>
                  <u>查看大图</u>
                </div>
                <div class="img_box">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
              </div>
              <div class="step">
                <div class="cricle"></div>
                <div class="dis">
                  <p>流程时间时间时间时间</p>
                  <p>时间时间时间时间</p>
                  <u>查看大图</u>
                </div>
                <div class="img_box">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
              </div>
              <div class="step">
                <div class="cricle"></div>
                <div class="dis">
                  <p>流程时间时间时间时间</p>
                  <p>时间时间时间时间</p>
                  <u>查看大图</u>
                </div>
                <div class="img_box">
                  <img src="/img/goods_pic_1.png" class="img-response"/>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="collapse m-b-10">
        <el-collapse accordion v-model="activeNames">
          <el-collapse-item>
            <template slot="title" name="activeNames">
              <div class="title">
                定制详情
              </div>
            </template>
            <div class="list-wrap">
              <div class="list-item">
                <div class="left">
                  <el-image src="/img/goods_pic_1.png" fit="contain"></el-image>
                </div>
                <div class="right">
                  <p class="type">罩杯面料：</p>
                  <p class="data">
                    颜色：肉桂粉 <br>
                    材质：聚酯纤维 <br>
                    其他：描述描述描述描述描述描述描述 <br>
                  </p>
                </div>
              </div>
              <div class="list-item">
                <div class="left">
                  <el-image src="/img/goods_pic_1.png" fit="contain"></el-image>
                </div>
                <div class="right">
                  <p class="type">罩杯面料：</p>
                  <p class="data">
                    颜色：肉桂粉 <br>
                    材质：聚酯纤维 <br>
                    其他：描述描述描述描述描述描述描述 <br>
                  </p>
                </div>
              </div>
              <div class="list-item">
                <div class="left">
                  <el-image src="/img/goods_pic_1.png" fit="contain"></el-image>
                </div>
                <div class="right">
                  <p class="type">罩杯面料：</p>
                  <p class="data">
                    颜色：肉桂粉 <br>
                    材质：聚酯纤维 <br>
                    其他：描述描述描述描述描述描述描述 <br>
                  </p>
                </div>
              </div>
              <div class="list-item">
                <div class="left">
                  <el-image src="/img/goods_pic_1.png" fit="contain"></el-image>
                </div>
                <div class="right">
                  <p class="type">罩杯面料：</p>
                  <p class="data">
                    颜色：肉桂粉 <br>
                    材质：聚酯纤维 <br>
                    其他：描述描述描述描述描述描述描述 <br>
                  </p>
                </div>
              </div>
              <div class="list-item">
                <div class="left">
                  <el-image src="/img/goods_pic_1.png" fit="contain"></el-image>
                </div>
                <div class="right">
                  <p class="type">罩杯面料：</p>
                  <p class="data">
                    颜色：肉桂粉 <br>
                    材质：聚酯纤维 <br>
                    其他：描述描述描述描述描述描述描述 <br>
                  </p>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </main>
    <transition name="el-fade-in-linear">
      <div class="fullscreen" v-if="fullscreen" @click="fullscreen = false">
        <el-image style="width: 100%; height: 100%" src="/img/goods_pic_1.png" fit="contain"></el-image>
      </div>
    </transition>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'
	// import {getSign} from '@/utils'

	export default {
		name: "OrderProgress",
		components: {
			NavHeader,
			Goback,
		},
		metaInfo() {
			return {
				title: '查看定制进度'
			}
		},
		data() {
			return {
				fullscreen: false,
				loaded: true,
				radio: 1,
				activeNames: "activeNames"
			}
		}
	}
</script>

<style scoped lang="scss">

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

  .collapse .title {
    font-size: 14px;
    padding: 15px 10px;
    line-height: 18px;

    .small {
      font-size: 12px;
      padding-top: 5px;
      line-height: 16px;
    }
  }

  .steps {
    padding: 15px 25px 5px;
    border-top: 1px solid #e9e9e9;

    .step {
      padding-bottom: 10px;
      display: flex;
      align-items: center;

      &:first-child {
        .cricle {
          background-color: #BEA479;
        }
      }

      + .step {
        .cricle::before {
          content: '';
          display: table;
          position: absolute;
          height: 68px;
          width: 1px;
          left: 4.5px;
          bottom: 10px;
          background: #cccccc;
        }
      }
    }

    .cricle {
      width: 10px;
      height: 10px;
      background: rgba(204, 204, 204, 1);
      border-radius: 5px;
      margin-right: 20px;
      position: relative;
      left: 0;
      top: 0;
    }

    .dis {
      font-size: 12px;
      width: 120px;
      line-height: 18px;
      margin-right: 30px;
    }

    .img_box {
      width: 100px;
      height: 67px;
      overflow: hidden;
      background: rgba(216, 216, 216, 1);
    }
  }

  .fullscreen {
    width: 100%;
    position: fixed;
    padding: 40px;
    height: 100%;
    z-index: 7;
    left: 0;
    top: 0;
    background-color: #000000;
  }

  .list-item {
    display: flex;
    padding: 10px 25px;
    border-top: 1px solid #e9e9e9;

    .left {
      width: 60px;
      height: 60px;
      margin-right: 30px;
      border-radius: 30px;
      overflow: hidden;
    }

    .type {
      font-size: 14px;
      line-height: 18px;
      padding-bottom: 13px;
    }

    .data {
      font-size: 12px;
      line-height: 16px;
      color: rgba(102, 102, 102, 1);
    }
  }
</style>
