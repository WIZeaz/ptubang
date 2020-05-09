// components/upload-img/upload-img.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    files: [],
    img:0,
    info:"",
    noteNowLen:0,
},

  /**
   * 组件的方法列表
   */
  methods: {
      chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    // files: that.data.files.concat(res.tempFilePaths),多文件
                    files:(res.tempFilePaths),
                    img:1
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    handle_input(e){
        console.log(1)
        if(this.data.empty_input!=0)
          {this.setData({
              empty_input:0
          })}
        var that=this
  
        var value = e.detail.value, len = parseInt(value.length);
        
        if (len > that.data.noteMaxLen) return;
        
        that.setData({
        
        info: value,
        
        noteNowLen: len
        
        })
      },
      send(res){
        let msg=this.data.info
        if (msg!="")
          {this.setData({
            info:"",
            noteNowLen:0,
            files:[]

          })
          this.triggerEvent("send_msg",{msg:msg},{})
          
        }
    }
  }
})
