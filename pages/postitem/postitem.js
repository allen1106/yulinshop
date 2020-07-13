// pages/postitem/postitem.js
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
      // 获取商品分类列表
      api.phpRequest({
        url: 'category.php',
        success: function (res) {
          var typeList = that.data.typeList.concat(res.data)
          that.setData({
            typeList: typeList,
          })
        }
      })
      // 获取tag列表
      api.phpRequest({
        url: 'label.php',
        success: function (res) {
          var tagList = res.data
          for (var i in tagList) {
            tagList[i].checked = false
          }
          that.setData({
            tagList: tagList,
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
    lat: null,
    lng: null,
    imgCount: 6,
    imgList: [],
    tagList: [],
    typeList: [{'cid': 0, 'name': '请选择分类'}],
    typeIdx: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTypeChange: function (e) {
      var idx = e.detail.value
      var that = this
      that.setData({
        typeIdx: idx
      })
    },
  
    chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
        count: that.data.imgCount - that.data.imgList.length,
        success: function (res) {
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
  
    getCheckedTag: function () {
      var checkedTag = []
      for (var i in this.data.tagList) {
        if (this.data.tagList[i].checked) {
          checkedTag.push(this.data.tagList[i].name)
        }
      }
      return checkedTag
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
    },
  
    validateInfo: function (data) {
      if (!data['cid']) return '商品分类'
      if (!data['name']) return '商品名称'
      if (!data['content']) return '商品介绍'
      if (!data['price']) return '商品价格'
      if (!data['number']) return '商品数量'
      if (!data['phone']) return '联系电话'
      if (!data['address']) return '地址'
      if (!data['lat'] || !data['lng']) return '位置信息'
      return 'success'
    },
  
    bindSubmitForm: function (e) {
      var that = this
      var url = 'product_fb.php'
      var value = e.detail.value
      console.log(value)
      var data = {
        userid: wx.getStorageSync('userId'),
        name: value.name,
        cid: that.data.typeList[that.data.typeIdx].cid,
        content: value.content,
        price: value.price,
        number: value.number,
        phone: value.phone,
        address: value.address,
        lat: that.data.lat,
        lng: that.data.lng,
        label: that.getCheckedTag()
      }
      var valid = that.validateInfo(data)
      if (valid != "success") {
        wx.showToast({
          title: valid + '不能为空',
          icon: 'none',
        })
        return
      }
      that.uploadImg(url, data)
    },
  
    uploadImg: function (url, data) {
      var that = this
      var uploadedImgs = [],
          imgs = this.data.imgList
      for (var i in imgs) {
        // 将已上传的图片剔除，如编辑页面
        if (imgs[i].startsWith(api.HTTP_HOST)) {
          uploadedImgs.push(imgs.splice(i, 1))
        }
      }
      var allImgs = imgs
      if (allImgs.length == 0) {
        data['imgs'] = uploadedImgs
        that.submitForm(url, data)
      } else {
        var i = 0
        that.uploadSingleImg(i, uploadedImgs, imgs, allImgs, url, data)
      }
    },
  
    uploadSingleImg: function (i, uploadedImgs, imgs, allImgs, url, data) {
      console.log(allImgs)
      var that = this
      wx.uploadFile({
        url: api.API_HOST + "fileup.php",
        filePath: allImgs[i],
        name: 'imgs',
        success: function (res) {
          if (typeof(res.data) != Object) {
            res.data = res.data.replace("\ufeff", "")
          }
          res.data = JSON.parse(res.data)
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          } else {
            switch (res.data.status) {
              case 1:
                uploadedImgs.push(res.data.imgpath)
                if (i >= allImgs.length - 1) {
                  data['imgs'] = uploadedImgs
                  that.submitForm(url, data)
                } else {
                  i++
                  that.uploadSingleImg(i, uploadedImgs, imgs, allImgs, url, data)
                }
                break
              default:
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return
            }
          }
        },
        complete: function () {
          wx.hideToast();  //隐藏Toast
        }
      })
    },
  
    submitForm: function (url, data) {
      var that = this
      // 获取到位置信息后，调用api提交表单
      api.phpRequest({
        url: url,
        data: data,
        method: 'post',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
          if (res.data.status == 1) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          } else {
            wx.showToast({
              title: '提交失败',
              icon: 'none'
            })
          }
        }
      })
    }
  }
})