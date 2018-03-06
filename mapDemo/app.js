//app.js
App({
    onLaunch: function () {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            console.log(this.globalData)
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
        var that = this
        //获取屏幕尺寸，放到全局结构中
        wx.getSystemInfo({
            success: function (res) {
                that.globalData.scHeight = res.windowHeight
                that.globalData.scWidth = res.windowWidth
            },
        })
        console.log(this.globalData.scWidth)
        console.log(this.globalData.scHeight)
    },
    globalData: {
        userInfo: null,
        scWidth: 0,             //全局的屏幕尺寸，已经去掉了上边的标题栏
        scHeight: 0
    }
})