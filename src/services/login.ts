import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  //http://192.168.1.10:8012/user/login
  ///api/login/account
  console.log(params);
  params.passWord = params.password;
  return request('/api/user/doLogin', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
