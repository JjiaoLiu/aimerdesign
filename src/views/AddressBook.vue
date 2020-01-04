<template>
  <section class="address_book">
    <NavHeader>
      <template v-slot:left>
        <Goback/>
      </template>
      <template v-slot:center>收货地址</template>
    </NavHeader>
    <main class="main" v-if="loaded">
      <div class="list-wrap">
        <div class="list m-b-10 bg-white" v-for="item in data" :key="item.id">
          <div class="address" @click="saveAddressToOrder(item)">
            <div class="left">
              <i :class="['icon',item.default_flag === 'yes' ? 'icon_radio_checked' : 'icon_radio']"></i>
            </div>
            <div class="right">
              <p class="p">
                <span class="p-1">收货人：{{item.user_name}}
                   <i v-if="item.default_flag === 'yes'" class="icon icon_default_address"></i>
                </span>
                <span class="p-2">{{item.mobile}}</span>
              </p>
              <p class="p-3">收货地址：{{item.province}}{{item.city}}{{item.county}}{{item.address}}</p>
            </div>
          </div>
          <div class="action p-15">
            <span class="edit" @click="$router.push(`/edit_address?id=${item.id}`)"><i class="icon icon_edit m-r-5"></i>编辑</span>
            <span class="delete" @click="deleteAddress(item.id,index)"><i class="icon icon_delete m-r-5"></i>删除</span>
          </div>
        </div>
      </div>
    </main>
    <div class="action-section bg-white">
      <div class="button" @click="$router.push(`/edit_address`)">添加新地址</div>
    </div>
  </section>
</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import Goback from '@/components/Goback.vue'
	import {getSign} from '@/utils'
	import {mapMutations} from 'vuex'

	export default {
		name: "AddressBook",
		components: {
			NavHeader,
			Goback
		},
		data() {
			return {
				loaded: false,
				data: null
			}
		},
		metaInfo() {
			return {
				title: '收货地址'
			}
		},
		created() {
			this.getData()
		},
		methods: {
			...mapMutations([
				'setAddressStore'
			]),
			getData() {
				this.$axios.post("/aimerdesign", {
					"partner": "aimerdesign",
					"version": "1.0",
					"timestamp": parseInt((new Date().getTime()) / 1000),
					"method": "personal_address_list",
					"params": {},
					"sign": getSign({})
				}).then((res) => {
					console.log('personal_address_list', res.data.data);
					this.data = res.data.data;
					this.loaded = true
				}).catch((err) => {
					console.log(err)
				})
			},
			saveAddressToOrder(item) {
				this.setAddressStore({checkout_address: item});
				this.$router.push(`/submit_order`);
			},
			deleteAddress(id) {
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.post("/aimerdesign", {
						"partner": "aimerdesign",
						"version": "1.0",
						"timestamp": parseInt((new Date().getTime()) / 1000),
						"method": "personal_address_delete",
						"params": {id: id},
						"sign": getSign({id: id})
					}).then((res) => {
						this.getData();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch((err) => {
						this.$message({
							type: 'error',
							message: '删除失败!'
						});
						console.log(err)
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>

<style scoped lang="scss">
  .list-wrap {
    padding-bottom: 0.1px;
    margin-bottom: 84px;
  }

  .list {
    .address {
      padding: 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
    }

    .right {
      margin-left: 10px;
      width: 100%;
      .p {
        padding-bottom: 5px;
        display: flex;
        justify-content: space-between;
      }

      .p-1, .p-2 {
        font-size: 14px;
        line-height: 18px;
      }

      .p-3 {
        font-size: 13px;
        line-height: 16px;
      }
    }

    .action {
      display: flex;
      justify-content: flex-end;
      height: 45px;
      align-items: center;
      font-size: 12px;

      .edit, .delete {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
      }

      .edit {
        margin-right: 20px;
      }
    }
  }

  .action-section {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 84px;
    display: flex;
    align-items: center;
    padding: 20px;
    border-top: 1px solid #e9e9e9;

    .button {
      width: 100%;
      height: 100%;
      line-height: 45px;
    }
  }
</style>
