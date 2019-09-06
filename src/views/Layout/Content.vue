<template>
  <el-container class="layout-content">
    <!-- 左侧菜单 -->
    <el-aside class="left-menu">
        <slot name='left'></slot>
    </el-aside>

    <!-- 右侧页面 -->
    <el-main>
        <!-- 面包屑 -->
        <div class="top">
            <i class="fa fa-reorder"></i>

            
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item
                v-for="(item,index) in breadCrumbItems" 
                :key="index"
                :to="{path:item.path}"
                >{{item.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 页面内容 -->
        <div class="content">
            <slot name="content"></slot>
        </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'layout-content',
//   components: {
    
//   },
  data(){
      return{
          breadCrumbItems:[]
      }
  },
  created(){
      console.log(this.$route);
      this.initBreadCrumbItems(this.$route)
  },
  methods:{
      initBreadCrumbItems(router){
          let breadCrumbItems=[{path:'/',title:'后台管理'}];
          for(const index in router.matched){
              if(router.matched[index].meta && router.matched[index].meta.title){
                  breadCrumbItems.push({
                      path:router.matched[index].path?router.matched[index].path:'/',
                      title:router.matched[index].meta.title
                  })
              }
          }
          this.breadCrumbItems = breadCrumbItems;
      }
  },
  watch:{
    //   '$route.path':function(newVal, oldVal){
    //       this.initBreadCrumbItems(newVal);
    //   }
     $route(to,from){
      this.initBreadCrumbItems(to);
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .left-menu{

  }
  .el-main {
    padding: 0;

    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>
