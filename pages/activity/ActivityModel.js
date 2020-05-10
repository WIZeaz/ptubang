import { Base } from "../../utils/base";

class ActivityModel extends Base{
  constructor(){
    super();
  }
  getActivity(id,callback){
    this.request({
      url:"mapics/view",
      type:'post',
      data:{id:id},
      sCallback:callback
    });
  }
}

export{ActivityModel}