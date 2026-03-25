Page({
  data: {
    // 点赞列表示例数据
    likeList: [
      {
        imgUrl: "/images/like1.png", // 替换成你的图片路径
        title: "超可爱的柯基日常",
        time: "2024-12-18"
      },
      {
        imgUrl: "/images/like2.png",
        title: "猫咪驱虫小知识",
        time: "2024-12-10"
      }
    ]
  },

  onLoad(options) {
    // 实际开发：调用后端接口获取点赞数据
    // wx.request({
    //   url: 'https://你的接口/api/getUserLikes',
    //   success: (res) => this.setData({ likeList: res.data })
    // })
  },

  // 返回逻辑（和百科/作品页一致）
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});