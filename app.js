//app.js
import {Token} from './utils/token'
import { UserHelper } from './utils/UserHelper';
App({
  onLaunch: function () {
    let token=new Token();
    let helper=new UserHelper();
    helper.getUser((res)=>{
      console.log(res);
    })
  },
  globalData: {
    userInfo: null
  }
})