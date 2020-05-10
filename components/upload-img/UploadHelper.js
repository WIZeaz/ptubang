import {Base} from "../../utils/base"
import {UserHelper} from "../../utils/UserHelper"

class UploadHelper extends Base{
  constructor(){
    super();
    this.userHelper=new UserHelper();
  }
  uploadImage(filePath,callback){
    this.uploadFile({
      filePath:filePath,
      url:'file/upload',
      sCallback:callback
    });
  }

  createActivity(filePath,content,callback){
    console.log('createActivity');
    console.log(filePath);
    console.log(content);
    this.uploadFile({
      filePath:filePath,
      url:'file/upload',
      sCallback:(fileUrl)=>{
        let app=getApp();
        this.request({
          url: 'mapics/publish',
          type:'POST',
          data:{
            pic_url:fileUrl,
            title:'none',
            username: app.globalData.userInfo.nickName,
            userid: app.globalData.user.id.toString(),
            content:content
          },
          sCallback:res=>{
            callback(fileUrl);
          }
        });
      }
    });
    
  }
}

export{UploadHelper}