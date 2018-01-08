import { loginGetToken, register,loginGetRoot } from '../../service/web/root/login';
import md5 from '../../utils/md5';

export default class IndexStore {
  tel = '';
  passWord = '';

  inputUserName (value) {
    this.tel = value;
  }

  inputPassWord (value) {
    this.passWord = value;
  }

  login () {
    (async _ => {
      const token = await loginGetToken({ tel: this.tel, password: md5(this.passWord) });
      localStorage.setItem('tel',this.tel);
      if(!token) return window.iziToast.error({title:'登录失败'});
      localStorage.setItem("token", token.token);
      const token2 = await loginGetRoot();
      localStorage.setItem("roles", token2.roles);
      setTimeout(_=>{
        window.location.href = '/';
      },2000)
    })()
  }

  register(){
    (async _ => {
      const token = await register({ tel: this.tel, password: md5(this.passWord) });
      if(token) return window.iziToast.error({title:'注册成功,请登录'});
      if(!token) return window.iziToast.error({title:'注册失败'});
      this.tel = '';
      this.passWord = '';
    })()
  }


}