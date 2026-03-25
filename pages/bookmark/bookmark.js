Page({
  data: {
    bookmarkList: []
  },

  // 页面加载时获取我的收藏
  onLoad() {
    this.getMyBookmarks();
  },

  // 获取当前用户的收藏帖子（真实数据）
  getMyBookmarks() {
    const db = wx.cloud.database();
    // 先获取当前用户openid（唯一标识）
    wx.cloud.callFunction({
      name: 'getOpenid', // 之前创建的获取openid的云函数
      success: (res) => {
        const userId = res.result.openid;
        
        // 1. 查询当前用户的所有收藏记录
        db.collection('bookmarks').where({ 
          userId: userId 
        }).get({
          success: (bookmarkRes) => {
            // 没有收藏记录
            if (bookmarkRes.data.length === 0) {
              this.setData({ bookmarkList: [] });
              return;
            }

            // 2. 提取收藏的帖子ID
            const postIds = bookmarkRes.data.map(item => item.postId);

            // 3. 查询这些帖子的详情
            db.collection('posts').where({
              _id: db.command.in(postIds) // 多ID查询
            }).get({
              success: (postRes) => {
                // 格式化时间（示例：2024-12-20）
                const bookmarkList = postRes.data.map(post => ({
                  ...post,
                  time: post.createTime ? new Date(post.createTime).toLocaleDateString() : '未知时间'
                }));
                // 渲染到页面
                this.setData({ bookmarkList });
              },
              fail: (err) => {
                wx.showToast({ title: '获取收藏失败', icon: 'error' });
                console.error(err);
              }
            });
          },
          fail: (err) => {
            wx.showToast({ title: '获取收藏记录失败', icon: 'error' });
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