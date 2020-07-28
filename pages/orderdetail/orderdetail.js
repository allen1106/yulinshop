// pages/orderdetail/orderDetial.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    /**
     * orderInfo中status字段代表订单的状态
     * 1 - 未付款，出现付款按钮
     * 2 - 已付款，出现联系人信息，以及 ‘马上联系’，‘退款’，‘确认取货’ 按钮
     * 3 - 退款申请中，出现提示信息
     * 4 - 退款成功，出现相关提示信息
     * 5 - 取货成功，即交易成功
     */
    orderInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    that.setData({
      id: id
    })
    api.phpRequest({
      url: 'order.php',
      data: {
        'userid': wx.getStorageSync('userId'),
        'orderid': id
      },
      success: function (res) {
        res.data.img = res.data.imgs && res.data.imgs.split(',')[0]
        that.setData({
          orderInfo: res.data,
        })
      }
    })
  },

  bindContact: function (e) {
    var that = this
    wx.showModal({
      title: '联系卖家',  
      showCancel: true,
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: that.data.orderInfo.phone
          })
        }
      }
    })
  },

  bindRefund: function (e) {
    var that = this
    api.phpRequest({
      url: 'refund.php',
      data: {
        'userid': wx.getStorageSync('userId'),
        'orderid': that.data.id
      },
      success: function (res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '退款提交成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none'
          })
        }
      } 
    })
  },

  bindPickup: function (e) {
    var that = this
    api.phpRequest({
      url: 'pickup.php',
      data: {
        'userid': wx.getStorageSync('userId'),
        'orderid': that.data.id
      },
      success: function (res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '取货确认成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '确认失败，请重试',
            icon: 'none'
          })
        }
      } 
    })
  },

  bindPay: function () {
    var that = this
    api.phpRequest({
      url: 'wxpay.php',
      data: {
        userid: wx.getStorageSync('userId'),
        orderid: that.data.id
      },
      method: 'post',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        let payInfo = res.data
        wx.requestPayment({
          timeStamp: payInfo.timeStamp,
          nonceStr: payInfo.nonceStr,
          package: payInfo.package,
          signType: 'MD5',
          paySign: payInfo.paySign,
          success (res) {
            wx.showToast({
              title: '支付成功',
            })
            wx.switchTab({
              url: '/pages/personal/personal',
            })
          },
          fail (res) {
            wx.showToast({
              title: '支付失败',
            })
          }
        })
      }
    })
  }
})