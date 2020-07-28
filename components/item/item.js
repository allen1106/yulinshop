// components/searchInput/search.js
var api = require("../../utils/api.js")

Component({
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    itemInfo: {
      type: Object,
      value: null
    },
    bindTapHandler: {
      type: Function,
      value: null,
    },
    /*
    * 控制是买家或者卖家
    * 买家 - 显示‘收藏’和‘购买’按钮
    * 卖家 - 显示‘编辑’和‘删除’按钮
    */
    isClient: {
      type: Number,
      value: null,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemInfo: null,
    bindTapHandler: null,
    isClient: 0,
    showPreview: "none",
    currentIdx: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _bindTap: function (e) {
      if (this.data.bindTapHandler) {
        this.data.bindTapHandler(e)
      }
    },
    _bindCollect: function (e) {
      var that = this
      api.phpRequest({
        url: 'collection.php',
        data: {
          goods_id: that.data.itemInfo.id,
          userid: wx.getStorageSync('userId')
        },
        success: function (res) {
          if (res.data.status == 1) {
            wx.showToast({
              title: '收藏成功',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: '收藏失败，请重试',
              icon: 'none'
            })
          }
        }
      })
    },
    _bindPurchase: function (e) {
      var that = this
      api.phpRequest({
        url: 'buy.php',
        data: {
          goods_id: that.data.itemInfo.id,
          userid: wx.getStorageSync('userId')
        },
        success: function (res) {
          if (res.data.status == 1) {
            wx.navigateTo({
              url: '/pages/buyitem/buyitem?orderid=' + res.data.orderid,
            })
          } else {
            wx.showToast({
              title: '收藏失败，请重试',
              icon: 'none'
            })
          }
        }
      })
    },
    _bindEdit: function (e) {
      var that = this
      wx.navigateTo({
        url: '/pages/edititem/edititem?id=' + that.data.itemInfo.id,
      })
    },
    _bindDelete: function (e) {
      var that = this
      api.phpRequest({
        url: 'product_del.php',
        method: 'post',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        data: {
          goods_id: that.data.itemInfo.id
        },
        success: function (res) {
          if (res.data.status == 1) {
            getCurrentPages().pop().onShow()
          } else {
            wx.showToast({
              title: '删除失败，请重试',
              icon: 'none'
            })
          }
        }
      })
    },
    previewImg: function (e) {
      // var that = this
      // var current = e.target.dataset.src
      // wx.previewImage({
      //   current: current,
      //   urls: that.data.itemInfo.imgs
      // })
      var current = e.target.dataset.src
      this.setData({
        showPreview: "block",
        currentIdx: current
      })
    },
    closePreview: function (e) {
      this.setData({
        showPreview: "none"
      })
    },
    toLeft: function (e) {
      this.setData({
        currentIdx: this.data.currentIdx - 1
      })
    },
    toRight: function (e) {
      console.log(this.data.itemInfo.imgs)
      console.log(this.data.currentIdx + 1)
      this.setData({
        currentIdx: this.data.currentIdx + 1
      })
    }
  }
})
