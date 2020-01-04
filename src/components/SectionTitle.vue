<template>
  <section class="header">
    <h2 class="zn">
      {{zn}}
    </h2>
    <p class="en">{{en}}</p>
  </section>
</template>

<script>
	export default {
		name: "SectionTitle",
		props: ['zn', 'en']
	}
</script>

<style scoped lang="scss">
  .header {
    padding: 26px 20px 13px 20px;
    text-align: center;
    border-top: 1px solid rgba(233, 233, 233, 1);
  }

  .zn {
    font-size: 22px;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    padding-bottom: 6px;
  }

  .en {
    font-size: 16px;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
  }
</style>
