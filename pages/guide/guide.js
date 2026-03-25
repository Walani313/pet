Page({
  data: {
    current: 0,
    guides: [
      {
        title: "宠物管家通",
        subtitle: "CUTE PET STEWARD",
        desc: "宠物管家通，让养宠变得很容易。"
      },
      {
        title: "宠物管家通",
        subtitle: "CUTE PET STEWARD",
        desc: "宠物管家通，陪伴每一刻。"
      },
      {
        title: "宠物管家通",
        subtitle: "CUTE PET STEWARD",
        desc: "宠物管家通，让您更爱自己的宠物。"
      }
    ]
  },

  handleChange(e) {
    this.setData({
      current: e.detail.current
    })
  },

  enterApp() {
    wx.vibrateShort()
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },

  handleAnimationFinish(e) {
    const { current } = e.detail
    if (current === this.data.guides.length - 1) {
      wx.showToast({
        title: '左滑进入应用',
        icon: 'none',
        duration: 1500
      })
    }
  }
}) 