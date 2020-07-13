// pages/collect/collect.js
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
    // 检索收藏列表
    var data = {
      'userid': wx.getStorageSync('userId'),
      'page': 1
    }
    if (that.data.key) {data['key'] = that.data.key}
    api.phpRequest({
      url: 'collectionlist.php',
      data: data,
      success: function (res) {
        for (var i in res.data) {
          res.data[i].img = res.data[i].imgs && res.data[i].imgs.split(',')[0]
        }
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