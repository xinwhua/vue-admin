<template>
  <div class="_tablepage">

    <!--表格 start-->

    <el-table :data="tableData" border style="width: 100%" align="center" v-loading="loading">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="昵称" width="180" align="center"></el-table-column>
      <el-table-column prop="city" label="操作员" width="180"></el-table-column>
      <el-table-column prop="type" label="操作事项" ></el-table-column>
      <el-table-column prop="createtime" label="操作时间" :formatter="format_date"></el-table-column>
      <el-table-column prop="updatetime" label="更新日期" :formatter="format_date"></el-table-column>
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
    name: "tablepage",
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

        loading: false //加载提示
      };
    },
    mounted() {
    },
    methods: {
      format_date(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      handleSizeChange(val) {
        this.pageInfo.pageSize = val;
        // this.onSearch();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageInfo.currentPage = val;
        // this.onSearch();
      },
      handleDialogClose() {
        this.$refs["formEdit"].resetFields();
      }
    }
  };
</script>

