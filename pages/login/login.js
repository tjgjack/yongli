// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },
  onLoad:function(){
    var that = this
    that.checklogin()
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    var that = this
    var s_uid = wx.getStorageSync('uid')
    // console.log(s_uid)
    wx.request({
      url: app.globalData.urlPath + 'App/wx_userInfo',
      data: {
        uid: s_uid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        getApp().globalData.userInfo = res.data
        if (that.localNameReadyCallBack) {
          that.localNameReadyCallBack(res)
        }

      }
    })
  },

  checklogin:function(){
    var that = this
    //从数据库获取用户信息
    that.queryUsreInfo()
    //用户已经授权过,到后台服务器查是否注册及状态
    that.localNameReadyCallBack = function () {
      var status = app.globalData.userInfo.status
      var msg = app.globalData.userInfo.msg
      that.setData({ userinfo: app.globalData.userInfo })
      console.log('status:' + status + '/msg:' + msg)
      if (msg == 1) {
        if (status == 1) {
          console.log('正常使用')
          wx.switchTab({
            url: '../order/report/report'
          })
        } else {
          console.log('注册成功，没有权限')
          that.setData({ message: '注册成功，没有权限' })
        }
      } else {
        console.log('没有注册成功')
        that.setData({ message: '没有注册成功' })
      }
      console.log(app.globalData.userInfo)
    }
  }
})