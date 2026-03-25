// pages/personal/personal.js
Page({
  data: {
    // 用户信息
    userInfo: {
      nickname: '咪咪姐姐',
      avatar: '/images/photocat.webp'
    },
    // 统计数据
    stats: {
      followCount: 312,
      fanCount: 12,
      workCount: 56
    },
    // 日记记录相关
    diaryEntries: [],      // 显示的记录
    allEntries: [],        // 所有记录（用于展开）
    showMoreText: '更多',   // 更多/收起 按钮文字
    maxDisplay: 3,         // 默认显示条数
    isExpanded: false,     // 是否展开
    // 宠物相册（示例数据）
    petPhotos: [
      '/images/photo1.jpg',
      '/images/photo2.jpg',
      '/images/photo3.png',
      '/images/photo4.jpg'
    ]
  },

  // 生命周期：页面加载
  onLoad() {
    this.loadDiaryRecords()
  },

  // 生命周期：每次显示页面时刷新
  onShow() {
    this.loadDiaryRecords()
  },

  // 加载日记记录
  loadDiaryRecords() {
    // 从本地存储获取所有记录
    const records = wx.getStorageSync('records') || []
    
    // 处理每条记录，格式化显示内容
    const formattedRecords = records.map(item => {
      // 拼接显示内容：类型 + 内容
      let displayContent = item.content
      if (item.type) {
        displayContent = `【${item.type}】${item.content}`
      }
      
      // 确定显示日期：优先用用户选的 time，没有则用系统 date
      let displayDate = item.time || ''
      if (!displayDate && item.date) {
        displayDate = item.date.split(' ')[0]  // 只取日期部分
      }
      
      return {
        raw: item,                    // 原始数据
        content: displayContent,       // 带类型的内容
        date: displayDate,             // 显示的日期
        sortTime: item.time || item.date  // 用于排序的时间
      }
    })
    
    // 按日期倒序排序（最新的在前）
    formattedRecords.sort((a, b) => {
      return (b.sortTime || '').localeCompare(a.sortTime || '')
    })
    
    // 保存所有记录
    this.setData({
      allEntries: formattedRecords,
      diaryEntries: formattedRecords.slice(0, this.data.maxDisplay),
      // 更新作品数量
      'stats.workCount': formattedRecords.length
    })
  },

  // 更多/收起 切换
  showMoreEntries() {
    const isExpanded = !this.data.isExpanded
    this.setData({
      diaryEntries: isExpanded 
        ? this.data.allEntries 
        : this.data.allEntries.slice(0, this.data.maxDisplay),
      showMoreText: isExpanded ? '收起' : '更多',
      isExpanded: isExpanded
    })
  },

  // 跳转到个人编辑页（点击昵称）
  navigateToPersonPage() {
    wx.navigateTo({
      url: '/pages/person-edit/person-edit'
    })
  },

  // 跳转到作品页
  navigateToWorkPage() {
    
     wx.navigateTo({
       url: '/pages/work/work'
     })
  },

  // 跳转到点赞页
  navigateToLikePage() {
  
    wx.navigateTo({
       url: '/pages/like/like'
     })
  },

  // 跳转到收藏页
  navigateToBookmarkPage() {

     wx.navigateTo({
      url: '/pages/bookmark/bookmark'
     })
  },

  // 跳转到关注页
  navigateToFollowPage() {
  
     wx.navigateTo({
      url: '/pages/follow/follow'
     })
  },

  // 点击相册图片预览
  previewImage(e) {
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.petPhotos[index],
      urls: this.data.petPhotos
    })
  }
})