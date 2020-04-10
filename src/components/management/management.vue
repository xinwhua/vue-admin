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
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询区 end -->
    <!-- 操作区 start -->
    <el-row class="operate">
      <el-col :span="24">
        <el-button type="primary" round @click="onShowAdd">新增</el-button>
        <el-button type="danger" round>批量删除</el-button>
      </el-col>
    </el-row>
    <!-- 操作区 end -->
    <!--表格 start-->

    <el-table :data="tableData" border style="width: 100%" align="center" v-loading="loading">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="number" label="编号" width="180"></el-table-column>
      <el-table-column prop="part" label="部门" :formatter="format_type"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
      <el-table-column prop="echarts1" label="企业账户余额"  :formatter="format_gender"></el-table-column>
      <el-table-column prop="orderTimes" label="单时段可订次数" :formatter="format_date"></el-table-column>

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
        tableData: [
          {
            name: "张三",
            city: "北京",
            type: "1",
            age: 18,
            gender: 1,
            qq: 123444,
            createtime: 1546587784000,
            updatetime: 1546587784000
          },
          {
            name: "李四",
            city: "上海",
            type: "2",
            age: 19,
            gender: 0,
            qq: 555,
            createtime: 1546587784000,
            updatetime: 1546587784000
          }
        ],
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
        formEdit: {
          name: "",
          city: "",
          type: "",
          age: null,
          gender: null,
          qq: ""
        },
        formEditRules: {
          //校验规则
          name: [
            { required: true, message: "请输入昵称", trigger: "blur" },
            { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
          ],
          city: [{ required: true, message: "请输入城市", trigger: "blur" }],
          type: [{ required: true, message: "请选择类型", trigger: "change" }],
          gender: [{ required: true, message: "请选择性别", trigger: "change" }]
        },
        editDialogParam: {
          title: "新增", //弹窗标题,值为:新增，查看，编辑
          show: false, //弹框显示
          formEditDisabled:false,//编辑弹窗是否可编辑
        },

        loading: false //加载提示
      };
    },
    mounted() {
      this.onSearch();
    },
    methods: {
      onSearch() {
        //查询
        this.loading = true;
        if (this.formSearch.createDate) {
          this.formSearch.startdate = this.searchCreateDate[0];
          this.formSearch.enddate = this.searchCreateDate[1];
        }
        var param = Object.assign({}, this.formSearch, this.pageInfo);
        this.$http
          .post("/api/msg-api/queryList", param)
          .then(response => {
            var json = response.data;
            if (json.status == "SUCCESS") {
              this.tableData = json.data;
              this.pageInfo.pageTotal = json.count;
            } else {
              this.$message({ message: json.message, type: "warning" });
            }
          })
          .catch(error => {
            this.$message({ message: "执行异常,请重试", type: "error" });
          })
          .finally(() => {
            this.loading = false;
          });
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

