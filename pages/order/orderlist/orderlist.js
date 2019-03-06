const app = getApp()
var num =30
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderinfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thispage = this
    app.getOrderInfo(function(data){
      // console.log(data)
      thispage.setData({orderinfo:data.order}) 
    })

  },

  // 跳转详情页
  orderDetail:function(event){
    // console.log(event)
    var orderid = event.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../orderdetails/orderdetails?orderid='+orderid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var thispage = this
    app.getOrderInfo(function (data) {
      // console.log(data.order)
      thispage.setData({ orderinfo: data.order })
      num = 30
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    var startnum = num + 1
    wx.request({
      url: 'https://erp.yonglipentu.cn/index.php/Home/App/api_order?Num=' + num +'&skip=30',
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 回调函数
        var dataArr = that.data.orderinfo;
        var newData = dataArr.concat(res.data.order)
        // console.log(newData)
        console.log(startnum)
        // 设置数据
        that.setData({
           orderinfo: newData
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })
    num = num + 30
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})