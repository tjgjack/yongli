//app.js
App({
  onLaunch: function () {

  },

  //获取服务器后台订单信息
  getOrderInfo:function(cb){
    wx.request({
      url: this.globalData.urlPath+'App/api_order?Num=0&skip=30', // 接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //console.log(res.data)
        cb(res.data)
      }
    })
  },

  globalData: {
    userInfo: null,
    urlPath: 'https://erp.yonglipentu.cn/index.php/Home/',
  }
})