// pages/index/index.js
var api = require("../../utils/api.js")

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
      var that = this
      that.setData({
        searchHandler: that.searchHandler
      })
      // 获取banner图片列表
      api.phpRequest({
        url: 'adverlist.php',
        success: function (res) {
          that.setData({
            background: res.data,
          })
        }
      })
      // 获取商品分类列表
      api.phpRequest({
        url: 'category.php',
        success: function (res) {
          that.setData({
            typeList: res.data,
          })
        }
      })
      // 获取推荐商品列表
      api.phpRequest({
        url: 'recommend.php',
        success: function (res) {
          that.setData({
            recommendList: res.data,
          })
        }
      })
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    host: api.HTTP_HOST,
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    typeList: [],
    recommendList: [],
    searchHandler: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateItemList: function (e) {
      var typeId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/itemlist/itemlist?typeId=' + typeId,
      })
    },
  
    searchHandler: function (searchWords) {
      if (!searchWords.trim()) {
        wx.showToast({
          icon: 'none',
          title: '请输入您要搜索的关键字'
        })
      } else {
        wx.navigateTo({
          url: '/pages/itemlist/itemlist?key=' + searchWords
        })
      }
    }
  }
})