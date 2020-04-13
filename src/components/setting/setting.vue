<template>
  <div class="hello">
    <div class="title">用户注册信息设置</div>
    <el-form label-width="80px">
      <template>
          <el-form-item label="必选字段">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="公司名称"></el-checkbox>
              <el-checkbox label="姓名"></el-checkbox>
              <el-checkbox label="手机号"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
      </template>
      <template>
          <el-form-item label="选填字段">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="电子邮箱"></el-checkbox>
              <el-checkbox label="身份证号码"></el-checkbox>
              <el-checkbox label="性别"></el-checkbox>
              <el-checkbox label="工号"></el-checkbox>
              <el-checkbox label="部门"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
      </template>
    </el-form>

    <div class="title">餐品价格设置</div>
    <el-form   label-width="100px">
        <el-form-item label="餐品价格显示">
          <el-switch v-model="isShow"></el-switch>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </div>
</template>

<script>

  export default {
    name: 'setting',
    data() {
      return {
        value1: '',
        checkList: [],
        isShow:true
      }
    },
    mounted() {
    },
    methods:{
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    margin: 20px 0;
    padding-left: 10px;
    height: 70px;
    line-height: 70px;
    background-color: #f2f2f2;

  }

  .block {
    margin: 10px;
  }

</style>
