// pages/login/login.js
Page({
    data: {
      username: '',
      password: ''
    },
    onLoad() {
      this.updateTime();
    },
    updateTime() {
      const date = new Date();
      const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      this.setData({ currentTime: time });
    },
    handleUsernameInput(e) {
      this.setData({
        username: e.detail.value
      })
    },
    handlePasswordInput(e) {
      this.setData({
        password: e.detail.value
      })
    },
    validateInput() {
      const { username, password } = this.data;
      if (!username.trim()) {
        wx.showToast({ title: '请输入昵称', icon: 'none' });
        return false;
      }
      if (!password.trim()) {
        wx.showToast({ title: '请输入密码', icon: 'none' });
        return false;
      }
      if (password.length < 6) {
        wx.showToast({ title: '密码至少6位', icon: 'none' });
        return false;
      }
      return true;
    },
    handleLogin() {
      if (!this.validateInput()) return;
      wx.showToast({
        title: '登录中...',
        icon: 'loading',
        duration: 1500
      });
      setTimeout(() => {
        wx.setStorageSync('userInfo', {
          username: this.data.username,
          isLogin: true
        });
        wx.reLaunch({
          url: '/pages/index/index'
        });
      }, 1500);
    },
    handleRegister() {
      if (!this.validateInput()) return;
      wx.showToast({
        title: '注册中...',
        icon: 'loading',
        duration: 1500
      });
      setTimeout(() => {
        wx.setStorageSync('userInfo', {
          username: this.data.username,
          isLogin: true
        });
        wx.reLaunch({
          url: '/pages/index/index'
        });
      }, 1500);
    },
    navToForgot() {
      wx.navigateTo({ url: '/pages/forgot/forgot' });
    }
  });