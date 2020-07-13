// pages/wallet/wallet.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    withdrawList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    // 获取用户账户信息
    api.phpRequest({
      url: 'info.php',
      data: {
        userid: wx.getStorageSync('userId')
      },
      success: function (res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
    // 获取提现列表
    api.phpRequest({
      url: 'withdrawallist.php',
      success: function (res) {
        that.setData({
          withdrawList: res.data
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