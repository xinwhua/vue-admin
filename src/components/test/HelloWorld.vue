<template>
  <div class="hello">
      <div class="title">昨日数据状态</div>
    <avue-data-box :option="option"></avue-data-box>

      <div class="title">消费金额统计图</div>
      <div class="block">
<!--        <span class="demonstration">默认</span>-->
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <div id="echarts2" style="height:300px"></div>
      </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
export default {
  name: 'HelloWorld',
  data(){
    return {
      value1: '',
      option: {
        span:6,
        data: [
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '错误日志',
            count: 12332,
            icon: 'el-icon-warning',
            color: 'rgb(49, 180, 141)',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '数据展示',
            count: 33,
            icon: 'el-icon-view',
            color: 'rgb(56, 161, 242)',
            href:'https://avuejs.com',
            target:'_blank'
          },
          {
            click: function (item) {
              alert(JSON.stringify(item));
            },
            title: '权限管理',
            count: 2223,
            icon: 'el-icon-setting',
            color: 'rgb(117, 56, 199)',
            href:'https://avuejs.com',
            target:'_blank'
          }
        ]
      },
      option1: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }

  }
  },
  mounted() {
    echarts.init(document.getElementById('echarts2')).setOption(this.option1);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title{
    margin: 20px 0;
    padding-left: 10px;
    height: 70px;
    line-height: 70px;
    background-color: #f2f2f2;

  }

</style>
