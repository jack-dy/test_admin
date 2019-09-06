<template>
  <div class="inline-table">
      <el-table :data="tableData" class="table-box" :height="tHeight">
          <el-table-column align="center" label="序号" width="60">
              <template slot-scope="{row}">
                  <span>{{row.id}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="课程名称" width="220">
              <template slot-scope="{row}">
                  <template v-if="row.edit">
                      <el-input v-model="row.name" size="small"></el-input>
                      <el-button
                      class="cancel-btn"
                      size="small"
                      icon="el-icon-refresh"
                      type="warning"
                      @click="cancelEdit(row)"
                      >
                          取消
                      </el-button>
                  </template>
                  <span v-else>{{row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="课程等级" width="80">
              <template slot-scope="{row}">
                  <span>{{row.level}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="类型" width="60">
              <template slot-scope="{row}">
                  <span>{{row.type}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="报名人数" width="80">
              <template slot-scope="{row}">
                  <span>{{row.num}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="上线日期" width="100">
              <template slot-scope="{row}">
                  <span>{{row.date}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="160">
              <template slot-scope="{row}">
                  <el-button
                    v-if="row.edit"
                    type="success"
                    size="small"
                    icon="el-icon-circle-check-outline"
                    @click="confirmEdit(row)"
                  >保存</el-button>
                  <el-button
                  v-else
                  type="primary"
                  size="small"
                  icon="el-icon-edit"
                  @click="row.edit=!row.edit"
                  >编辑</el-button>
              </template>
          </el-table-column>
      
      </el-table>
  </div>
</template>
<script>
import {fetchList, updatename} from "@/api/course"
export default {
    name: 'inLineTable',
    components:{},
    data(){
        return{
            tHeight:(document.body.offsetHeight - 270),
            tableData:[],
            page:1,
            size:5,
            total:0,
            dialogVisible:false
        }
    },
    methods:{
        async loadList(){
            let listQuery={
                'page':this.page,
                'limit':this.size
            }
            const res = await fetchList(listQuery);
            const lists =res.data.data.list;
            this.tableData = lists.map(v=>{
                this.$set(v,'edit',false)
                v.originalName = v.name
                return v;
            })
        },
        cancelEdit(row){
            row.name=row.originalName
            row.edit=false
            this.$message({
                message: '取消修改',
                type: 'warning'
            })
        },
        confirmEdit(row){
           row.originalName=row.name
            row.edit=false 
            updatename(row)
        }
    },
    created(){
        this.loadList();
    }
}
</script>
<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>