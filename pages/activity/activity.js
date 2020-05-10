import { ActivityModel } from "./ActivityModel";

// pages/activity/activity.js

let activityModel=new ActivityModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url:"/resources/image/my/bpic2.jpg",

    title:" ",
    like:" ",
    time:["2020年5月4号","2020年4月14号","2020年3月28号"],
    currentIndex:"0",
    activityId:0,
  test:[{

      "user":{
        "name":"yeyan777",
        "profilePhotoUrl":"/resources/test_img/yy.jpg"
      },
      "imgUrl":"/resources/image/my/bpic1.jpg",
      "like":81,
      "liked":0,
      "comments_num":2,
      "comments":[
        {"userName":"WIZeaz", "content":"我觉得不太行"},{"userName":"不务正业的程序猿", "content":"你P了哪啊？"}
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
    ,
    ranklist:[
      {name:"BOGE",head_url:"/resources/test_img/cb.jpg",title:"",like:254,comment:52,id:12352,img_url:"/resources/image/my/bpic2.jpg"},{name:"yeyan777",title:"",head_url:"/resources/test_img/yy.jpg",like:202,comment:12,id:36221,img_url:"/resources/image/my/bpic2.jpg"},{name:"WIZeaz",head_url:"/resources/test_img/zyh.jpg",title:"划水p图",like:158,comment:11,id:43715,img_url:"/resources/image/my/bpic2.jpg"}
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
    this.setData({activityId:options.id});
    activityModel.getActivity(options.id,res=>{
      wx.downloadFile({
        url: res.pic_url,
        success:res=>{
          this.setData({
            img_url:res.tempFilePath
          })
        }
      });
    });

    this.setData({
      img_url:options.img_url,
      like:options.like,
      title:options.title,
      time:options.time,
      swiperList:[options.img_url,options.img_url,options.img_url]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 
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
    console.log( url+"?img_url="+this.data.imgUrl);
    wx.navigateTo({
      url: url+"?img_url="+this.data.img_url,
    });
  }
})