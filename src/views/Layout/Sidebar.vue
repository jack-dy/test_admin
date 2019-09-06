<template>
    <el-scrollbar class="el-scrollbar">
        <el-menu class="el-menu-slide" :default-active="$router.currentRoute.path" router>
            <template
                v-for="item in routers"
            >
                <template v-if="item.hidden && item.children && item.children.length>0">
                    <el-menu-item
                        v-if="item.children.length==1"
                        :index="item.children[0].path"
                        :key="item.name"
                        >
                        <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
                        <span slot="title">{{item.children[0].meta.title}}</span>
                    </el-menu-item>
                    <!-- 多个子元素 -->
                    <el-submenu v-else :index="item.children[0].path" :key="item.name">
                        <template slot='title'>
                            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
                        </template>
                        <el-menu-item
                        v-for="child in item.children"
                        :index="child.path"
                        :key="child.name"
                        >
                            <i v-if="child.meta.icon" :class="child.meta.icon"></i>  
                            <span v-if="child.meta&&child.meta.title" slot='title'>{{child.meta.title}}</span>
                        </el-menu-item>
                    </el-submenu>

                </template>
            </template>
        </el-menu>
    </el-scrollbar>
</template>

<script>
// @ is an alias to /src

import {mapGetters} from 'vuex'
export default {
  name: 'Sidebar',
  components: {
    
  },
  methods:{

  },
   computed:{
    ...mapGetters(['routers'])  
  },
  data(){
      return {

      }
  }
}
</script>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>