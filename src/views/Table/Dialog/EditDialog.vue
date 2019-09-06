<template>
    <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    :visible.sync="dialogVisible"
    title="编辑课程"
    >
        <el-form
        :rules="rules"
        :model="form"
        label-width="100px"
        size="small"
        class="form-box"
        ref="ruleForm"
        >
           <el-form-item label="课程名称" prop="name">
               <el-input v-model='form.name'></el-input>
           </el-form-item>
           <el-form-item label="课程等级" prop="level">
               <el-select v-model="form.level" placeholder="请选择课程等级">
                   <el-option
                   v-for="item in level"
                   :key ="item.value"
                   :label="item.name"
                   :value="item.value"
                   >
                   </el-option>
               </el-select>
           </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择">
                    <el-option
                    v-for="item in type"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上线时间" prop='date'>
                <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="报名人数" prop="num">
                <el-input v-model="form.num"></el-input>
            </el-form-item>
        </el-form>
        <span class="dialog-footer">
            <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" size="small">更改</el-button>
        </span>
    </el-dialog>
</template>
<script>
import {update} from "@/api/course"
export default {
    name:"EditDialog",
    data(){
        return{
            rules:{
                name: [{ required: true, message: "请输入课程", trigger: "blur" }],
                type: [{ required: true, message: "请选择类型", trigger: "change" }],
                level: [{ required: true, message: "请选择等级", trigger: "change" }],
                num: [{ required: true, message: "请输入数量", trigger: "blur" }],
                date: [{ required: true, message: "请选择日期", trigger: "blur" }],
            },
            level:[
              {'value':'1','name':'等级1'},
              {'value':'2','name':'等级2'},
              {'value':'3','name':'等级2'},
            ],
            type:[
                {'value':'1','name':'java'},
                {'value':'2','name':'php'},
                {'value':'3','name':'jsp'},
            ]
        }
    },
    props:['dialogVisible','form'],
    methods:{
        submitForm(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    update(this.form)
                    .then(res=>{
                        console.log(res);
                        this.$message({
                            message:res.data.msg,
                            type:'success'
                        })
                    })
                    this.$emit('closeDialog');
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>
