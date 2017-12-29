import {loginGetToken, loginGetRoot} from '../../service/web/root/login';
import md5 from '../../utils/md5';

export default class IndexStore {
  tel = '';
  passWord = '';

  telKeyUP(value) {
    this.tel = value?value:'';
  }

  passWordKeyUP(value) {
    this.passWord = value?value:'';
  }

  login(tel='18888888888',password='123456'){
    (async _ => {
     const token = await loginGetToken({tel,password:md5(password) });
      localStorage.setItem("token",token.token);
      const roles = await loginGetRoot({tel,password});
     setTimeout(()=>{
       localStorage.setItem("roles",roles);
       localStorage.setItem("tel",tel);
       window.location.href = '/';
     },20)
    })().catch(error => {
      console.error(error);
    });
  }
}