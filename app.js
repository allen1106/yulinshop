//app.js
var api = require("/utils/api.js")

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取元数据信息
    // 获取tag列表
    var that = this
    api.phpRequest({
      url: 'label.php',
      success: function (res) {
        var tagList = res.data
        that.globalData.tagList = tagList
      }
    })
    // 获取商品分类列表
    api.phpRequest({
      url: 'category.php',
      success: function (res) {
        var typeList = res.data
        that.globalData.typeList = typeList
      }
    })
  },
  globalData: {
    userInfo: null,
    tagList: null,
    typeList: null
  }
})