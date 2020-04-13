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
      <el-form-item class="form_date" label="创建时间" prop="createDate">
        <el-date-picker
          v-model="formSearch.createDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form_select" label="订单状态" prop="type">
        <el-select v-model="formSearch.type" placeholder="订单状态">
          <el-option label="留言" value="1"></el-option>
          <el-option label="建议" value="2"></el-option>
          <el-option label="BUG" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportList">导出报表</el-button>
      </el-form-item>
    </el-form>e
    <!-- 查询区 end -->

    <!--表格 start-->

    <el-table :data="tableData" border style="width: 100%" align="center" v-loading="loading">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="restaurant" label="所属餐厅" width="180"></el-table-column>
      <el-table-column prop="orderNumber" label="订单号" ></el-table-column>
      <el-table-column prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" ></el-table-column>
      <el-table-column prop="state" label="订单状态" ></el-table-column>
      <el-table-column prop="foodProducts" label="餐品" ></el-table-column>
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

    <!--分页 end-->
    <!-- 新增，编辑，查看 start -->
    <el-dialog
      :title="editDialogParam.title"
      :visible.sync="editDialogParam.show"
      width="700px"
      @close="handleDialogClose"
    >
      <el-form
        :inline="true"
        :model="formEdit"
        ref="formEdit"
        class="demo-form-inline"
        label-width="68px"
        :rules="formEditRules"
        :disabled="editDialogParam.formEditDisabled"
      >
        <el-form-item class="form_input" label="昵称" prop="name">
          <el-input v-model="formEdit.name" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item class="form_input" label="城市" prop="city">
          <el-input v-model="formEdit.city" placeholder="城市"></el-input>
        </el-form-item>
        <el-form-item class="form_select" label="类别" prop="type">
          <el-select v-model="formEdit.type" placeholder="类别">
            <el-option label="留言" value="1"></el-option>
            <el-option label="建议" value="2"></el-option>
            <el-option label="BUG" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_input" label="年龄" prop="age">
          <el-input v-model="formEdit.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item class="form_select" label="性别" prop="gender">
          <el-select v-model="formEdit.gender" placeholder="性别">
            <el-option label="男" value='1'></el-option>
            <el-option label="女" value='2'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form_input" label="qq" prop="qq">
          <el-input v-model="formEdit.qq" placeholder="qq号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editDialogParam.title!='查看'" type="primary" @click="onAdd();">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增，编辑，查看 end -->
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
    name: "order",
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
      exportList(){
        this.$confirm('您是否确认导出已筛选的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
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

