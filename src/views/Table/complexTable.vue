<template>
  <div class="complex-table">
      <el-table :data="tableData" class="table-box" :height="tHeight">
          <el-table-column label="序号" width="60" prop="id"></el-table-column>
          <el-table-column label="课程名称" width="220" prop="name"></el-table-column>
           <el-table-column label="课程等级" width="80" prop="level"></el-table-column>
          <el-table-column label="类型" width="60" prop="type"></el-table-column>
          <el-table-column label="报名人数" width="80" prop="num"></el-table-column>
          <el-table-column label="上线日期" width="100" prop="date"></el-table-column>
          <el-table-column label="操作" width="160">
              <template slot-scope ="{row}">
                  <el-button @click="handEdit(row)" size="mini">编辑</el-button>
              </template>
          </el-table-column>
      </el-table>

        <EditDialog :dialogVisible="dialogVisible" :form="formData" @closeDialog='closeDialog'></EditDialog> 
  </div>
</template>
<script>
import {fetchList} from "@/api/course"
import EditDialog from './Dialog/EditDialog.vue'
export default {
    name: 'complexTable',
    components:{EditDialog},

    data(){
        return{
            tHeight:(document.body.offsetHeight - 270),
            tableData:[],
            page:1,
            size:5,
            total:0,
            dialogVisible:false,
            formData:{
              name:"",
              type:"",
              level: "",
              num: "",
              date: ""
          },
        }
    },
    methods:{
         loadList(){
            let listQuery={
                'page':this.page,
                'limit':this.size
            }

            fetchList(listQuery).then(res=>{
                this.tableData=res.data.data.list;
            }).catch(err=>{
                    this.isLogin=false;
            })
        },
        closeDialog(){
            this.dialogVisible=false;
        },
        handEdit(row){
            this.formData=row;
            this.dialogVisible=true;
            // console.log(formData);
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