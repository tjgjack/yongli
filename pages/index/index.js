const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: null,
    userinfo:null,
    message:null
  },
  onLoad: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        this.setData({code: res.code})
      }
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res)
        var s_uid = wx.getStorageSync('uid')
        if (res.authSetting['scope.userInfo'] && s_uid) {
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    // console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: app.globalData.urlPath + 'App/wx_user_add',
        data: {
          code: this.data.code,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.setStorageSync('uid', res.data.uid)
          // console.log(res)
          //从数据库获取用户信息
           console.log("插入小程序登录用户信息成功！")
          //授权成功后，跳转进入用户登录页
          wx.redirectTo({
            url: '../login/login',
          })
        }
      })
    }
  },
})