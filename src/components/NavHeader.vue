<template>
    <header class="nav">
        <slot name="left"><i></i></slot>
        <div class="center">
            <slot name="center"><i></i></slot>
        </div>
        <slot name="right"><i></i></slot>
    </header>
</template>

<script>
    export default {
        name: "NavHeader"
    }
</script>

<style scoped lang="scss">
    .nav {
        background-color: #ffffff;
        border-bottom: 1px solid rgba(233, 233, 233, 1);
        height: 50px;
        z-index: 6;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > * {
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .center {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
            font-size: 18px;
            color: #333333;
            text-align: center;
        }
    }


</style>
