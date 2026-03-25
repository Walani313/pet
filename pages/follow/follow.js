Page({
  data: {
    followList: []
  },

  // 页面加载时获取我的关注
  onLoad() {
    this.getMyFollows();
  },

  // 获取当前用户关注的所有用户（真实数据）
  getMyFollows() {
    const db = wx.cloud.database();
    // 先获取当前用户openid
    wx.cloud.callFunction({
      name: 'getOpenid',
      success: (res) => {
        const currentUserId = res.result.openid;
        
        // 1. 查询当前用户的所有关注记录
        db.collection('follows').where({ 
          followerId: currentUserId // 关注者ID（当前用户）
        }).get({
          success: (followRes) => {
            // 没有关注记录
            if (followRes.data.length === 0) {
              this.setData({ followList: [] });
              return;
            }

            // 2. 提取被关注用户的ID列表
            const followedUserIds = followRes.data.map(item => item.followedId);

            // 3. 查询这些被关注用户的信息
            db.collection('users').where({
              _openid: db.command.in(followedUserIds) // 匹配用户openid
            }).get({
              success: (userRes) => {
                // 渲染关注列表
                this.setData({ followList: userRes.data });
              },
              fail: (err) => {
                wx.showToast({ title: '获取关注用户信息失败', icon: 'error' });
                console.error(err);
              }
            });
          },
          fail: (err) => {
            wx.showToast({ title: '获取关注记录失败', icon: 'error' });
            console.error(err);
          }
        });
      },
      fail: (err) => {
        wx.showToast({ title: '获取用户信息失败', icon: 'error' });
        console.error(err);
      }
    });
  },

  // 返回上一页（个人页面）
  goBack() {
    wx.navigateBack({ delta: 1 });
  }
});