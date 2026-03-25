Page({
  data: {
    searchKeyword: '', // 搜索关键词
    searchResults: {}, // 搜索结果
    allData: [ //数据
      { id: 1, title:'猫猫总知识' },
      { id: 2, title: '猫咪的外观特征' },
      { id: 3, title: '猫咪的性格特点' },
      { id: 4, title: '猫咪的饮食习惯' },
      { id: 5, title: '猫咪的运动偏好' },
      { id: 6, title: '猫咪清洁的注意事项' },
      { id: 7, title: '狗狗总知识' },
      { id: 8, title: '狗狗的品种信息' },
      { id: 9, title: '狗狗的饮食需求' },
      { id: 10, title: '狗狗的训练方法' },
      { id: 11, title: '狗狗的疾病预防与治疗' },
      { id: 12, title: '狗狗的养育秘诀' }
    ],

    showGroup1: false,
    showGroup2: false,
    showGroup3: false,

    // ======================
    // 只新增这里：书籍简介
    // ======================
    bookIntro: [
      "", // 占位
      "《猫咪教科书》：专业养猫百科，包含喂养、行为、健康、护理等全方位知识，新手也能轻松看懂。",
      "《如何与宠物一起生活》：教你打造人宠和谐的生活环境，解决居家养宠的各类问题。",
      "《育狗全书》：从饮食、训练到健康管理，一本搞定养狗所有需求，实用又全面。"
    ]
  },

  // 输入框内容变化时触发
  onInput(e) {
    const keyword = e.detail.value.trim();
    this.setData({
      searchKeyword: keyword
    });
    if (keyword) {
      const results = this.data.allData.filter(item =>
        item.title.includes(keyword)
      );
      this.setData({
        searchResults: results
      });
    } else {
      this.setData({
        searchResults: {}
      });
    }
  },

  //点击搜索按钮时触发
  onSearch(){
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入关键词',
        icon: 'error'
      });
      return;
    }
    const results = this.data.allData.filter(item =>
      item.title.includes(keyword)
    );

    if (results.length > 0) {
      this.setData({
        searchResults: results
      });
    } else {
      wx.showToast({
        title: '无相关内容',
        icon: 'error'
      });
      this.setData({
        searchResults: {}
      });
    }
  },

  //点击搜索结果时触发
  onContent(e) {
    const contentId = e.currentTarget.dataset.id;
    const item = this.data.allData.find(item => item.id === contentId);
    if (item) {
      wx.navigateTo({
        url: `/pages/content/content?id=${contentId}&title=${item.title}`
      });
    }
  },

  //点击按钮时触发
  onButton(e){
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/content/content?id=${articleId}`
    });
  },

  // ================================
  // 书籍分组展示（完全不变）
  // ================================
  showBookGroup(e) {
    const group = e.currentTarget.dataset.group;
    this.setData({
      showGroup1: group == '1',
      showGroup2: group == '2',
      showGroup3: group == '3'
    });
  },

  hideAll() {
    this.setData({
      showGroup1: false,
      showGroup2: false,
      showGroup3: false
    });
  }
});