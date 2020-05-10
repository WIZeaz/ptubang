import { Base } from "../../utils/base";

class MyModel extends Base{
  constructor(){
    super();
  }
  myActivities(callback){
    console.log(getApp().globalData.user.id);
    this.request({
      url:'mapics/viewlist',
      type:'POST',
      data:{userid:getApp().globalData.user.id.toString()},
      sCallback:callback
    })
  }
  attendActivities(callback){
    this.request({
      url:'repics/viewuser',
      type:'POST',
      data:{userid:getApp().globalData.user.id.toString()},
      sCallback:callback
    })
  }
}

export{MyModel};