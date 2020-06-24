// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['v2_qabgrc', 'v2_qabh2w'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    typeList: [{
      "id": 1,
      "img": "v2_qacpi7",
      "text": "厨房用具"
    },{
      "id": 2,
      "img": "v2_qacplb",
      "text": "桌椅板凳"
    },{
      "id": 3,
      "img": "v2_qacpn8",
      "text": "家具家电"
    },{
      "id": 4,
      "img": "v2_qacpoc",
      "text": "服装鞋帽"
    },{
      "id": 5,
      "img": "v2_qacppq",
      "text": "手机数码"
    },{
      "id": 6,
      "img": "v2_qacprd",
      "text": "儿童用具"
    },{
      "id": 7,
      "img": "v2_qacpso",
      "text": "办公设施"
    },{
      "id": 8,
      "img": "v2_qacpvb",
      "text": "五金电料"
    },{
      "id": 9,
      "img": "v2_qacpwp",
      "text": "交通工具"
    },{
      "id": 10,
      "img": "v2_qacpyl",
      "text": "其他类别"
    }],
    recommendList: [{
      "img": "/image/index/temp/v2_qabhga.jpg"
    },{
      "img": "/image/index/temp/v2_qabhio.jpg"
    },{
      "img": "/image/index/temp/v2_qabhgn.jpg"
    },{
      "img": "/image/index/temp/v2_qabhgx.jpg"
    },{
      "img": "/image/index/temp/v2_qabhh2.jpg"
    },{
      "img": "/image/index/temp/v2_qabhh6.jpg"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  navigateItemList: function (e) {
    var typeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/itemlist/itemlist?typeId=' + typeId,
    })
  }
})