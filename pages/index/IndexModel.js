import { Base } from "../../utils/base";
import { UserHelper } from "../../utils/UserHelper";


class IndexModel extends Base{
  constructor(){
    super();
    this.helper=new UserHelper();
  }
  getRepicsList(cb){
    this.helper.getUser((user)=>{
      console.log(user);
      this.request({
        data:{id:user.id},
        type:'POST',
        url:"repics/viewlist",
        sCallback:(data)=>{
          console.log(data);
          cb&&cb();
        }
      })
    })
  }
}

export{IndexModel};