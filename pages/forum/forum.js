Page({
  data: {
    // 可以在这里定义页面需要的数据，比如是否显示加载动画等
    searchKeyword: '', // 搜索关键词
    searchResults: [] ,// 搜索结果列表
    isLoading: false,
    activeTab: 'latest', // 当前选中的标签
    latestList: [
      { content: '最新内容1', timestamp: 1633072800000 },
      { content: '最新内容2', timestamp: 1633076400000 },
      { content: '最新内容3', timestamp: 1633080000000 }
    ],
    hotList: [
      { content: '最热内容1', likes: 100 },
      { content: '最热内容2', likes: 200 },
      { content: '最热内容3', likes: 150 }
    ],
    count:1
  },
  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });

    // 根据标签排序
    if (tab === 'latest') {
      this.sortByLatest();
    } else if (tab === 'hot') {
      this.sortByHot();
    }
  },

  // 按最新排序
  sortByLatest: function () {
    const latestList = this.data.latestList.sort((a, b) => b.timestamp - a.timestamp);
    this.setData({
      latestList: latestList
    });
  },

  // 按最热排序
  sortByHot: function () {
    const hotList = this.data.hotList.sort((a, b) => b.likes - a.likes);
    this.setData({
      hotList: hotList
    });
  },
  onLoad: function() {
    // 页面加载时执行的函数，可在此发起数据请求等操作
    this.setData({
      isLoading: true
    });
    // 模拟数据请求
    setTimeout(() => {
      this.setData({
        isLoading: false
      });
    }, 2000);
  },

  onReady: function() {
    // 页面初次渲染完成时执行
    console.log('首页渲染完成');
  },

  onShow: function() {
    // 页面显示/切入前台时执行
    console.log('首页显示');
  },

  onHide: function() {
    // 页面隐藏/切入后台时执行
    console.log('首页隐藏');
  },

  onUnload: function() {
    // 页面卸载时执行
    console.log('首页卸载');
  },
   // 监听搜索输入框内容变化
   onSearchInput: function (e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 搜索功能
  search: function () {
    const { searchKeyword } = this.data;
    if (!searchKeyword) {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none'
      });
      return;
    }

    // 模拟搜索结果
    const mockData = [
      '搜索结果1',
      '搜索结果2',
      '搜索结果3'
    ];

    // 过滤匹配的结果
    const results = mockData.filter(item =>
      item.includes(searchKeyword)
    );

    this.setData({
      searchResults: results
    });
  },
  handleImageTap: function() {
    
    wx.navigateTo({
      url: '/pages/post/post' // 目标页面路径
    });
  },
  handleInput: function(e) {
    this.setData({
      searchQuery: e.detail.value
    });
 
  },

  onLoad() {
    // 2 秒后更新宽度
    setTimeout(() => {
      this.setData({
        buttonWidth: 100
      });
    }, 2000);
  },
    // 切换标签
  
  });
  

  

  
