import axios from 'axios'
import {Toast} from 'mint-ui'

var instance = axios.create({
  timeout: 5000
});

function json2url(obj) {
  var arr = [];
  var str = '';
  for (let i in obj) {
    str = i + '=' + obj[i];
    arr.push(str);
  }
  return arr.join('&');
}

var getInfo = (url = '', data = {}, type = 'GET', head) => {
  url = url;
  type = type.toLowerCase();
  // get请求,拼接参数
  if (type === 'get') {
    var params = json2url(data);
    return instance.get(url + (params ? ('?' + params) : '')).then(res => {
      return {
          success: res.status == 200 ? 'true' : 'false',
          data: res.data
      }
    }).catch(error => {
        // 返回的响应码不是2xx
        if(error.response){
            Toast(error.response.data);
        }else if(error.request){
            // 发送请求但是没有响应返回
            Toast(error.request);
        }else{
            // 其他错误
            console.log('Error',error.message);
        }
    })
  }
  if (type === 'post' || type === 'put' || type === 'delete') {
    return instance({
      method: type,
      url: url,
      data: data,
      headers: head
    }).then(res => {
      return {
        success: res.status == 200 ? 'true' : 'false',
        data: res.data
      }
    }).catch(error => {
        // 返回的响应码不是2xx
        if(error.response){
            Toast(error.response.data);
        }else if(error.request){
            // 发送请求但是没有响应返回
            Toast(error.request);
        }else{
            // 其他错误
            console.log('Error',error.message);
        }
    })
  }
}

export default getInfo
