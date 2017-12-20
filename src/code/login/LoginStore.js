import { checkToken, fetchConstants} from '../../service/root';

export default class IndexStore {
  userName = '';
  passWord = '';

  userKeyUP(value) {
    this.userName = value?value:'';
  }

  passWordKeyUP(value) {
    this.passWord = value?value:'';
  }

  login(){
    global.userName = this.userName;
    localStorage.setItem("userName",this.userName);
    (async _ => {
      global.permissions = await checkToken();
      // global.constants = await fetchConstants();
      // window.location.href = '/';
    })().catch(error => {
      console.error(error);
      this.loading = false;
      this.error = error;
    });
  }
}