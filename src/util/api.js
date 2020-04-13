import request from '@/util/axios';

// 通过codes获取租户信息
export function searchList(obj) {
  return request({
    url: '/api/msg-api/queryList',
    headers: {
      isToken: false
    },
    method: 'post',
    data: obj
  });
}
