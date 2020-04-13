<template>
  <!-- 没用el-aside因为自带300宽度 -->
  <div class="_aside">
    <el-menu
      :default-active="onRoutes"
      :collapse="navShow"
      class="el-menu-vertical-demo menu"
      unique-opened
      router
    >
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/management">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
      </el-menu-item>

      <el-menu-item index="/order">
        <i class="el-icon-document"></i>
        <span>订单管理</span>
      </el-menu-item>
      <el-menu-item index="/tablepage">
        <i class="el-icon-menu"></i>
        <span slot="title">充值记录</span>
      </el-menu-item>
      <el-menu-item index="/operation">
        <i class="el-icon-document-copy"></i>
        <span slot="title">操作日志</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style lang="scss">
  ._aside {
    .menu {
      height: 100%;
    }

    .menu:not(.el-menu--collapse) {
      //设置才可以有折叠特效
      width: 300px;
    }
  }
</style>

<script>
  import bus from "../common/bus";

  export default {
    data() {
      return {
        navShow: false, //导航是否折叠
        menuData: [
          {
            page: true,
            icon: "el-icon-star-on",
            path: "p_home",
            title: "系统首页",
            subs: [
              {
                page: true,
                path: "index",
                title: "系统首页",
                icon: "el-icon-document"
              },
            ]
          },
          {
            icon: "el-icon-tickets",
            path: "p_tablepage",
            title: "列表管理",
            subs: [
              {
                page: true,
                path: "tablepage",
                title: "列表管理",
                icon: "el-icon-document"
              }
            ]
          },
          {
            icon: "el-icon-tickets",
            path: "p_management",
            title: "用户管理",
            subs: [
              {
                page: true,
                path: "management",
                title: "用户管理-确认充值",
                icon: "el-icon-document"
              }
            ]
          }, {
            icon: "el-icon-tickets",
            path: "p_order",
            title: "订单管理",
            subs: [
              {
                page: true,
                path: "order",
                title: "导出报表",
                icon: "el-icon-document"
              }
            ]
          }, {
            icon: "el-icon-tickets",
            path: "operation",
            title: "操作日志",
            subs: [
              {
                page: true,
                path: "operation",
                title: "操作日志",
                icon: "el-icon-document"
              }
            ]
          },
          {
            icon: "el-icon-tickets",
            path: "setting",
            title: "操作日志",
            subs: [
              {
                page: true,
                path: "setting",
                title: "操作日志",
                icon: "el-icon-document"
              }
            ]
          }
        ]
      };
    },
    created() {
      var permitPathList = this.getPermitPathList();
      this.setMenuPermit(this.menuData, permitPathList); //注意:必须写到created中,先初始化menuData值再渲染页面
      bus.$on("navShowChange", navShow => {
        this.navShow = navShow;
      });
    },
    mounted() {
    },
    methods: {
      //获取带权限的菜单
      getPermitMenus(menuList) {
        return menuList.filter(item => {
          console.log(item)
          return item.hasPermit == true;
        });
      },
      //给菜单设置权限
      setMenuPermit(menuList, permitPathList) {
        for (var i = 0; i < menuList.length; i++) {
          var menu = menuList[i];
          if (menu.page && menu.path) {
            //如果打开页面的菜单
            var hasPermit = permitPathList.some(permitPath => {
              return permitPath == "/" + menu.path;
            });
            menu.hasPermit = hasPermit;
          }
          if (menu.subs) {
            this.setMenuPermit(menu.subs, permitPathList);
          }
        }
      },
      //获取有权限的path集合
      getPermitPathList() {
        var ruleList = this.getRuleList();
        var homeChilds = this.getHomeChilds();
        var pathList = []; //有权限的path
        for (var i = 0; i < homeChilds.length; i++) {
          var route = homeChilds[i];
          if (route.meta && route.meta.role) {
            var routeRoles = route.meta.role;
            var hasPermission = ruleList.some(item => {
              return routeRoles.includes(item);
            });
            if (hasPermission && !pathList.includes(route.path)) {
              pathList.push(route.path);
            }
          }
        }
        return pathList;
      },
      //获取子路由
      getHomeChilds() {
        var routes = this.$router.options.routes;
        var homeRoute = routes.find(item => {
          return item.path == "/home";
        });
        return homeRoute.children;
      },
      //获取登陆的角色集合
      getRuleList() {
        var ruleList = []; //角色数组
        var strRule = sessionStorage.getItem("position");
        if (strRule.indexOf("|") != -1) {
          ruleList = strRule.split("|");
        } else {
          ruleList.push(strRule);
        }
        return ruleList;
      }
    },
    computed: {
      onRoutes() {
        //监听路由,设置默认激活项目
        return this.$route.path.replace("/", "");
      }
    }
  };
</script>
