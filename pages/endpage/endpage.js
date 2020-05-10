Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url:"",

  },
  //事件处理函数
  backtoindex: function() {
    console.log(this.data.url)
   wx.reLaunch({
     url: '/pages/my/my?url='+this.data.url,//防止套娃
   })
  },
  onLoad: function (res) {
    this.setData({
      url:res.img_url
    })
    console.log(this.data.url)
  
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
