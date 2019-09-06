<template>
    <div class="layout">
        <!-- 头部 -->
        <layoutHeader/>

        <!-- 内容 -->
        <Content>
            <Sidebar slot="left"></Sidebar>
            <router-view slot="content"></router-view>
        </Content>
    </div>
</template>
<script>
import layoutHeader from "./LayoutHeader.vue";
import Content from './Content.vue';
import Sidebar from './Sidebar.vue';
export default {
    name: 'layout',
    components: {
        layoutHeader,Content,Sidebar
    }
}
</script>
<style lang="scss" scoped>
.layout{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #f5f7f9;
}
</style>