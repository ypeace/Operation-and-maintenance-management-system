import {
  fetchUserDetailById,
  deleteIdcard,
  passIdcard,
  rejectIdcard,
  addInspectorRoles,
  fetchCities,
  changeCity,
  changeShow,
  goWork,
  offWork,
  fetchProjects,
  deleteProject,
  addProject,
  fetchInspectionPrices,
  changePriceRules
} from '../../../../service/web/user/use';
import DialogFrameStore from '../../../../components/control/Dialog/DialogFrameStore';
import valueToKey from '../../../../utils/valueToKey';

export default class UserDetailFrameStore {

  dialogStore = new DialogFrameStore;

  result = {};
  id = '';
  cities = [];
  projects = [];
  InspectionPrices = [];
  USER_STATE = {
    未提交: 0,
    号码审核通过: 1,
    待人工审核: 2,
    人工审核通过: 3,
    人工审核驳回: 4,
  };

  USER_IDENTITY = {
    司机: 0,
    白班: 1,
    公关: 2,
    候命: 3,
    高手: 4,
  };

  USER_STATE_MAP = valueToKey(this.USER_STATE);

  USER_IDENTITY_MAP = valueToKey(this.USER_IDENTITY);

  closeDialog () {
    this.dialogStore.close()
  }

  openDialog (title, content, bottom) {
    this.dialogStore.open(title, content, bottom)
  }

  load () {
    this._fetchUserDetail();
    this._PassIdcard();
    this._fetchProjects();
    this.fetchInspectionPrices();
  }

  _fetchUserDetail () {
    const id = window.location.hash && window.location.hash.split('#')[1] ? window.location.hash.split('#')[1] : null;
    this.id = id;
    if (!id) {
      this.error = new Error('id有误或者id不存在')
    } else {
      (async () => {
        this.result = await fetchUserDetailById({id});
      })().catch(error => {
        this.error = error;
      })
    }
  }

  toggleDialog () {
    this.show = !this.show;
  }

  changeSwitch () {
    this.onOff = !this.onOff;
  }

  //拉取项目列表

  _fetchProjects () {
    (async () => {
      this.projects = await fetchProjects();
    })().catch(error => {
      this.error = error;
    })
  }

  //吊销认证
  DeleteIdcard () {
    (async () => {
      await deleteIdcard(this.id);
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //  请求城市fetchCities
  _PassIdcard () {
    (async () => {
      this.cities = await fetchCities();
    })().catch(error => {
      this.error = error;
    })
  }

  //改变城市
  ChangeCity (id, city) {
    (async () => {
      await changeCity({id, city});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }


  //通过审核
  PassIdcard () {
    (async () => {
      await passIdcard(this.id);
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //驳回审核
  RejectIdcard (id, reason) {
    (async () => {
      await rejectIdcard({id, reason});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //设置身份
  addRolesRequest (id, identity) {
    (async () => {
      await addInspectorRoles({id, identity});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //changeShow
  ChangeShow (id, isShowPayment) {
    (async () => {
      await changeShow({id, isShowPayment});
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //上班  goWork,offWork
  gotoWork (id) {
    (async () => {
      await goWork(id);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //下班
  gooffWork (id) {
    (async () => {
      await offWork(id);
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //ChangeProject
  addProject (userId,id) {
    (async () => {
      await addProject({userId,id});
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  deleteProject (userId,id) {
    (async () => {
      await deleteProject({userId,id});
      this.load();
    })().catch(error => {
      this.error = error;
    })
  }

  //价格列表
  fetchInspectionPrices() {
    (async () => {
     this.InspectionPrices =  await fetchInspectionPrices();
    })().catch(error => {
      this.error = error;
    })
  }
  //更新价格列表
  changePriceRule(id,priceRule){
    (async () => {
      this.InspectionPrices =  await changePriceRules({id,priceRule});
      this.load();
      setTimeout(() => {
        this.dialogStore.close()
      }, 500);
    })().catch(error => {
      this.error = error;
    })
  }
}