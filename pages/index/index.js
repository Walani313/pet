// pages/index/index.js
Page({
  data: {
    petInfo: {
      name: '咪咪',
      age: '2岁',
      weight: '4.5kg',
      gender: '女生',
      tags: ['活泼', '可爱', '黏人']
    },
    tempPetInfo: {},
    isEditingPet: false,
    petAvatar: '/images/cat_avatar.png',  // 默认猫头像
    
    // 待办列表（每个待办变成对象，带完成状态）
    todoList: [
      { id: 1, text: '每日喂食', done: false },
      { id: 2, text: '清理猫砂', done: true },
      { id: 3, text: '检查饮水', done: false }
    ],
    
    // 当前编辑的待办索引
    editingTodoIndex: -1,
    
    // 今日科普
    dailyTips: [
      {
        title: '遛狗时间',
        content: '中小型犬每天需30分钟活动量；大型犬则需要至少1小时高强度运动，建议选择清晨或傍晚时段。'
      },
      {
        title: '猫咪刷牙',
        content: '建议每周给猫咪刷牙2-3次，使用宠物专用牙膏，预防牙结石和口臭。'
      }
    ],
    currentTipIndex: 0
  },

  onLoad() {
    this.loadTodoList()
    this.loadPetInfo()
  },

  // 加载待办
  loadTodoList() {
    const todoList = wx.getStorageSync('todoList')
    if (todoList) {
      this.setData({ todoList })
    }
  },

  // 保存待办
  saveTodoList() {
    wx.setStorageSync('todoList', this.data.todoList)
  },

  // 加载宠物信息
  loadPetInfo() {
    const petInfo = wx.getStorageSync('petInfo')
    if (petInfo) {
      this.setData({ petInfo })
    }
  },

  // 切换宠物头像（猫/狗）
  switchPetAvatar() {
    const newAvatar = this.data.petAvatar.includes('cat') 
      ? '/images/dog_avatar.png' 
      : '/images/cat_avatar.png'
    this.setData({ petAvatar: newAvatar })
  },

  // ========== 宠物信息编辑 ==========
  handleEditPet() {
    this.setData({
      isEditingPet: true,
      tempPetInfo: { ...this.data.petInfo }
    })
  },

  handlePetInput(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({
      tempPetInfo: { ...this.data.tempPetInfo, [field]: value }
    })
  },

  handleSavePet() {
    this.setData({
      petInfo: { ...this.data.tempPetInfo },
      isEditingPet: false
    })
    wx.setStorageSync('petInfo', this.data.petInfo)
  },

  checkNameLength(e) {
    if (e.detail.value.length > 6) {
      wx.showToast({
        title: '名字不能超过6个字',
        icon: 'none'
      })
    }
  },

  handleEditTag(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    const tags = [...this.data.petInfo.tags]
    tags[index] = value
    this.setData({
      'petInfo.tags': tags
    })
    wx.setStorageSync('petInfo', this.data.petInfo)
  },

  handleAddTag() {
    if (this.data.petInfo.tags.length < 4) {
      const tags = [...this.data.petInfo.tags, '新标签']
      this.setData({
        'petInfo.tags': tags
      })
      wx.setStorageSync('petInfo', this.data.petInfo)
    }
  },

  // ========== 待办功能（新增勾选）==========
  // 切换完成状态
  toggleTodo(e) {
    const id = e.currentTarget.dataset.id
    const todoList = this.data.todoList.map(item => {
      if (item.id === id) {
        return { ...item, done: !item.done }
      }
      return item
    })
    
    this.setData({ todoList })
    this.saveTodoList()
  },

  // 编辑待办（原有功能）
  handleEditTodo(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ editingTodoIndex: index })
  },

  // 保存编辑
  handleSaveTodo(e) {
    const index = e.currentTarget.dataset.index
    const newText = e.detail.value
    
    if (newText.trim()) {
      const todoList = [...this.data.todoList]
      todoList[index] = { ...todoList[index], text: newText }
      this.setData({ 
        todoList,
        editingTodoIndex: -1
      })
      this.saveTodoList()
    } else {
      this.setData({ editingTodoIndex: -1 })
    }
  },

  // 添加新待办（新增：用对象形式）
  addNewTodo() {
    const newTodo = {
      id: Date.now(),
      text: '新待办',
      done: false
    }
    const todoList = [...this.data.todoList, newTodo]
    this.setData({ todoList })
    this.saveTodoList()
    
    // 自动进入编辑状态
    this.setData({ editingTodoIndex: todoList.length - 1 })
  },

  // ========== 今日科普 ==========
  handlePrevTip() {
    let index = this.data.currentTipIndex - 1
    if (index < 0) index = this.data.dailyTips.length - 1
    this.setData({ currentTipIndex: index })
  },

  handleNextTip() {
    let index = this.data.currentTipIndex + 1
    if (index >= this.data.dailyTips.length) index = 0
    this.setData({ currentTipIndex: index })
  },

  // ========== 页面跳转 ==========
  navToRecord() {
    wx.navigateTo({
      url: '/pages/record/record'
    })
  },

  navToPersonal() {
    wx.navigateTo({
      url: '/pages/personal/personal'
    })
  }
})