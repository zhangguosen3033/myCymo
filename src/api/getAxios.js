import axios from 'axios'

axios.defaults.headers.common['Authorization'] = process.env.API_TOKEN;
axios.defaults.baseURL = process.env.API_ROOT;
//对请求进行拦截
axios.interceptors.request.use(function (request) {
  let userToken = localStorage.getItem('userToken');
  if (userToken) {
    request.headers.Authorization = `bearer ${userToken}`;
  }
  return request;
}, function (error) {
  //请求错误时做些事
  return Promise.reject(error);
});
const getAxios = (url, params, callback, method, errFuc) => {
  if (method === 'post') {
    return axios[method](url, params)
      .then(res => {
        if (callback) {
          callback(res)
        }
      })
      .catch((error) => {
        if (errFuc) {
          errFuc(error)
        }
        console.log('Error', error);
        if (error.response.status == 401) {
          localStorage.removeItem('userToken');
          // that.$vux.toast.text(`权限错误`);

          this.$vux.Toast.text(`未登录`);


          // that.$router.push({
          //   path: '/login'
          // })
          return 401;
        }
        if (error.response) {
          if (error.response.status === 500 || error.response.status === 502) {
            this.$vux.Toast.text(`网络错误`);

          }
          if (error.response.status === 403) {
            this.$vux.Toast.text(`禁止访问`);

          }
          if (error.response.status === 404) {
            this.$vux.Toast.text(`链接错误`);

          }
        } else {
          console.log('Error', error)
        }
      });
  } else {
    return axios[method](url, {
        params: params
      })
      .then(res => {
        if (callback) {
          callback(res)
        }
      })
      .catch((error) => {
        if (errFuc) {
          errFuc(error);
        }
        console.log('Error', error);
        if (error.response.status == 401) {
          localStorage.removeItem('userToken');
          this.$vux.Toast.text(`权限错误`);
          that.$router.push({
            path: '/login'
          })
          return 401;
        }
        if (error.response) {
          if (error.response.status === 500 || error.response.status === 502) {
            this.$vux.Toast.text(`网络错误`)

          }
          if (error.response.status === 403) {
            this.$vux.Toast.text(`禁止访问`)

          }
          if (error.response.status === 404) {
            this.$vux.Toast.text(`链接错误`)
          }
        } else {
          console.log('Error', error)
        }
      });
  }
};

export default getAxios;
