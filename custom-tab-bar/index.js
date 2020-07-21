Component({
  data: {
    selected: 0,
    list: [{
      color: "#7A7E83",
      selectedColor: "#7A7E83",
      pagePath: "/pages/index/index",
      withIcon: false,
      text: "大厅"
    }, {
      color: "#fff",
      selectedColor: "#fff",
      pagePath: "/pages/postitem/postitem",
      withIcon: true,
      text: "发布"
    },{
      color: "#7A7E83",
      selectedColor: "#7A7E83",
      pagePath: "/pages/personal/personal",
      withIcon: false,
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})