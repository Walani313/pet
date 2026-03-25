App({
  // 全局数据
  globalData: {
    userInfo: null, 
    themeColor: '#FF6600' 
  },

  // 小程序生命周期函数：启动
  onLaunch: function() {
    console.log('小程序启动');
    // 预加载必要图片的正确方式
    const images = [
      '/assets/images/prev.png',
      '/assets/images/next.png',
      '/assets/images/record.png'
    ];
    images.forEach(url => wx.getImageInfo({ src: url }));
    // 调用登录接口获取用户登录态
    wx.login({
      success: res => {
        console.log('登录成功', res.code);
      }
    });
  },

  onHide: function() {
    console.log('小程序隐藏');
    // 清除定时器
    // clearInterval(this.data.timer); 
  },

  // 全局函数
  globalFunction: function(param) {
    return param * 2;
  }
});