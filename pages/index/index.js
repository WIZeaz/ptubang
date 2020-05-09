import { UserHelper } from "../../utils/UserHelper"
import {IndexModel} from "./IndexModel";
//index.js
//获取应用实例
const app = getApp()
let model=new IndexModel();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    test:[{
      "user":{
        "name":"zyh",
        "profilePhotoUrl":"/resources/icons/ic_chat_black_48dp.png"
      },
      "imgUrl":"/resources/image/my/bpic1.jpg",
      "like":12,
      "liked":0,
      "comments_num":12,
      "comments":[
        {"userName":"wizeaz", "content":"123"},{"userName":"wizeaz1", "content":"123"}
      ]
    },
    {
      "user":{
        "name":"wwwww",
        "profilePhotoUrl":"/resources/icons/ic_chat_black_48dp.png"
      },
      "imgUrl":"/resources/image/my/bpic2.jpg",
      "like":122,
      "liked":1,
      "comments_num":12,
      "comments":[
        {"userName":"wizeaz", "content":"234"}
      ]
    }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let helper=new UserHelper();
    model.getRepicsList();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
