<template>
  <section class="make_size" v-if="loaded">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>测量我的尺码</template>
    </NavHeader>
    <main class="main bg-white">
      <div class="tabs">
        <el-tabs v-model="activeName" type="card" :stretch="true">
          <el-tab-pane label="儿童" name="first">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="文胸" name="1"></el-collapse-item>
              <el-collapse-item title="内裤" name="2"></el-collapse-item>
              <el-collapse-item title="文胸" name="3"></el-collapse-item>
              <el-collapse-item title="内裤" name="4"></el-collapse-item>
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
		name: "MakeSize",
		components: {
			NavHeader,
			Goback,
		},
		metaInfo() {
			return {
				title: '测量我的尺码'
			}
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

</style>
