// components/flatitem/flatitem.js
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
    bindTap: {
      type: Number,
      value: null,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemInfo: null,
    bindTap: null,
    host: api.HTTP_HOST
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _bindCollect: function () {
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
        url: 'purchase.php',
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
    _navigateToItemDetail: function (e) {
      if (this.data.bindTap) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/item/item?id=' + id
        })
      }
    }
  }
})
