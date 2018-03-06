//index.js
//获取应用实例
const app = getApp()

Page
    (
    {
        data:
        {
            latitude: 23,   //经纬度
            longitude: 113,
            markers:[],
            mapControls:    //地图控件
            [
                { //定位
                    id: 0,
                    position: {                 //相对定位
                        left: app.globalData.scWidth * 0.03, 
                        top: app.globalData.scHeight * 0.9, 
                        width: app.globalData.scWidth * 0.1
                    },
                    iconPath: "../../image/locat.png",          //相对于当前文件的路径
                    clickable: true
                },
                { //扫码
                    id: 2,
                    position: {                 //相对定位
                        left: app.globalData.scWidth * 0.33,
                        top: app.globalData.scHeight * 0.85,
                        width: app.globalData.scWidth * 0.4,
                        height: app.globalData.scWidth * 0.2
                    },
                    iconPath: "../../image/scan.png",
                    clickable: true
                },
                { //我的
                    id: 3,
                    position: {                 //相对定位
                        left: app.globalData.scWidth * 0.87,
                        top: app.globalData.scHeight * 0.9,
                        width: app.globalData.scWidth * 0.1
                    },
                    iconPath: "../../image/my.png",
                    clickable: true
                },
                {   //地图中心
                    id: 14,
                    position: {                 //相对定位
                        left: app.globalData.scWidth * 0.47,
                        top: app.globalData.scHeight * 0.42,
                        width: app.globalData.scHeight * 0.04
                    },
                    iconPath: "../../image/center.png",
                    clickable: false
                }
            ]
        },
        getLocation: function (){       //获取当前位置，并移动地图到当前位置
            this.myMapCtx.moveToLocation()   
        },
        onLoad: function () {           //加载
            this.myMapCtx = wx.createMapContext("myMap", this)
            this.getLocation()
        },
        regionChanged: function (e) {                             //地图视野改变
            if (e.type == "end") {
                var that = this
                this.myMapCtx.getCenterLocation({               //获取中心点的经纬度
                    success: function (res) {
                        var mark = that.data.markers
                        var id = that.data.markers.length
                        var width = app.globalData.scWidth * 0.1
                        mark.push({        //放到标记里边
                            longitude: res.longitude,           //经纬度
                            latitude: res.latitude,
                            iconPath: "/image/marker.png",       //图标,相对于小程序根目录的路径
                            id: id,
                            width: width,
                            height: width,
                            title: "what is this?",
                            callout: {                           //气泡
                                content: "what is this?",
                                color: "lightgray",
                                fontSize: 15,
                                borderRadius: 5,
                                bgColor: "white",
                                display: "ALWAYS",               //显示模式
                                padding: 5,
                                textAlign: "center"
                            },
                            label: {                             //标记下表的文本标签
                                content: "位置标记",
                                color: "lightgray",
                                textAlign: "center",
                                fontSize: 15
                            }
                        })
                        that.setData({                  //必须使用setData设置，不然会出现数据跟新了，但是地图视图不跟新的情况
                            "markers": mark
                        })
                    }
                })
            }
        },
        scanCode:function(){                    //扫描二维码
            wx.scanCode({
                success(res){                   //扫码成功
                    wx.showModal({              //扫码结果
                        title: "扫码结果",
                        content: res.result,
                    })
                }
            })
        },
        navigateToPersonal:function(){
            wx.navigateTo({
                url: "/pages/personal/personal"
            })
        },
        mapControlTap: function (e) {          //地图控件点击
            switch (e.controlId) {
                case 0://定位
                    this.getLocation()
                    break;
                case 2://扫码
                    this.scanCode()
                    break;
                case 3://我的
                    this.navigateToPersonal()
                    break;
            }
        },
        mapTap: function(e){            //地图点击
            //console.log(e)
        },
        mapMarker:function(e){
            console.log("点击了标记：" + e.markerId)
        }
    }
    )