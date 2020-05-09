//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    login:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    test:[{

      "user":{
        "name":"WIZeaz",
        "profilePhotoUrl":"/resources/test_img/zyh.jpg"
      },
      "imgUrl":"/resources/image/my/bpic1.jpg",
      "like":81,
      "liked":0,
      "comments_num":2,
      "comments":[
        {"userName":"WIZeaz", "content":"P图技术不是很好，希望大家喜欢"},{"userName":"不务正业的程序猿", "content":"这个是啥动漫来着"}
      ]
    },
    {
      "user":{
        "name":"BOGE",
        "profilePhotoUrl":"/resources/test_img/cb.jpg"
      },
      "imgUrl":"/resources/image/my/bpic2.jpg",
      "like":52,
      "liked":1,
      "comments_num":12,
      "comments":[
        {"userName":"yeyan777", "content":"这个P的还能看，你赞有了"}
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
        console.log(res.userInfo)
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
 getInfo(){
   wx.getUserInfo({
     success: (res) => {  
      console.log(res) 
      this.setData({
      login:1,
      userInfo: res.userInfo
    })},
   })

 }
})

