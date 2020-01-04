<template>
  <div class="p-l-15 h-100 p-r-15" style="cursor: pointer" @click="goBack()"><i class="icon icon_goback"></i></div>
</template>

<script>

	export default {
		name: "Goback",
		props: ['to'],
		methods: {
			goBack() {
				if (this.to) {
					this.$router.push(this.to)
				} else {
					this.$router.back()
				}
			}
		}
	}
</script>

<style scoped>

</style>
