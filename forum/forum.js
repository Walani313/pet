// pages/forum/forum.js
Page({
  data: {
    // 搜索相关
    searchKeyword: '',
    searchResults: [],
    isLoading: false,
    
    // 标签页
    activeTab: 'latest',
    
    // 帖子列表
    postList: [],
    
    // 当前用户ID（模拟，实际应从小程序登录获取）
    currentUserId: 'user_001'
  },

  onLoad() {
    this.loadPosts()
  },

  onShow() {
    // 每次显示页面时刷新列表
    this.loadPosts()
  },

  // 加载帖子列表
  loadPosts() {
    this.setData({ isLoading: true })
    
    // 从本地存储读取帖子
    const posts = wx.getStorageSync('forum_posts') || []
    
    // 为每个帖子添加当前用户的互动状态
    const currentUserId = this.data.currentUserId
    const likes = wx.getStorageSync('forum_likes') || []
    const collects = wx.getStorageSync('forum_collects') || []
    
    const postList = posts.map(post => ({
      ...post,
      isLiked: likes.some(like => like.postId === post.id && like.userId === currentUserId),
      isCollected: collects.some(collect => collect.postId === post.id && collect.userId === currentUserId)
    }))
    
    // 排序
    const sortedList = this.sortPosts(postList, this.data.activeTab)
    
    this.setData({
      postList: sortedList,
      isLoading: false
    })
  },

  // 排序帖子
  sortPosts(posts, tab) {
    if (tab === 'latest') {
      return posts.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    } else if (tab === 'hot') {
      return posts.sort((a, b) => b.likes - a.likes)
    }
    return posts
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
    const sortedList = this.sortPosts(this.data.postList, tab)
    this.setData({ postList: sortedList })
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
  },

  // 搜索
  search() {
    const keyword = this.data.searchKeyword
    if (!keyword) {
      wx.showToast({ title: '请输入关键词', icon: 'none' })
      return
    }
    
    const results = this.data.postList.filter(post => 
      post.content.includes(keyword) || post.title?.includes(keyword)
    )
    
    this.setData({ searchResults: results })
  },

  // 点赞/取消点赞
  toggleLike(e) {
    const postId = e.currentTarget.dataset.postid
    const currentUserId = this.data.currentUserId
    let likes = wx.getStorageSync('forum_likes') || []
    let posts = wx.getStorageSync('forum_posts') || []
    
    const existingLike = likes.find(like => like.postId === postId && like.userId === currentUserId)
    
    if (existingLike) {
      // 取消点赞
      likes = likes.filter(like => !(like.postId === postId && like.userId === currentUserId))
      // 更新帖子点赞数
      posts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes - 1 }
        }
        return post
      })
    } else {
      // 添加点赞
      likes.push({
        id: Date.now(),
        postId: postId,
        userId: currentUserId,
        createTime: new Date()
      })
      // 更新帖子点赞数
      posts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 }
        }
        return post
      })
    }
    
    wx.setStorageSync('forum_likes', likes)
    wx.setStorageSync('forum_posts', posts)
    this.loadPosts()
  },

  // 收藏/取消收藏
  toggleCollect(e) {
    const postId = e.currentTarget.dataset.postid
    const currentUserId = this.data.currentUserId
    let collects = wx.getStorageSync('forum_collects') || []
    let posts = wx.getStorageSync('forum_posts') || []
    
    const existingCollect = collects.find(collect => collect.postId === postId && collect.userId === currentUserId)
    
    if (existingCollect) {
      collects = collects.filter(collect => !(collect.postId === postId && collect.userId === currentUserId))
      posts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, collects: post.collects - 1 }
        }
        return post
      })
    } else {
      collects.push({
        id: Date.now(),
        postId: postId,
        userId: currentUserId,
        createTime: new Date()
      })
      posts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, collects: post.collects + 1 }
        }
        return post
      })
    }
    
    wx.setStorageSync('forum_collects', collects)
    wx.setStorageSync('forum_posts', posts)
    this.loadPosts()
  },

  // 关注用户
  toggleFollow(e) {
    const userId = e.currentTarget.dataset.userid
    const currentUserId = this.data.currentUserId
    
    if (userId === currentUserId) {
      wx.showToast({ title: '不能关注自己', icon: 'none' })
      return
    }
    
    let follows = wx.getStorageSync('forum_follows') || []
    const existingFollow = follows.find(follow => follow.followerId === currentUserId && follow.followeeId === userId)
    
    if (existingFollow) {
      follows = follows.filter(follow => !(follow.followerId === currentUserId && follow.followeeId === userId))
      wx.showToast({ title: '已取消关注', icon: 'none' })
    } else {
      follows.push({
        id: Date.now(),
        followerId: currentUserId,
        followeeId: userId,
        createTime: new Date()
      })
      wx.showToast({ title: '已关注', icon: 'success' })
    }
    
    wx.setStorageSync('forum_follows', follows)
    this.loadPosts()
  },

  // 跳转到评论页
  goToComment(e) {
    const postId = e.currentTarget.dataset.postid
    wx.navigateTo({
      url: `/pages/forum/comment?postId=${postId}`
    })
  },

  // 跳转到发布页
  goToPublish() {
    wx.navigateTo({
      url: '/pages/post/post'
    })
  },

  // 跳转到用户主页
  goToUserPage(e) {
    const userId = e.currentTarget.dataset.userid
    wx.navigateTo({
      url: `/pages/other-user/other-user?userId=${userId}`
    })
  },

  // 查看图片大图
  previewImage(e) {
    const url = e.currentTarget.dataset.url
    const urls = e.currentTarget.dataset.urls ? JSON.parse(e.currentTarget.dataset.urls) : [url]
    wx.previewImage({
      current: url,
      urls: urls
    })
  }
})