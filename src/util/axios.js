// import { serialize } from '@/util/util';
// import { getStore, setStore } from '@/util/store';
import router from '../router';
import axios from 'axios';

// axios.defaults.timeout = 30000;
// axios.defaults.baseURL = 'http://101ycy.com:10001'; // 正式服务器
// axios.defaults.baseURL = 'https://xbb.xiliulou.com'; // 测试服务器
// axios.defaults.baseURL = 'https://wm.xiliulou.com'; // 测试服务器
// axios.defaults.baseURL = 'http://192.168.0.142:9999'; // 本地服务器

// HTTPrequest拦截
// axios.interceptors.request.use(config => {
//   // const tenantUser = getStore({name: 'tenantUser'});
//   // const tenantConfigure = getStore({name: 'tenantConfigure'});
//   // const currentTenantCode = getStore({name: 'currentTenantCode'});
//   // let TOKEN, TENANT_ID;
//
//   // if (tenantUser && tenantUser[currentTenantCode]) {
//   //   TOKEN = tenantUser[currentTenantCode].access_token;
//   // }
//   // if (tenantConfigure && tenantConfigure[currentTenantCode]) {
//   //   TENANT_ID = tenantConfigure[currentTenantCode].tenantId;
//   // }
//
//   // const isToken = (config.headers || {}).isToken === false;
//   // const isTenantId = (config.headers || {}).isTenantId === false;
//
//
//   // if (TOKEN && !isToken) {
//   //   config.headers['Authorization'] = 'Bearer ' + TOKEN; // token
//   // }
//   // if (TENANT_ID && !isTenantId) {
//   //   config.headers['TENANT-ID'] = TENANT_ID; // 租户ID
//   // }
//
//   // headers中配置serialize为true开启序列化
//   if (config.method === 'post' && config.headers.serialize) {
//     config.data = serialize(config.data);
//     delete config.data.serialize;
//   }
//
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

axios.interceptors.request.use(
  config => {
    // console.log(token)
    // if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    //   config.headers.Authorization = token;
    // }

    if (config.method === 'post' && config.headers.serialize) {
      config.data = serialize(config.data);
      delete config.data.serialize;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// HTTPresponse拦截
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        if (window.location.href.indexOf('activity?activityId=') !== -1) {
          break;
        }
        setStore({
          name: 'tenantUser',
          content: null
        });
        setStore({
          name: 'confirmOrder',
          content: null
        });
        router.replace({
          name: 'login'
        });
        location.reload();
      case 503:
        layer.msg('服务维护中请稍后再用')
    }
  }

  return Promise.reject(error.response.data);
});

export default axios;
