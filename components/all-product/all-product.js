// components/show_block.js
Component({
  options: {
    "addGlobalClass": true,
    "styleIsolation": "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    "blockInfo": Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    input:0,
    currentMSGIndex:0,
    need_half_screen:false
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle_like_tap(res){
      let temp=this.data.blockInfo//最终效果应该是去服务器刷新一遍拿数据回来
      let index=res.currentTarget.dataset.index//分辨是第几张图片
      temp[index].liked=1-temp[index].liked

      

      
      this.setData({
        blockInfo:temp
      
      })
    },
    handle_add_tap(){
    this.setData({
      need_half_screen:true
    })
    
    
    
    }
    
    ,
    bind_send_msg(res){
      let temp=this.data.blockInfo
      let msg=res.detail.contentText
      let index=this.data.currentMSGIndex
      let name=temp[index].user.name
      console.log(index)
      console.log(msg)
      console.log(name)
      temp[index].comments=temp[index].comments.concat([{userName:name,content:msg}])
      console.log(temp)
      //temp[index].liked=1-temp[index].liked
      this.setData({
        blockInfo:temp,
        input:0

      })
    },
    share(){
      wx.showShareMenu({
        withShareTicket: true,
        complete: (res) => {},
      })
    },

    comment(res){
      console.log(res)
      let index=res.currentTarget.dataset.index//分辨是第几条消息
      if(this.data.input==0)
      {this.setData({input:1-this.data.input,currentMSGIndex:index//记录是第几条消息在被评论
      })}
      else
      {
        this.setData({input:1-this.data.input//记录是第几条消息在被评论
        })
      }
    }


  }
})
