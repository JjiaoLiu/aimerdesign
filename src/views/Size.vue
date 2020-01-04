<template>
  <section class="size" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>查看尺码</template>
    </NavHeader>
    <main class="main bg-white">
      <div class="tabs">
        <el-tabs v-model="activeName" type="card" :stretch="true">
          <el-tab-pane label="儿童" name="first">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="文胸" name="1">
                <div class="table">
                  <p class="tip">女士保暖上衣尺码参考：</p>
                  <div class="table-header">
                    <div class="row">
                      <div class="col">型号</div>
                      <div class="col">身高(CM)</div>
                      <div class="col">胸围</div>
                    </div>
                  </div>
                  <div class="table-body">
                    <div class="row">
                      <div class="col">155/80(s)</div>
                      <div class="col">155-160</div>
                      <div class="col">77-82</div>
                    </div>
                    <div class="row">
                      <div class="col">155/80(s)</div>
                      <div class="col">155-160</div>
                      <div class="col">77-82</div>
                    </div>
                    <div class="row">
                      <div class="col">155/80(s)</div>
                      <div class="col">155-160</div>
                      <div class="col">77-82</div>
                    </div>
                    <div class="row">
                      <div class="col">155/80(s)</div>
                      <div class="col">155-160</div>
                      <div class="col">77-82</div>
                    </div>
                    <div class="row">
                      <div class="col">155/80(s)</div>
                      <div class="col">155-160</div>
                      <div class="col">77-82</div>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="内裤" name="2">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="文胸" name="3">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="内裤" name="4">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="女士" name="second">

          </el-tab-pane>
          <el-tab-pane label="男士" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </main>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'
	// import {getSign} from '@/utils'
	export default {
		metaInfo() {
			return {
				title: '查看尺码'
			}
		},
		name: "Size",
		components: {
			NavHeader,
			Goback,
		},
		data() {
			return {
				loaded: true,
				activeNames: 1,
				activeName: 'first',
				allData: {
					biaoqian: [{"text": "儿童", "url": "#"}, {"text": "女士", "url": "#"}, {"text": "男士", "url": "#"}]
				}
			}
		}
	}
</script>

<style scoped lang="scss">
  .table {
    text-align: center;
    padding: 20px 0;
    background-color: #FAFAFA;

  }

  .row {
    display: flex;
    justify-content: space-around;

    .table-body &:nth-child(2n), .table-header {
      height: 40px;
      line-height: 40px;
      background-color: #ffffff;
    }

    .table-body &:nth-child(2n+1) {
      height: 28px;
      line-height: 28px;
      background-color: #E9E9E9;
    }
  }

  .tip {
    padding-bottom: 20px;
    font-size: 12px;
    line-height: 18px;
  }
</style>
