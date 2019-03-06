import * as echarts from '../../../ec-canvas/echarts';

const app = getApp()
let chart = null

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: { text:'前12月订单数量分析表'},
    color: ['#2f4554'],
    tooltip: {},
    legend: {
      data: ['2019年']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: [
      {
        name: '喷漆+喷塑',
        type: 'bar',
        label: { show: true, default: 'inside' },
        data: [],
      }

    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  //wx.onshareappmessage(function callback) 右上角菜单的「转发」按钮时触发的事件
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/report/report',
      success: function () { },
      fail: function () { }
    }
  },
 
  /**
   * 页面的初始数据
   */
  data: {
    y_count_Info:null,
    t_count_Info:null,
    m_count_Info:0,
    //下面是ECharts需要调用的
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.get_order_count()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  var  that = this
    that.get_echarts_data()
    setTimeout(function () {
      // 获取 chart 实例的方式
     console.log(chart)
    }, 2000);  
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    that.get_order_count()
    that.get_echarts_data()
    // setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)

    // }, 2000); 
    // 停止下拉动作
    wx.stopPullDownRefresh();
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
    
  },

  get_order_count:function(){
    var urlPath = app.globalData.urlPath
    var that = this
    wx.request({
      url: urlPath+'App/order_count',
      success: res =>{
        // console.log(res.data)
        that.setData({ y_count_Info: res.data[0]})
        that.setData({ t_count_Info: res.data[1]})
      }
    })
  },

  get_echarts_data:function(){
    var that = this
    wx.request({
      url: 'https://erp.yonglipentu.cn/index.php/Home/App/chart_json',
      success:function(res){
        // console.log(res)
        var data = res.data
        var i, len = data.length;
        var month  = new Array();//月份
        var y_penqi = new Array();//Y轴数据集
        var y_pensu = new Array();//Y轴数据集
        var y_count = new Array();//Y轴数据集
        for (i = 0; i < len; i++) {
          y_penqi[i] = data[i].penqi ? parseInt(data[i].penqi) : parseInt(0);
          y_pensu[i] = data[i].pensu ? parseInt(data[i].pensu) : parseInt(0);
          y_count[i] = y_penqi[i] + y_pensu[i];
          month[i] = data[i].month;
        }
        chart.setOption({
          yAxis: {
            data: month,
            inverse: true
          },
          series: [
            {
              data: y_count
            }]
        })
        // console.log(month, y_penqi, y_pensu, y_count)
        // console.log(y_count[0])
        that.setData({ m_count_Info: y_count[0]})
      }
    })
  }
})