// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头

import { Config } from 'config.js';

class Token {
    constructor() {
        this.verifyUrl = Config.restUrl + 'user/verify';
        this.tokenUrl = Config.restUrl + 'user/login';
    }

    verify() {
        var token = wx.getStorageSync('token');
        if (!token) {
            this.getTokenFromServer();
        }
        else {
            this._veirfyFromServer(token);
        } 
    }

    _veirfyFromServer(token) {
        var that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                'token': token
            },
            success: function (res) {
                var valid = res.data.isValid;
                if(!valid){
                    that.getTokenFromServer();
                }
            },
        })
    }

    getTokenFromServer(callBack) {
        var that  = this;
        wx.getUserInfo({success:(res)=>{
            let userInfo=res.userInfo;
            console.log(userInfo);
            wx.login({
                success: function (res) {
                    userInfo.token=res.code;
                    wx.request({
                        url: that.tokenUrl,
                        method:'POST',
                        data:userInfo,
                        success:function(res){
                            console.log(res);
                            wx.setStorageSync('token', res.data.token);
                            wx.setStorageSync('user', res.data.entity);
                            callBack&&callBack(res.data.token);
                        }
                    })
                    }
                });
            }
        });
    }
}

export {Token};