// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url:"/resources/image/my/bpic2.jpg",
    title:" ",
    like:" ",
    time:" ",
    currentIndex:"0",
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
    ,
    ranklist:[
      {name:"蔡徐坤",head_url:"/resources/image/tabbar/edit-profile.png",title:"我画什么都是及你太美",like:9999,comment:52,id:12352,img_url:"/resources/image/my/bpic2.jpg"},{name:"刘根生",title:"我画什么都是刘根生",head_url:"/resources/image/tabbar/edit-profile.png",like:8888,comment:281,id:36221,img_url:"/resources/image/my/bpic2.jpg"},{name:"张三丰",head_url:"/resources/image/tabbar/edit-profile.png",title:"打太极",like:7777,comment:281,id:43715,img_url:"/resources/image/my/bpic2.jpg"}
    ],//最好是直接有个id，用网络请求去拿就行,接口感觉要商量下
    swiperList:["/resources/image/my/bpic2.jpg","/resources/image/my/bpic2.jpg","/resources/image/my/bpic2.jpg"]
  },
  bind_tab_control(res){
    this.setData({
      currentIndex:res.detail.currentIndex
    })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      img_url:options.img_url,
      like:options.like,
      title:options.title,
      time:options.time,

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  navigateTo: function(e){
    let url=e.currentTarget.dataset.url;
    console.log(url);
    wx.navigateTo({
      url: url,
    });
  }
})