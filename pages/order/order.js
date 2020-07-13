// pages/order/order.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: ["卖出的", "买到的", "进行中"],
    swiperHeight: "0rpx",
    currentTab: 0,
    sellItemList: [],
    buyItemList: [],
    pendingItemList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tabid = options.tabid
    this.setData({
      currentTab: tabid
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.fetchSellList()
    that.fetchBuyList()
    that.fetchPendingList()
  },

  fetchSellList: function () {
    var that = this
    that.fetchOrderList(0, (res) => {
      for (var i in res.data) {
        res.data[i].img = res.data[i].imgs && res.data[i].imgs.split(',')[0]
      }
      that.setData({
        sellItemList: res.data
      })
      if (that.data.currentTab == 0) {
        that.setData({
          swiperHeight: 220 * res.data.length + "rpx"
        })
      }
    })
  },

  fetchBuyList: function () {
    var that = this
    that.fetchOrderList(0, (res) => {
      for (var i in res.data) {
        res.data[i].img = res.data[i].imgs && res.data[i].imgs.split(',')[0]
      }
      that.setData({
        buyItemList: res.data
      })
      console.log(that.data.currentTab)
      if (that.data.currentTab == 1) {
        that.setData({
          swiperHeight: 220 * res.data.length + "rpx"
        })
      }
    })
  },

  fetchPendingList: function () {
    var that = this
    that.fetchOrderList(1, (res) => {
      for (var i in res.data) {
        res.data[i].img = res.data[i].imgs && res.data[i].imgs.split(',')[0]
      }
      that.setData({
        pendingItemList: res.data
      })
      if (that.data.currentTab == 2) {
        that.setData({
          swiperHeight: 220 * res.data.length + "rpx"
        })
      }
    })
  },

  fetchOrderList: function (status, fn) {
    api.phpRequest({
      url: 'orderlist.php',
      data: {
        userid: wx.getStorageSync('userId'),
        status: status
      },
      success: fn
    })
  },

  swichNav(e){
    var that = this
    var current = e.currentTarget.dataset.current
    var lenth = 0
    switch (current) {
      case 0:
        lenth = that.data.sellItemList.length
        break;
      case 1:
        lenth = that.data.buyItemList.length
        break;
      case 2:
        lenth = that.data.pendingItemList.length
        break;
      default:
        break;
    }
    this.setData({
      currentTab: current,
      swiperHeight: 220 * lenth + "rpx"
    })
  },

  changeSwiperTab: function (e) {
    var current = e.detail.current
    this.setData({
      currentTab: current
    })
  }
})