// pages/editor/editor.js
const ImageFilters = require('../../utils/weImageFilters/weImageFilters.js');
const Helper = require('../../utils/weImageFilters/weImageFiltersHelper.js');

let helper;
let imageData;
let tempImageData;
let systemInfo;
const filters = {
  original: function (data) {
      return data
  },
  Binarize: function (data) {
      // Binarize (srcImageData, threshold)
      // threshold 0.0 <= n <= 1.0
      return ImageFilters.Binarize(data, 0.5)
  },
  BoxBlur: function (data) {
      // BoxBlur (srcImageData, hRadius, vRadius, quality)

      return ImageFilters.BoxBlur(data, 3, 3, 2)
  },
  GaussianBlur: function (data) {
      // GaussianBlur (srcImageData, strength)
      // strength 1 <= n <= 4
      return ImageFilters.GaussianBlur(data, 4)
  },
  StackBlur: function (data) {
      // StackBlur (srcImageData, radius)

      return ImageFilters.StackBlur(data, 6)
  },
  Brightness: function (data) {
      // Brightness (srcImageData, brightness)
      // brightness - 100 <= n <= 100
      return ImageFilters.Brightness(data, 100)
  },
  BrightnessContrastGimp: function (data) {
      // BrightnessContrastGimp (srcImageData, brightness, contrast)
      // brightness - 100 <= n <= 100
      // contrast - 100 <= n <= 100
      return ImageFilters.BrightnessContrastGimp(data, 26, 13)
  },
  BrightnessContrastPhotoshop: function (data) {
      // ImageFilters.BrightnessContrastPhotoshop (srcImageData, brightness, contrast)
      // brightness - 100 <= n <= 100
      // contrast - 100 <= n <= 100
      return ImageFilters.BrightnessContrastPhotoshop(data, 26, 13)
  },
  Channels: function (data) {
      // ImageFilters.Channels (srcImageData, channel)
      // channel: default is red, 2 green, 3 blue

      return ImageFilters.Channels(data, 3)
  },
  ColorTransformFilter: function (data) {
      // ImageFilters.ColorTransformFilter (srcImageData, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset)
      // redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier: 0~5
      // redOffset, greenOffset, blueOffset, alphaOffset: 0~255

      return ImageFilters.ColorTransformFilter(data, 2, 1, 1, 1, 38, 0, 0, 0)
  },
  Desaturate: function (data) {
      // ImageFilters.Desaturate (srcImageData)
      return ImageFilters.Desaturate(data)
  },
  Dither: function (data) {
      // ImageFilters.Dither (srcImageData, levels)
      // levels 2 <= n <= 255
      return ImageFilters.Dither(data, 2)
  },
  Edge: function (data) {
      // ImageFilters.Edge (srcImageData)
      return ImageFilters.Edge(data)
  },
  Emboss: function (data) {
      // ImageFilters.Emboss (srcImageData)
      return ImageFilters.Emboss(data)
  },
  Enrich: function (data) {
      // ImageFilters.Enrich (srcImageData)
      return ImageFilters.Enrich(data)
  },
  Flip: function (data) {
      // ImageFilters.Flip (srcImageData, vertical)
      // vertical{Boolean}
      return ImageFilters.Flip(data, 0)
  },
  Gamma: function (data) {
      // ImageFilters.Gamma (srcImageData, gamma)
      // gamma: 0~5
      return ImageFilters.Gamma(data, 5)
  },
  GrayScale: function (data) {
      // ImageFilters.GrayScale (srcImageData)
      return ImageFilters.GrayScale(data)
  },
  HSLAdjustment: function (data) {
      // ImageFilters.HSLAdjustment (srcImageData, hueDelta, satDelta, lightness)
      // hueDelta: 0~180
      // satDelta, lightness: 0~100
      return ImageFilters.HSLAdjustment(data, -23, 54, 19)
  },
  Invert: function (data) {
      // ImageFilters.Invert (srcImageData)
      return ImageFilters.Invert(data)
  },
  Mosaic: function (data) {
      // ImageFilters.Mosaic (srcImageData, blockSize)
      // blockSize > 0
      return ImageFilters.Mosaic(data, 10)
  },
  Oil: function (data) {
      // ImageFilters.Oil (srcImageData, range, levels)
      // range: 1~5
      // levels: 1~256
      return ImageFilters.Oil(data, 5, 62)
  },
  OpacityFilter: function (data) {
      // ImageFilters.OpacityFilter (srcImageData, opacity)
      // opacity: 0~255
      return ImageFilters.OpacityFilter(data, 123)
  },
  Posterize: function (data) {
      // ImageFilters.Posterize (srcImageData, levels)
      // levels: 2~32
      return ImageFilters.Posterize(data, 6)
  },
  Rescale: function (data) {
      // ImageFilters.Rescale (srcImageData, scale)
      // scale: 0~5
      return ImageFilters.Rescale(data, 3.2)
  },
  // ResizeNearestNeighbor: function (data) {
  //     // ImageFilters.ResizeNearestNeighbor (srcImageData, width, height)
  //     return ImageFilters.ResizeNearestNeighbor(data, 500, 500)
  // },
  Sepia: function (data) {
      // ImageFilters.Sepia(srcImageData)
      return ImageFilters.Sepia(data)
  },
  Sharpen: function (data) {
      // ImageFilters.Sharpen (srcImageData, factor)
      // factor: 1~10
      return ImageFilters.Sharpen(data, 9)
  },
  Solarize: function (data) {
      // ImageFilters.Solarize (srcImageData)
      return ImageFilters.Solarize(data)
  },
  Transpose: function (data) {
      // ImageFilters.Transpose (srcImageData)
      // factor: 1~10
      return ImageFilters.Transpose(data)
  },
  Twril: function (data) {
      // ImageFilters.Twril (srcImageData, centerX, centerY, radius, angle, edge, smooth)
      // centerX 0.0 <= n <= 1.0
      // centerY 0.0 <= n <= 1.0
      // radius
      // angle(degree)
      // smooth{Boolean}
      return ImageFilters.Twril(data, 0.5, 0.5, 120, 90, 0, true)
  },
}
const filterKeys=Object.keys(filters);
const toolList=["文字","贴纸"];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"/resources/testImg/testImg.jpg",
    stickerUrl:"/resources/icons/ic_chat_black_48dp.png",
    stickerWidth:100,
    stickerHeight:100,
    imgHeight:320,
    imgWidth:320,
    toolId:0,
    activitiId:0,
    x:0,
    y:0,
    filterList:filterKeys,
    toolList:toolList,
    toolSettingId:-1,
    text:"测试文本",
    fontsize:20,
    tempImageUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    systemInfo=wx.getSystemInfoSync();
    console.log(options)
    this.setData({
       imgUrl:options.imgUrl
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(){

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.imgUrl);

    wx.showLoading({
      title: '正在加载图片……',
      mask:true
    })
    const that=this;
    wx.getImageInfo({
      src: this.data.imgUrl,
      success: function(res){
        let scale=systemInfo.screenWidth/res.width;
        let dHeight=Math.trunc(res.height*scale);
        let dWidth=Math.trunc(res.width*scale);
        console.log(dHeight);
        console.log(dWidth);
        that.setData({imgHeight:dHeight,imgWidth:dWidth});
        helper = new Helper({
          canvasId: 'mainCanvas',
          width: dWidth,
          height: dHeight
        });
        helper.initCanvas(that.data.imgUrl,()=>{
          imageData=helper.createImageData();
          wx.hideLoading({
            complete: (res) => {},
          })
        });
      }
    })
    


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
  setToolId:function(e){
    console.log('setToolId');
    let id = e.currentTarget.dataset.id;
    helper.putImageData(imageData,()=>{        
      helper.getImageTempFilePath((res)=>{
        this.setData({tempImageUrl:res});
      });
    });
    this.setData({toolId:parseInt(id)});
  },
  saveChange(){

  },
  filterImage:function(e){
    let index=e.currentTarget.dataset.index;
    tempImageData=filters[filterKeys[index]](imageData);
    wx.showLoading({
      title: '正在处理',
      mask:true
    })
    helper.putImageData(tempImageData, () => {
      console.log(tempImageData);
      wx.hideLoading();
    });
  },
  cancel:function(e){
    console.log('cancel');
    let id=e.currentTarget.dataset.id;
    tempImageData=imageData;
    this.setData({toolId:0});
    this.setData({toolSettingId:-1});
    helper.putImageData(imageData);
  },
  confirm:function(e){
    console.log('confirm');
    let id=e.currentTarget.dataset.id;
    if (id==1){
      imageData=tempImageData;
      helper.putImageData(imageData);
    } else if (id==2){
      const that=this;
      let toolSettingId=this.data.toolSettingId;
      if (toolSettingId==-1){
        this.setData({toolId:0});
        this.setData({toolSettingId:-1});
        return;
      }
      let stickerUrl=this.data.stickerUrl;
      let text=this.data.text;
      let fontsize=this.data.fontsize;
      wx.createSelectorQuery().select('#sticker').fields({size: true,rect:true},
        (res)=>{
          let left=res.left;
          let top=res.top;
          console.log(toolSettingId);
          helper.putImageData(imageData,()=>{
            if (toolSettingId==0){
              helper.drawText(text,fontsize,left,top,()=>{
                imageData=helper.createImageData();
              });
            } else {
              //console.log("im here");
              helper.drawImage(stickerUrl,left,top,()=>{
                imageData=helper.createImageData();
              });
            }
          });
        }).exec();

    }
    this.setData({toolId:0});
    this.setData({toolSettingId:-1});
  },
  useTool:function(e){
    let id=e.currentTarget.dataset.index;
    this.setData({toolSettingId:id});
    if (id==0){
      //console.log("text");
      console.log(this.data.text);
      
    } else {
      const that=this;
      wx.getImageInfo({
        src: this.data.stickerUrl,
        success: function(res){
          console.log(res);
          that.setData({stickerHeight:res.height,stickerWidth:res.width});
        }
      })
    }
  }
})