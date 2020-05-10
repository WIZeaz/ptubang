//app.js
import {Token} from './utils/token'
import { UserHelper } from './utils/UserHelper';
App({
  onLaunch: function () {
    console.log('on launch'); // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getSetting({
      complete: (res) => {
        if (!res.authSetting['scope.userInfo']){
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
        }
      },
    })
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    });


    console.log('here');
    let token=new Token();
    token.getTokenFromServer((res)=>{
      console.log(res);
    });
    let helper=new UserHelper();
    helper.getUser((res)=>{
      this.globalData.user=res;
    })
    
  },
  globalData: {
    userInfo: null,
    user:null
  }
})