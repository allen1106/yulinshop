// pages/postlist/postlist.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    itemList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = options.key
    this.setData({
      key: key || this.data.key
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    // 检索发布列表
    var data = {
      'userid': wx.getStorageSync('userId'),
      'page': 1
    }
    if (that.data.key) {data['key'] = that.data.key}
    api.phpRequest({
      url: 'my_products.php',
      data: data,
      success: function (res) {
        that.setData({
          itemList: res.data,
        })
      }
    })
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

  }
})