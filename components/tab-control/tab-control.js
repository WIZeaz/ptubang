// components/tab-control/tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    button_names:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle_button_clip(res)
    {
      this.setData({
        currentIndex:res.currentTarget.dataset.index
        
      })
     this.triggerEvent(
       
         "tab-control-cilck",{"currentIndex":this.data.currentIndex},{}
       
     )
    }
  
  }
})
