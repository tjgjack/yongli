// pages/order/orderdetails/orderdetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderdetail:null,
    invoices_info:null,
    temp_imgs:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //此页面初始化。options为页面跳转所带来的参数
    // console.log(options.orderid)
    var that = this
    wx.request({
      url: 'https://erp.yonglipentu.cn/index.php/Home/App/item_list?or_id=' + options.orderid,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res){
        // console.log(res.data)
        that.setData({orderdetail:res.data})
      }
    })
  },

  //查看客户发票原单
  showInvoices: function(event){
    // console.log(event)
    var that = this
    var c_id = event.currentTarget.dataset.consumer_id
    var i_date = event.currentTarget.dataset.in_date
    wx.request({
      url: 'https://erp.yonglipentu.cn/index.php/Home/App/invoices_list',
      data: {
        consumer_id:c_id,
        in_date:i_date
        },
      success:function(res){
        // console.log(res)
        that.setData({ invoices_info: res.data.list})
        var img_info = res.data.list;
        var temp = []
        for (let i = 0; i < img_info.length; i++) {
          temp = temp.concat('https://erp.yonglipentu.cn/Public/invoices_uploads/'+img_info[i].invoices_image)
          // console.log(invoices_image)
        }
        that.setData({ temp_imgs: temp})
        console.log(temp)     
      }
    })
  },

  /** 
 * 预览图片
 */
  previewImage: function (e) {
    var that = this
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current,
      urls: that.data.temp_imgs
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})