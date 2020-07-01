// pages/postitem/postitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: null,
    lng: null,
    imgCount: 6,
    imgList: [],
    tagList: [{
      id: 1,
      name: '特价',
      bg_color: '#46B7FF',
      checked: false
    },{
      id: 2,
      name: '处理',
      bg_color: '#FF8B46',
      checked: false
    },{
      id: 3,
      name: '9成新',
      bg_color: '#51BB3B',
      checked: false
    },{
      id: 4,
      name: '爆款',
      bg_color: '#FF0000',
      checked: false
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

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: that.data.imgCount - that.data.imgList.length,
      success: function (res) {
        console.log(res.tempFilePaths)
        that.setData({
          imgList: that.data.imgList.concat(res.tempFilePaths)
        })
      }
    })
  },

  previewImage: function (e) {
    var that = this
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: that.data.imgList
    })
  },

  delImg: function (e) {
    var that = this
    var current = e.target.dataset.src
    var imgList = that.data.imgList
    var idx = imgList.indexOf(current)
    imgList.splice(idx, 1)
    this.setData({
      imgList: imgList
    })
  },

  bindCheckTag: function (e) {
    var tagIdx = e.currentTarget.dataset.idx
    var tagList = this.data.tagList
    tagList[tagIdx].checked = !tagList[tagIdx].checked
    this.setData({
      tagList: tagList
    })
  },

  bindGetLoc: function (e) {
    var that = this
    wx.getSetting({
      success: function (res) {
        wx.getLocation({
          type: 'gcj02',
          altitude: true,//高精度定位
          //定位成功，更新定位结果
          success (res) {
            that.setData({
              lng: res.longitude,
              lat: res.latitude
            })
          },
          //定位失败回调
          fail: function () {
            wx.showModal({
              title: '警告',
              content: '您没有授权获取位置信息，将无法发布商品。请10分钟后再次点击授权，或者删除小程序重新进入。',
              showCancel: false,
              confirmText: '我知道了'
            })
          },
          complete: function () {
            //隐藏定位中信息进度
            wx.hideLoading()
          }
        })
      }
    })
  }
})