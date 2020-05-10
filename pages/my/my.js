import { MyModel } from "./MyModel"

// pages/my/my.js
const app = getApp()

let myModel=new MyModel();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index:true,
    "user":{
      "name":"WIZeaz",
      "profilePhotoUrl":"/resources/icons/ic_chat_black_48dp.png"
    },
    attendedActivities:[],
    myActivities:[],
    "num_of_start_ac":2,
    "num_of_join_ac":2,
    "my_join_ac":"我参与的活动",
    "my_start_ac":"我发起的活动",
    "num_of_join_people1":13,
    "num_of_join_people2":24,
    "num_of_join_people3":34,
    "num_of_join_people4":9,
    "total_like":12,
    "tabBar": {
      "list": [{
        "pagePath": "activity",
      }]
    }
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  onShow(){
        //获取活动
        myModel.myActivities((res)=>{
          this.setData({myActivities:res});
        });
        myModel.attendActivities(res=>{
          this.setData({attendedActivities:res});
        })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  index1:function(){
    this.setData({ index:true})
  },
  index2:function(){
    this.setData({ index:false})
  },
  gotoActivity:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activity/activity?id='+id.toString(),
    })
  },
  gotoTalkpage1:function()
  {
    wx.navigateTo({
      url: '/pages/activity/activity?img_url='+this.data.imgUrl1,
    })
  },
  gotoTalkpage2:function()
  {
    wx.navigateTo({
      url: '/pages/activity/activity?img_url='+this.data.imgUrl2,
    })
  }
})