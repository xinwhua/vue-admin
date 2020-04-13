<template>
  <div class="_tablepage">
    <!-- 查询区 start -->
    <el-form
      :inline="true"
      :model="formSearch"
      ref="formSearch"
      class="demo-form-inline"
      label-width="68px"
    >

      <el-form-item class="form_input" label="" prop="age">
        <el-input v-model="formSearch.age" placeholder="姓名或手机号查找"></el-input>
      </el-form-item>
      <el-form-item class="form_input" label="审核状态">
        <el-select v-model="formSearch.age"></el-select>
      </el-form-item>
      <el-form-item class="form_input" label="限定次数">
        <el-select v-model="formSearch.age"></el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onReset" plain>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区 end -->
    <!-- 操作区 start -->
    <el-row class="operate">
      <el-col :span="20">
        <el-button type="primary">离职</el-button>
        <el-button type="primary">限制</el-button>
        <el-button type="primary">不限制</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger">账户充值</el-button>
      </el-col>
    </el-row>
    <!-- 操作区 end -->
    <!--表格 start-->

    <el-table :data="tableData" border style="width: 100%" align="center" v-loading="loading">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="number" label="编号" width="180"></el-table-column>
      <el-table-column prop="part" label="部门"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
      <el-table-column prop="echarts1" label="企业账户余额"></el-table-column>
      <el-table-column prop="orderTimes" label="单时段可订次数"></el-table-column>
      <!--      <el-table-column prop="state" label="审批状态"  align="center"></el-table-column>-->
      <el-table-column fixed="right" label="审批状态"  align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="pass">通过</el-button>
          <el-button type="danger" @click="refuse">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--表格 end-->

    <!--分页 start-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.pageTotal"
    ></el-pagination>

  </div>
</template>

<style lang="scss">
  ._tablepage {
    // 覆写el样式,调整输入框宽度 start
    .form_input {
      .el-form-item__content {
        width: 220px;
      }
    }

    .form_select {
      .el-select {
        width: 220px;
      }
    }

    .el-pagination {
      padding-top: 5px;
    }

    .el-form-item {
      margin-bottom: 20px;
    }

    // 覆写el样式,调整输入框宽度 end
    .operate {
      padding-bottom: 10px;
    }
  }
</style>


<script>
  import {searchList} from '@/util/api';
  export default {
    name: "management",
    data() {
      return {
        pageInfo: {
          //分页
          currentPage: 1,
          pageSize: 5,
          pageTotal: 80
        },
        tableData: [],
        formSearch: {
          name: "",
          city: "",
          type: "",
          age: null,
          gender: null,
          qq: "",
          startdate: null, //开始时间
          enddate: null, //结束时间
          createDate: "" //日期
        },

        loading: false //加载提示
      };
    },
    mounted() {
      this.onSearch();
    },
    methods: {
      refuse(){},
      pass(){},
      onSearch() {
        //查询
        this.loading = true;
        if (this.formSearch.createDate) {
          this.formSearch.startdate = this.searchCreateDate[0];
          this.formSearch.enddate = this.searchCreateDate[1];
        }
        var param = Object.assign({}, this.formSearch, this.pageInfo);
        searchList(param).then(response => {
          var json = response.data;
          if (json.status == "SUCCESS") {
            this.tableData = json.data;
            this.pageInfo.pageTotal = json.count;
          } else {
            this.$message({message: json.message, type: "warning"});
          }
        })
          .catch(error => {
            this.$message({message: "执行异常,请重试", type: "error"});
          })
          .finally(() => {
            this.loading = false;
          });
        // this.$http
        //   .post("/api/msg-api/queryList", param)
        //   .then(response => {
        //     var json = response.data;
        //     if (json.status == "SUCCESS") {
        //       this.tableData = json.data;
        //       this.pageInfo.pageTotal = json.count;
        //     } else {
        //       this.$message({message: json.message, type: "warning"});
        //     }
        //   })
        //   .catch(error => {
        //     this.$message({message: "执行异常,请重试", type: "error"});
        //   })
        //   .finally(() => {
        //     this.loading = false;
        //   });
      },
      onReset() {
        //重置
        this.$refs["formSearch"].resetFields();
      },


      handleSizeChange(val) {
        this.pageInfo.pageSize = val;
        this.onSearch();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageInfo.currentPage = val;
        this.onSearch();
      },
      handleDialogClose() {
        this.$refs["formEdit"].resetFields();
      }
    }
  };
</script>

