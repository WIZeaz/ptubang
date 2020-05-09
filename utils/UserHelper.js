import { Token } from "./token";

class UserHelper{
  setUser(user){
    wx.setStorageSync('user', user);
  }

  getUser(cb){
    let user=wx.getStorageSync('user');
    if (!user){
      let token=new Token();
      token.getTokenFromServer((res)=>{
        user=wx.getStorageSync('user');
        cb&&cb(user);
      });
    } else {
      cb&&cb(user);
    }
  }
}

export{UserHelper}